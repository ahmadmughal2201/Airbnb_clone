// BottomBar.js
import React from 'react';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import AddRoom from './AddRoom';

const Manager = () => {
  // Navigate to the data entry page when the button is clicked
  const navigate = useNavigate();

  const handleClick = () => {
    // Use navigate to navigate to the new page
    navigate('/add-room');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',
        height: '60px',
        backgroundColor: '#ff5a60',
        color: 'white',
        borderRadius: '50%',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
        transition: 'background-color 0.1s ease-out',
      }} onClick={handleClick}
    >
      <div
        style={{
          fontSize: '35px',
          color: 'white',
          transition: 'color 0.1s',
        }}
      >
        <BiSolidAddToQueue />
      </div>
    </div>

  );
};

export default Manager;
