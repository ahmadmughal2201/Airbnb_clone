import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { useMyContext } from './MyContext';
import { BiSolidAddToQueue } from 'react-icons/bi';
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MdOutlineReviews } from "react-icons/md";
import {saveLogs} from "../utils/logs";

const RoomInfo = () => {
  const navigate = useNavigate();
  /*const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");*/
  const [id, setId] = useState("");
  const [city, setCity] = useState("");
  const [flag, setFlag] = useState(false);
  const [country, setCountry] = useState("");
  const [des, setDes] = useState("");
  const [rent, setRent] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
  const [date, setDate] = useState("");
  const [date2, setDate2] = useState("");
  const params = useParams();

  const {money, setMoney, customerId, setCustomerId, roomId, setRoomId} = useMyContext();



  //get single product
  const getSingleProduct = async () => {
    console.log("The where id needed: ", params.id);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/get-single-room/${params.id}`
      );
        console.log('Data Room: ',data.newRoom);

        /*setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        setCategory(data.product.category._id);*/
        setCity(data.newRoom.city);
        console.log("City Neededd: ", data.newRoom.city);
        setCountry(data.newRoom.country);
        setDes(data.newRoom.des);
        setRating(data.newRoom.rating);
        setRent(data.newRoom.rent);
        setLocation(data.newRoom.location);
        setType(data.newRoom.type);
        setId(params.id);
        setRoomId(params.id);
        console.log("Params ki room Id", roomId);

    } catch (error) {
      console.log(error);
      saveLogs(error.message, "/RoomInfo", "Customer");
    }
  };

  
  const handleClick = async(e) => {
    e.preventDefault();
    navigate('/rating');
  }
  const handleClick2 = async(e) => {
    e.preventDefault();
    navigate('/review');
  }
  const handleClick3 = async(e) => {
    e.preventDefault();
    navigate('/readReviews');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      CID: '',
      Status: true,
      Wallet: '',
    }
    const fData = {
      CID: '',
      RID: '',
      RentedDate: '',
      CheckedInDate: null,
      DueDate: '',
      CheckedOutDate: null,
      Rent: '',
      Status: true,
    }

    formData.CID = customerId;
    formData.Wallet = money;

    fData.CID = customerId;
    fData.RID = id;
    fData.RentedDate = date;
    fData.DueDate = date2;
    fData.Rent = rent;

  
    try {
      const r = await axios.post('http://localhost:3000/api/addGuest', formData);
      console.log("Add Guest: ", r.data);
      try {
        const res = await axios.post('http://localhost:3000/api/addRented', fData);
        console.log("Add Rented: ", res.data);
        setFlag(false);
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
  }

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  /*const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };*/

  useEffect(() => {
    //getAllCategory();
  }, []);

  //create product function
  /*const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };*/
  const handleChange = (e) => {
    setDate(e.target.value);
    console.log("Date ",e.target.value);
  };
  const handleChange2 = (e) => {
    setDate2(e.target.value);
    console.log("Date ",e.target.value);
  };
  return (
    <div>
    <div
      style={{
        position: 'fixed',
        top: '120px',
        right: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90px',
        height: '35px',
        backgroundColor: '#ff5a60',
        color: 'white',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
        transition: 'background-color 0.1s ease-out',
      }} onClick={handleClick3}
    >
      <div
        style={{
          fontSize: '35px',
          color: 'white',
          transition: 'color 0.1s',
        }}
      >
        <h6>Reviews</h6>
      </div>
    </div> 
    
    <div
      style={{
        display: 'flex',
        flexDirection: 'column', // Align items in a column
        alignItems: 'center', // Center items horizontally
        paddingTop: '20px',
        height: '100vh', // Set the height to 100% of the viewport height
      }}
    >
      <div className="text-center">
        <img
          src={`http://localhost:3000/api/get-roomImage/${id}`}
          alt="product_photo"
          height="200px"
          className="img img-responsive"
        />
      </div>
      <div>
        <br/>
        <h6>City name:  {city}</h6>
        <br/>
        <h6>Country name:  {country}</h6>
        <br/>
        <h6>Location:  {location}</h6>
        <br/>
        <h6>Rent:  {rent}$</h6>
        <br/>
        <h6>Description:  {des}</h6>
        <br/>
        <h6>Room type:  {type}</h6>
        <br/>
        <h6>Rating:  {rating}</h6>
        <br/>
        <h6>Date of check in:</h6>
          <input
            type="Date"
            id="rentDate"
            name="rentDate"
            value={date}
            onChange={handleChange}
            className="textBoxBorder"
          />
          <br/>
          <br/>
        <h6>Date of check out:</h6>
          <input
            type="Date"
            id="dueDate"
            name="dueDate"
            value={date2}
            onChange={handleChange2}
            className="textBoxBorder"
          />
          <br/><br/>
          <button className="button ml-30 flex items-center border px-2 py-2 rounded-full bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out" type="submit" onClick={handleSubmit}>Rent Room</button>
      </div>
      <div> 
      <div
      style={{
        position: 'fixed',
        bottom: '100px',
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
        <FaStar />
      </div>
    </div> 
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
      }} onClick={handleClick2}
    >
      <div
        style={{
          fontSize: '35px',
          color: 'white',
          transition: 'color 0.1s',
          
        }}
      >
        <MdOutlineReviews />
      </div>
    </div>
      </div>
    </div>
    </div>
  );  
};

export default RoomInfo;