import React, { useState } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import LogoImage from './logo.jpeg';
import { useSelector } from 'react-redux';

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
      color: '#1E3A8A', // Dark blue
      marginBottom: 10,
    },
    logo: {
      width: 50,
      height: 50,
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
      backgroundColor: '#1E3A8A', // Dark blue background for header
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
      color: '#10B981', // Green color for total
      marginTop: 20,
    },
  });
  
  const BillPDF = ({ customer, items, total, dealer }) => {
    const currentDate = new Date().toLocaleDateString();
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            {/* <Image src={base64Logo} style={styles.logo} /> */}
            <Text style={styles.header}>RecycleHub</Text>
            <Text>Dealer Name: <Text style={{ fontWeight: 'bold' }}>{dealer.name}</Text></Text>
            <Text>Dealer ID: <Text style={{ fontWeight: 'bold' }}>{dealer._id}</Text></Text>
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
  
          <Text style={styles.total}>Total: ₹{total}</Text>
        </Page>
      </Document>
    );
  };
  


const BillGenerator = () => {
  const { user } = useSelector((state) => state.auth);
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '', address: '' });
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '' });

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity && newItem.price) {
      setItems([...items, { ...newItem, quantity: parseInt(newItem.quantity), price: parseFloat(newItem.price) }]);
      setNewItem({ name: '', quantity: '', price: '' });
    }
  };

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className={`p-6 max-w-4xl mx-auto shadow-md rounded-md ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white'}`}>
      <h1 className="text-2xl font-bold mb-4 text-center">Bill Generator</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Customer Details</h2>
          <input
            type="text"
            placeholder="Name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            className="w-full p-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Phone"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            className="w-full p-2 border rounded-md mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            className="w-full p-2 border rounded-md mb-2"
          />
          <textarea
            placeholder="Address"
            value={customer.address}
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
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
              <tr className="bg-gray-200">
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
                  <td className="border border-gray-300 p-2">₹{item.price}</td>
                  <td className="border border-gray-300 p-2">₹{item.quantity * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-right font-bold text-lg">Total: ₹{total}</div>

        <div className="text-center">
          <PDFDownloadLink
            document={<BillPDF customer={customer} items={items} total={total} dealer={user} />}
            fileName="bill.pdf"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default BillGenerator;
