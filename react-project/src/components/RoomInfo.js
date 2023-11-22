import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const RoomInfo = () => {
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
  const [country, setCountry] = useState("");
  const [des, setDes] = useState("");
  const [rent, setRent] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
  const [date, setDate] = useState("");
  const [date2, setDate2] = useState("");
  const params = useParams();


  //get single product
  const getSingleProduct = async () => {
    
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
        setCountry(data.newRoom.country);
        setDes(data.newRoom.des);
        setRating(data.newRoom.rating);
        setRent(data.newRoom.rent);
        setLocation(data.newRoom.location);
        setType(data.newRoom.type);
        setId(params.id);

    } catch (error) {
      console.log(error);
    }
  };
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
      </div>
      <div>  
      </div>
    </div>
  );  
};

export default RoomInfo;