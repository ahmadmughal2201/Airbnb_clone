import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMyContext } from './MyContext';
import axios from 'axios';



const Wallet = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [walletValues, setWalletValues] = useState([]);
  const [walletValue, setWalletValue] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    CID: '',
    Status: true,
    Wallet: ''
  });
  const {money, setMoney, customerId, setCustomerId} = useMyContext();


  const handleAddWallet = async(e) => {
    e.preventDefault();
    if (walletValue.trim() !== '') {
      setWalletValues([...walletValues, parseFloat(walletValue)]);
    try {
        formData.CID = customerId;
        formData.Wallet = walletValue;
        setMoney(walletValue);
      const r = await axios.post('http://localhost:3000/api/addGuest', formData);
      console.log("Data: ", formData);
      console.log("Response: ", r.data);
      console.log("Money: ", money);
    } catch (error) {
      console.error("Error in Axios request:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
      setDialogOpen(false);
      navigate('/customer');
    }
  };


  return (
    <div className="wallet-container">
      <button onClick={() => setDialogOpen(true)}>Add Wallet</button>

      {isDialogOpen && (
        <div className="wallet-dialog">
          <div className="overlay" onClick={() => setDialogOpen(false)}></div>
          <div className="content">
            <h2>Add Wallet Value</h2>
            <input
              type="number"
              placeholder="Enter wallet value"
              value={walletValue}
              onChange={(e) => setWalletValue(e.target.value)}
            />
            <button onClick={handleAddWallet}>Add</button>
            <button onClick={() => setDialogOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="wallet-values">
        <h2>Wallet Values</h2>
        <ul>
          {walletValues.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wallet;
