import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMyContext } from './MyContext';
import axios from 'axios';
import './SignUp.css';


const Wallet = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [walletValue, setWalletValue] = useState('');
  const [oldAmount, setOldAmount] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    CID: '',
    Status: true,
    Wallet: 0
  });
  const {money, setMoney, customerId, setCustomerId} = useMyContext();


  const handleAddWallet = async (e) => {
    e.preventDefault();
  
    // Assuming getSingleProduct is a function that fetches data for you
  
    try {
      formData.CID = customerId;
      formData.Wallet = walletValue;
  
      // Check if a wallet with the given customer ID already exists
      const existingWallet = await axios.get(`http://localhost:3000/api/getWallet/${customerId}`);
  
      if (existingWallet.data) {
        // If a wallet exists, update it
        const updatedWallet = await axios.put(`http://localhost:3000/api/updateWallet/${customerId}`, formData);
        console.log("Updated Wallet Data:", updatedWallet.data);
      } else {
        // If a wallet doesn't exist, add it
        const newWallet = await axios.post('http://localhost:3000/api/addGuest', formData);
        console.log("New Wallet Data:", newWallet.data);
      }
  
      setMoney(walletValue);
      console.log("Money:", money);
  
    } catch (error) {
      console.error("Error in Axios request:", error);
      // Handle errors as needed
    }
  
    navigate('/customer');
  };
  

  




  return (
    <div className="dialog">
      <label htmlFor="uName">Add Amount:</label>
      <br/>
      <br/>
      <input
                            type="text"
                            value={walletValue}
                            onChange={(e) => setWalletValue(e.target.value)}
                            className={"textBoxBorder"}
                        />
      <br/> <br/>
      <button className="button ml-20 flex items-center border px-3 py-2 rounded-full gap-2 bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out" type="submit" onClick={handleAddWallet}>Add</button>
    </div>
  );
};

export default Wallet;
