// BottomBar.js
import React, { useEffect, useState } from 'react';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import AddRoom from './AddRoom';
import Layout from './Layout';
import './Manager.css';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useMyContext } from './MyContext';
import {saveLogs} from "../utils/logs";

const Customer = ({collection}) => {
  // Navigate to the data entry page when the button is clicked
  const navigate = useNavigate();

  const {money, setMoney, roomId, setRoomId} = useMyContext();


  const handleClick = () => {
    // Use navigate to navigate to the new page
    navigate('/add-room');
  };

  const handleWalletClick = () =>{
    navigate('/wallet');
  }

  const [rooms, setRooms] = useState([]);


  const getAllRooms = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/get-rooms");
      setRooms(data.rooms);
    } catch (error) {
      saveLogs(error.message, "/customer", "Customer");
      console.error("Error in Axios request:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
      toast.error("Someething Went Wrong");
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  return (
    <div>
      <div class="top-right-container">
        <h5>Wallet Amount: {money}</h5>
    </div>
     <Layout>
      <div className="row dashboard">
        <div className="col-md-12">
          <div className="d-flex flex-wrap" >
            {rooms?.map((p) => (
              <Link
                key={p._id}
                to={`http://localhost:3000/api/get-single-room/${p._id}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" ,height:"22rem"}}>
                  <img
                    src={`http://localhost:3000/api/get-roomImage/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.city}</h5>
                    <p className="card-text">{p.des}</p>
                    <p className="card-text">{"Rent per day: "}{ p.rent}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
    <div class="bottom-bar">
    <div class="icon wallet" onClick={handleWalletClick}>&#x1F4B3;</div> 
    <div class="icon profile">&#x1F464;</div> 
  </div>
    </div>

  );
};

export default Customer;
