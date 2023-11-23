import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import { useMyContext } from './MyContext';
import axios from 'axios';


const RatingInput = () => {
 
  const {roomId, setRoomId, customerId, setCustomerId} = useMyContext();
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        CID: '',
        RID: '',
        Rating: 0,
        Status: true
      };
    
    formData.CID = customerId;
    formData.RID = roomId;
    formData.Rating = rating;
    console.log("Form Data: ", formData);

    try {
        const res = await axios.post('http://localhost:3000/api/addRating', formData);
        console.log("Add Rating: ", res.data);
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

  const handleRatingChange = (newRating) => {
   setRating(newRating);
  };

  return (
    <div className="dialog">
      <label htmlFor="uName">Enter Rating:</label>
      <StarRatings
        rating={rating}
        starRatedColor="gold"
        changeRating={handleRatingChange}
        numberOfStars={5}
        starDimension="30px"
        starSpacing="5px"
        name="rating"
      />
      <br/> <br/>
      <button className="button ml-20 flex items-center border px-3 py-2 rounded-full gap-2 bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out" type="submit" onClick={handleSubmit}>Rate</button>
    </div>
    
  );
};

export default RatingInput;
