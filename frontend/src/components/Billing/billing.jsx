import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';
import { backendUrl } from '../../service/url';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#f4f4f9',
  },
  section: {
    marginBottom: 20,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 10,
  },
  table: {
    width: '100%',
    marginTop: 20,
    border: '1px solid #ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    borderBottom: '1px solid #ddd',
  },
  bold: {
    backgroundColor: '#1E3A8A',
    color: '#fff',
  },
  cell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
    fontSize: 12,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
    marginTop: 20,
  },
});

const BillPDF = ({ customer, items, total, dealer, invoiceId }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>RecycleHub</Text>
          <Text>Invoice ID: <Text style={{ fontWeight: 'bold' }}>{invoiceId || 'N/A'}</Text></Text>
          <Text>Dealer Name: <Text style={{ fontWeight: 'bold' }}>{dealer?.name || 'N/A'}</Text></Text>
          <Text>Dealer ID: <Text style={{ fontWeight: 'bold' }}>{dealer?._id || 'N/A'}</Text></Text>
          <Text>Billing Date: <Text style={{ fontWeight: 'bold' }}>{currentDate}</Text></Text>
          <Text>Customer Name: <Text style={{ fontWeight: 'bold' }}>{customer.name}</Text></Text>
          <Text>Phone: <Text style={{ fontWeight: 'bold' }}>{customer.phone}</Text></Text>
          <Text>Email: <Text style={{ fontWeight: 'bold' }}>{customer.email}</Text></Text>
          <Text>Address: <Text style={{ fontWeight: 'bold' }}>{customer.address}</Text></Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.row, styles.bold]}>
            <Text style={styles.cell}>Item Name</Text>
            <Text style={styles.cell}>Quantity</Text>
            <Text style={styles.cell}>Price</Text>
            <Text style={styles.cell}>Total</Text>
          </View>
          {items.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>{item.price}</Text>
              <Text style={styles.cell}>{item.quantity * item.price}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.total}>Total: Rs. {total.toFixed(2)}</Text>
      </Page>
    </Document>
  );
};

