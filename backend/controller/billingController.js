import { InvoiceModel } from "../models/invoice.js";
import { Pickup } from "../models/pickup.js";
import { UserModel } from "../models/user.js";

const normalizeItems = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      const quantity = Number(item?.quantity);
      const price = Number(item?.price);
      const total = quantity * price;

      return {
        name: String(item?.name || "").trim(),
        quantity,
        price,
        total,
      };
    })
    .filter((item) => item.name && Number.isFinite(item.quantity) && item.quantity > 0 && Number.isFinite(item.price) && item.price >= 0);
};

export const createInvoice = async (req, res) => {
  try {
    const dealerId = req.user.id;
    
    // Verify user is admin or dealer
    const user = await UserModel.findById(dealerId).select("userRole");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    if (!["admin", "dealer"].includes(user.userRole)) {
      return res.status(403).json({ success: false, message: "Access denied. Admin or Dealer role required." });
    }

    const { customer, items, pickupId } = req.body;

    if (!customer?.name || !customer?.phone) {
      return res.status(400).json({ success: false, message: "Customer name and phone are required" });
    }

    const normalizedItems = normalizeItems(items);
    if (normalizedItems.length === 0) {
      return res.status(400).json({ success: false, message: "At least one valid item is required" });
    }

    let resolvedPickupId = null;
    if (pickupId) {
      const pickup = await Pickup.findById(pickupId).select("_id");
      if (!pickup) {
        return res.status(404).json({ success: false, message: "Pickup not found" });
      }
      resolvedPickupId = pickup._id;
    }

    const total = normalizedItems.reduce((sum, item) => sum + item.total, 0);

    const invoice = await InvoiceModel.create({
      dealerId,
      pickupId: resolvedPickupId,
      customer: {
        name: String(customer.name).trim(),
        phone: String(customer.phone).trim(),
        email: String(customer.email || "").trim().toLowerCase(),
        address: String(customer.address || "").trim(),
      },
      items: normalizedItems,
      total,
    });

    return res.json({ success: true, message: "Invoice saved successfully", invoice });
  } catch (error) {
    console.error("Create Invoice Error:", error);
    return res.status(500).json({ success: false, message: "Failed to save invoice" });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const dealerId = req.user.id;
    
    // Verify user is admin or dealer
    const user = await UserModel.findById(dealerId).select("userRole");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    if (!["admin", "dealer"].includes(user.userRole)) {
      return res.status(403).json({ success: false, message: "Access denied. Admin or Dealer role required." });
    }

    const invoices = await InvoiceModel.find({ dealerId })
      .sort({ createdAt: -1 })
      .limit(100);

    return res.json({ success: true, invoices });
  } catch (error) {
    console.error("Get Invoices Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch invoices" });
  }
};
