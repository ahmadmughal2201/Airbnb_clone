import React, { useState } from 'react';
import { useMyContext } from './MyContext';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import "./SignUp.css";

const Review = () => {
 
  const navigate = useNavigate();
  const {roomId, setRoomId, customerId, setCustomerId} = useMyContext();
  const [review, setReview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        CID: '',
        RID: '',
        Review: '',
        Status: true
      };
    
    formData.CID = customerId;
    formData.RID = roomId;
    formData.Review = review;
    console.log("Form Data: ", formData);

    try {
        const res = await axios.post('http://localhost:3000/api/addReview', formData);
        console.log("Add Review: ", res.data);
        navigate('../customer');
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
      }
  }

  const handleReviewChange = (e) => {
   setReview(e.target.value);
   navigate('../customer');
  };

  return (
    <div className="dialog">
      <label htmlFor="uName">Add Review:</label>
      <br/>
      <br/>
      <input
                            type="text"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className={"textBoxBorder"}
                        />
      <br/> <br/>
      <button className="button ml-20 flex items-center border px-3 py-2 rounded-full gap-2 bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out" type="submit" onClick={handleSubmit}>Add</button>
    </div>
    
  );
};

export default Review;
