import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username == "admin" && password == "admin@123") {
      setIsAuthenticated(true);
      navigate("/invoice");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="outer-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ padding: '2rem', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.2)', backgroundColor: '#fff', maxWidth: '400px', width: '100%' }}>
        <h2 className="header-text" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
        <form onSubmit={handleLogin} className="form-element">
          <div className="input-wrapper">
            <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="text-input"
              style={{ width: '100%', padding: '1rem', borderRadius: '5px', marginBottom: '1rem', border: '1px solid #ccc' }}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-input"
              style={{ width: '100%', padding: '1rem', borderRadius: '5px', marginBottom: '1rem', border: '1px solid #ccc' }}
            />
          </div>
          <button type="submit" className="submit-button" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '1rem 2rem', borderRadius: '5px', cursor: 'pointer', transition: 'all 0.3s ease', width: '100%' }}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

