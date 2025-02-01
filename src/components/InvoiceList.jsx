import { message } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    setInvoices(savedInvoices);
  }, []);

  const loadInvoice = (invoice) => {
    message.success("Invoice loaded successfully!");
    localStorage.setItem("currentInvoice", JSON.stringify(invoice));
    navigate("/invoice");
  };

  const deleteInvoice = (id) => {
    const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(updatedInvoices);
    message.success("Invoice deleted successfully!");
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Saved Invoices</h2>
      {invoices.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No saved invoices</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {invoices.map((invoice) => (
            <li key={invoice.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
              <strong>Invoice #{invoice.id}</strong> - {invoice.customerName} ({invoice.date})
              <div style={{ marginTop: '10px' }}>
                <button style={{ marginRight: '10px', padding: '5px 10px', borderRadius: '3px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => loadInvoice(invoice)}>Load</button>
                <button style={{ padding: '5px 10px', borderRadius: '3px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => deleteInvoice(invoice.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InvoiceList;
