import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { useMyContext } from './MyContext';


function SignUp() {
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [logIn, setLogIn] = useState(false);
  const [formData, setFormData] = useState({
    uName: '',
    role: '',
    email: '',
    password: '',
    DOB: '',
    Status: true,
  });

  const { myVariable, setMyVariable , managerId, setManagerId} = useMyContext();

  const handleVariable = () => {
    // Set the variable in the context
    setMyVariable(formData.role);
  };
  

  const MessageBox = ({ message, onClose }) => {
    return (
      <div>
        <div>{message}</div>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };

  const [showMessageBox, setShowMessageBox] = useState(false);

  const handleShowMessage = () => {
    setShowMessageBox(true);
  };

  const handleCloseMessage = () => {
    setShowMessageBox(false);
  };

  const [rolee, setRolee] = useState();

  const [isComboBoxOpen, setIsComboBoxOpen] = useState(false);

  const handleComboBoxClick = () => {
    setIsComboBoxOpen(!isComboBoxOpen);
  };

  const handleOptionClick = (option) => {
    setFormData({ ...formData, role: option });
    setIsComboBoxOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setRolee(formData.role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogIn(false);
  
    try {
      const r = await axios.post('http://localhost:3000/api/logIn', formData);
      console.log('User Logged In:', r.data);
      setLogIn(true);
      handleShowMessage(true);
      handleVariable();
      {showMessageBox && (
        <MessageBox message="User Logged In!" onClose={handleCloseMessage} />
      )}
      setIsDialogOpen(false);
      {showMessageBox && (
        <MessageBox message={rolee} onClose={handleCloseMessage} />
      )}
      console.log("Role is: ", myVariable);
      // Skip the signup part if login is successful
      return;
    } catch (err) {
      console.error('User can`t be logged in:', err);
    }
  
    // Proceed with signup only if login was not successful
    if (!logIn) {
      try {
        const response = await axios.post('http://localhost:3000/api/signUp', formData);
        console.log('User registered:', response.data);
        handleShowMessage(true);
        {showMessageBox && (
          <MessageBox message="User Registered!" onClose={handleCloseMessage} />
        )}
        setRolee(formData.role);
        {showMessageBox && (
          <MessageBox message={rolee} onClose={handleCloseMessage} />
        )}
        setIsDialogOpen(false);
        handleVariable();
        console.log(myVariable);
        // You can handle success, show a message to the user, or redirect to a login page, etc.
      } catch (erro) {
        console.error('Registration failed:', erro);
        // Handle the error, show an error message to the user, etc.
      }
    }
  };
  

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return ( isDialogOpen && (
    <div className="dialog">
      <form>
        <div className="flex items-center px-12 py-3 gap-8">
          <label htmlFor="uName">Username:</label>
          <input
            type="text"
            id="uName"
            name="uName"
            value={formData.uName}
            onChange={handleChange}
            className="textBoxBorder" 
          />
        </div>
        <div className="flex items-center px-12 py-3 gap-10">
          <label htmlFor="role">Role:</label>
          <div className={`combo-box ${isComboBoxOpen ? 'active' : ''}`}>
            <div className="combo-box-header">
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                className="textBoxBorder"
                placeholder="Select a role"
                onClick={handleComboBoxClick}
              />
              <div className="combo-box-arrow" onClick={handleComboBoxClick}>
                &#9660;
              </div>
            </div>
            {isComboBoxOpen && (
              <ul className="combo-box-options">
                <li onClick={() => handleOptionClick('Manager')}>Manager</li>
                <li onClick={() => handleOptionClick('Customer')}>Customer</li>
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-center px-12 py-3 gap-10">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="textBoxBorder"
          />
        </div>
        <div className="flex items-center px-12 py-3 gap-8">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="textBoxBorder"
          />
        </div>
        <div className="flex items-center px-12 py-3 gap-7">
          <label htmlFor="DOB">Date Of Birth:</label>
          <input
            type="Date"
            id="DOB"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            className="textBoxBorder"
          />
        </div>
        <div className="flex items-center gap-12">
          <button className="button ml-20 flex items-center border px-3 py-2 rounded-full gap-2 bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out" type="submit" onClick={handleSubmit}>Register</button>
          {error && <div className="error">{error}</div>}
          <button className="button mr-20 flex items-center border px-3 py-2 rounded-full gap-2 bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out" type="button" onClick={closeDialog}>
            Close
          </button>
        </div>

      </form>
    </div>
    )
  );
}

export default SignUp;
