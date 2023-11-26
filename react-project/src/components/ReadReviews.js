import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useMyContext } from './MyContext';
import './Reviews.css';


const ReadReviews = () => {
    const [reviews, setReviews] = useState("");
    const {roomId, setRoomId } = useMyContext();

    const getAllReviews = async () => {
        console.log("Get all reviews",roomId);
        try {
            const { data } = await axios.get(`http://localhost:3000/api/getReviews/${roomId}`);
            setReviews(data.reviews);
            if (Array.isArray(data.reviews)) {
                data.reviews.forEach(review => {
                  console.log("Reviews are: ", review.Review);
                });
              } else {
                console.log("Reviews data is not an array.");
              }
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
    };

    useEffect(() => {
        getAllReviews();
      }, []);

      return(
        <div  className='division'>
      <h2 className='heading'>All Reviews</h2>
      {reviews.length === 0 ? (
        <p className='pp'>No reviews available.</p>
      ) : (
        <ul className='ulist'>
          {reviews.map((review) => (
            <li key={review._id} className='list'>
              <p><strong>Review:</strong> {review.Review}</p>
              <p><strong>Customer ID:</strong> {review.CID}</p>
              <p><strong>Status:</strong> {review.Status ? 'Approved' : 'Pending'}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
      );
}


export default ReadReviews;