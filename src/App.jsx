import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Invoice from "./components/Invoice";
import InvoiceList from "./components/InvoiceList";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/invoice" element={isAuthenticated ? <Invoice /> : <Navigate to="/" />} />
        <Route path="/invoices" element={isAuthenticated ? <InvoiceList /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
