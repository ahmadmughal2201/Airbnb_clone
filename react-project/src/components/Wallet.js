import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMyContext } from './MyContext';
import axios from 'axios';
import './SignUp.css';


const Wallet = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [walletValue, setWalletValue] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    CID: '',
    Status: true,
    Wallet: 0
  });
  const {money, setMoney, customerId, setCustomerId, managerId, setManagerId} = useMyContext();


  const handleAddWallet = async (e) => {
    e.preventDefault();
  
    // Assuming getSingleProduct is a function that fetches data for you
  
    try {
      formData.CID = customerId;
      
      // Check if a wallet with the given customer ID already exists
      const existingWallet = await axios.get(`http://localhost:3000/api/getWallet/${customerId}`);
      console.log(existingWallet.data.Wallet);
      const oldAmount = Number(existingWallet.data.Wallet);
      const newValue = Number(walletValue);
      console.log(newValue);
      formData.Wallet = newValue + oldAmount;
      console.log(formData.Wallet);

      if (existingWallet.data) {
        // If a wallet exists, update it
        const updatedWallet = await axios.put(`http://localhost:3000/api/updateWallet/${customerId}`, formData);
        console.log("Updated Wallet Data:", updatedWallet.data);
      } else {
        // If a wallet doesn't exist, add it
        const newWallet = await axios.post('http://localhost:3000/api/addGuest', formData);
        console.log("New Wallet Data:", newWallet.data);
      }
  
      setMoney(formData.Wallet);
      console.log("Money:", money);
  
    } catch (error) {
      console.error("Error in Axios request 2:", error);
        if (error.response) {
          console.error("Response data 2:", error.response.data);
          console.error("Response status 2:", error.response.status);
        } else if (error.request) {
          console.error("No response received 2:", error.request);
        } else {
          console.error("Error setting up the request 2:", error.message);
        }
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