const BillGenerator = () => {
  const { user, token } = useSelector((state) => state.auth);
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  const [customer, setCustomer] = useState({ name: '', phone: '', email: '', address: '' });
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '' });
  const [orders, setOrders] = useState([]);
  const [selectedPickupId, setSelectedPickupId] = useState('');
  const [savedInvoices, setSavedInvoices] = useState([]);
  const [savedInvoice, setSavedInvoice] = useState(null);
  const [savingInvoice, setSavingInvoice] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const billableOrders = useMemo(
    () => orders.filter((order) => ['accepted', 'completed'].includes(order.status)),
    [orders]
  );

  useEffect(() => {
    const fetchBillingData = async () => {
      if (!token) {
        return;
      }

      try {
        const [ordersResponse, invoicesResponse] = await Promise.all([
          axios.get(`${backendUrl}/get-orders`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${backendUrl}/invoices`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setOrders(Array.isArray(ordersResponse.data) ? ordersResponse.data : []);
        setSavedInvoices(invoicesResponse.data?.invoices || []);
      } catch (error) {
        console.error('Error fetching billing data:', error);
        setStatusMessage('Unable to load orders or invoice history.');
      }
    };

    fetchBillingData();
  }, [token]);

  const handleOrderSelect = (pickupId) => {
    setSelectedPickupId(pickupId);
    setSavedInvoice(null);

    const selectedOrder = orders.find((order) => order._id === pickupId);
    if (!selectedOrder) {
      return;
    }

    const mappedPrice = Number(selectedOrder.price ?? selectedOrder.weight ?? 0);

    setCustomer((prev) => ({
      name: prev.name || 'Customer',
      phone: selectedOrder.contactNumber || prev.phone || '',
      email: selectedOrder.email || prev.email || '',
      address: selectedOrder.address || prev.address || '',
    }));

    setItems([
      {
        name: selectedOrder.item,
        quantity: 1,
        price: Number.isFinite(mappedPrice) ? mappedPrice : 0,
      },
    ]);
  };

  const handleAddItem = () => {
    const quantity = Number(newItem.quantity);
    const price = Number(newItem.price);
    const name = String(newItem.name || '').trim();

    if (!name || !Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(price) || price < 0) {
      setStatusMessage('Enter valid item name, quantity and price.');
      return;
    }

    setItems((prev) => [...prev, { name, quantity, price }]);
    setNewItem({ name: '', quantity: '', price: '' });
    setSavedInvoice(null);
    setStatusMessage('');
  };

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleSaveInvoice = async () => {
    if (!token) {
      setStatusMessage('Please login to save invoice.');
      return;
    }

    if (!customer.name || !customer.phone) {
      setStatusMessage('Customer name and phone are required.');
      return;
    }

    if (items.length === 0) {
      setStatusMessage('Add at least one invoice item.');
      return;
    }

    setSavingInvoice(true);
    setStatusMessage('Saving invoice...');

    try {
      const response = await axios.post(
        `${backendUrl}/invoices`,
        {
          pickupId: selectedPickupId || null,
          customer,
          items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data?.success) {
        const createdInvoice = response.data.invoice;
        setSavedInvoice(createdInvoice);
        setSavedInvoices((prev) => [createdInvoice, ...prev]);
        setStatusMessage('Invoice saved successfully. You can now download the PDF.');
      } else {
        setStatusMessage(response.data?.message || 'Failed to save invoice.');
      }
    } catch (error) {
      console.error('Save invoice error:', error);
      setStatusMessage('Failed to save invoice.');
    } finally {
      setSavingInvoice(false);
    }
  };

  return (
    <div className={`p-6 max-w-5xl mx-auto shadow-md rounded-md ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white'}`}>
      <h1 className="text-2xl font-bold mb-4 text-center">Bill Generator</h1>

      {statusMessage && (
        <p className="mb-4 text-sm text-center text-blue-500">{statusMessage}</p>
      )}

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Link Pickup (Optional)</h2>
          <select
            value={selectedPickupId}
            onChange={(e) => handleOrderSelect(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select order to auto-fill</option>
            {billableOrders.map((order) => (
              <option key={order._id} value={order._id}>
                {order.item} | {order.address} | {new Date(order.pickupDate).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Customer Details</h2>
          <input
            type="text"
            placeholder="Name"
            value={customer.name}
            onChange={(e) => {
              setCustomer({ ...customer, name: e.target.value });
              setSavedInvoice(null);
            }}
            className="w-full p-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Phone"
            value={customer.phone}
            onChange={(e) => {
              setCustomer({ ...customer, phone: e.target.value });
              setSavedInvoice(null);
            }}
            className="w-full p-2 border rounded-md mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={customer.email}
            onChange={(e) => {
              setCustomer({ ...customer, email: e.target.value });
              setSavedInvoice(null);
            }}
            className="w-full p-2 border rounded-md mb-2"
          />
          <textarea
            placeholder="Address"
            value={customer.address}
            onChange={(e) => {
              setCustomer({ ...customer, address: e.target.value });
              setSavedInvoice(null);
            }}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Add Items</h2>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              className="p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="p-2 border rounded-md"
            />
          </div>
          <button
            onClick={handleAddItem}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Item
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Items List</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="border border-gray-300 p-2">Item Name</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{item.name}</td>
                  <td className="border border-gray-300 p-2">{item.quantity}</td>
                  <td className="border border-gray-300 p-2">Rs. {item.price}</td>
                  <td className="border border-gray-300 p-2">Rs. {item.quantity * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-right font-bold text-lg">Total: Rs. {total.toFixed(2)}</div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSaveInvoice}
            disabled={savingInvoice}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 disabled:opacity-60"
          >
            {savingInvoice ? 'Saving...' : 'Save Invoice'}
          </button>

          {savedInvoice ? (
            <PDFDownloadLink
              document={<BillPDF customer={customer} items={items} total={total} dealer={user} invoiceId={savedInvoice._id} />}
              fileName={`invoice-${savedInvoice._id}.pdf`}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
            </PDFDownloadLink>
          ) : (
            <button
              disabled
              className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
            >
              Save Invoice to Enable PDF
            </button>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mt-4">Recent Invoices</h2>
          {savedInvoices.length === 0 ? (
            <p className="text-sm text-gray-500">No invoices saved yet.</p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm">
              {savedInvoices.slice(0, 5).map((invoice) => (
                <li key={invoice._id}>
                  #{invoice._id} | Total: Rs. {Number(invoice.total || 0).toFixed(2)} | {new Date(invoice.createdAt).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillGenerator;
