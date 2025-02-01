import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { message } from "antd";
const Invoice = () => {
  const [invoice, setInvoice] = useState({
    id: uuidv4(),
    date: new Date().toISOString().split("T")[0],
    customerName: "",
    customerAddress: "",
    customerNumber: "",
    items: [{ id: uuidv4(), name: "", quantity: 1, price: 0 }],
  });

  useEffect(() => {
    const savedInvoice = JSON.parse(localStorage.getItem("currentInvoice"));
    if (savedInvoice) {
      setInvoice(savedInvoice);
      localStorage.removeItem("currentInvoice");
    }
  }, []);

  const handleInputChange = (e, index = null, field = null) => {
    if (index !== null) {
      const newItems = [...invoice.items];
      newItems[index][field] = e.target.value;
      setInvoice({ ...invoice, items: newItems });
    } else {
      setInvoice({ ...invoice, [e.target.name]: e.target.value });
    }
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { id: uuidv4(), name: "", quantity: 1, price: 0 }],
    });
  };

  const removeItem = (id) => {
    setInvoice({
      ...invoice,
      items: invoice.items.filter((item) => item.id !== id),
    });
  };

  const getTotal = () => {
    return invoice.items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    localStorage.setItem("invoices", JSON.stringify([...savedInvoices, invoice]));
    message.success("Invoice saved successfully!");
  };

  return (
    <>
    <nav style={{ backgroundColor: '#f8f9fa', padding: '10px', display: 'flex', justifyContent: 'space-evenly',textAlign: 'center' }}>
      <Link to='/invoices' style={{ marginRight: '10px', textDecoration: 'none', color: '#007bff' }}>Previous Invoices</Link>
      <Link to='/invoice' style={{ textDecoration: 'none', color: '#007bff' }}>Current Invoice</Link>
    </nav>
  
<center>
      <h2 style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>Invoice #{invoice.id}</h2>
      <input type="date" name="date" value={invoice.date} onChange={handleInputChange} style={{ backgroundColor: '#f8f9fa', borderRadius: '5px',height: '30px', margin: '10px', padding: '5px' }} />
      <input type="text" name="customerName" placeholder="Customer Name" value={invoice.customerName} onChange={handleInputChange} required style={{ backgroundColor: '#f8f9fa', borderRadius: '5px',height: '30px', margin: '10px', padding: '5px' }} />
      <input type="text" name="customerAddress" placeholder="Customer Address" value={invoice.customerAddress} onChange={handleInputChange} required style={{ backgroundColor: '#f8f9fa', borderRadius: '5px',height: '30px', margin: '10px', padding: '5px' }} />
      <input type="text" name="customerNumber" placeholder="Customer Number (optional)" value={invoice.customerNumber} onChange={handleInputChange} style={{ backgroundColor: '#f8f9fa', borderRadius: '5px',height: '30px', margin: '10px', padding: '5px' }} />

      <h3>Items</h3>
    
      <ul style={{ listStyle: 'none', padding: '0', width: '100%', display: 'flex', justifyContent: 'center',flexWrap: 'wrap' }}>
        {invoice.items.map((item, index) => (
            <>
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'center' }}>
            <input type="text" placeholder="Item Name"  onChange={(e) => handleInputChange(e, index, "name")}  style={{ width: '200px', marginRight: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px',height: '30px' }} />
            <input type="number" placeholder="Quantity"  onChange={(e) => handleInputChange(e, index, "quantity")} min="1"  style={{ width: '80px', marginRight: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px',height: '30px'}} />
            <input type="number" placeholder="Price" value={item.price} onChange={(e) => handleInputChange(e, index, "price")} min="0"  style={{ width: '80px', marginRight: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px',height: '30px' }} />
            <button onClick={() => removeItem(item.id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer',height: '30px',marginRight: '10px' }}>Remove</button>
          </li>

          </>
        ))}
      </ul>
    
      <button onClick={addItem} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer',marginRight: '10px',height: '40px' }} >Add Item</button>
      <h3>Total: ₹{getTotal()}</h3>

      <button onClick={handlePrint} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer',marginRight: '10px' ,height: '40px'}}>Print Invoice</button>
      <button onClick={handleSave} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer',height: '40px' }}>Save Invoice</button>
      </center>
    </>
  );
};

export default Invoice;
