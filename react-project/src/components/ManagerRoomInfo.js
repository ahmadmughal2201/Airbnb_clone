import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import toast from "react-hot-toast";
import { useMyContext } from './MyContext';
import { BiSolidAddToQueue } from 'react-icons/bi';
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {saveLogs} from "../utils/logs";


const ManagerRoomInfo = () => {
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
    const [values, setValues] = useState("");

    const { money, setMoney, customerId, setCustomerId, roomId, setRoomId } = useMyContext();

    const [editableRent, setEditableRent] = useState(false);
    const [editableLocation, setEditableLocation] = useState(false);
    const [editableDescription, setEditableDescription] = useState(false);


    //get single product
    const getSingleProduct = async () => {
        console.log("The where id needed: ", params.id);
        try {
            const { data } = await axios.get(
                `http://localhost:3000/api/get-single-room/${params.id}`
            );
            console.log('Data Room: ', data.newRoom);
                setValues(data.newRoom);
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

        } catch (error) {
            console.log(error);
            saveLogs(error.message, "/managerRoomInfo", "Manager");
        }
    };


    const handleClick = async (e) => {
        e.preventDefault();
        navigate('/rating');
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("The where id needed: ", params.id);
        const idd= params.id;
        const formData = {
            city : city,
            country: country,
            rent: rent,
            location: location,
            des: des,
            type: type,
            history: values.history,
            rating: rating,
            trending: values.trending,
            sleep: values.sleep,
            views: values.views,
            luxury: values.luxury,
            farm: values.farm,
            mountain: values.mountain,
            exciting: values.exciting,
            tropical: values.tropical,
          } 
        try {
            const data = await axios.put(
                `http://localhost:3000/api/update-room/${idd}`, formData
            );
            console.log('Data Room Updated: ', data);
            navigate('../../manager');
        }
        catch(error){
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
    const handleDelete = async (e) => {
        e.preventDefault();
        console.log("The where id needed: ", params.id);
        const iddd=params.id;
        try {
            const res = await axios.delete(
                `http://localhost:3000/api/delete-room/${iddd}`
            );
            console.log('Data Room Deleted: ', res);
            navigate('../../manager');
        }
        catch(error){
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

    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);

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
        console.log("Date ", e.target.value);
    };
    const handleChange2 = (e) => {
        setDate2(e.target.value);
        console.log("Date ", e.target.value);
    };
    const handleRentChange = (event) => {
        // Handle changes to the Rent field
        // You can perform validation or other actions here
        setRent(event.target.value);
    };

    const handleLocationChange = (event) => {
        // Handle changes to the Location field
        // You can perform validation or other actions here
        setLocation(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        // Handle changes to the Description field
        // You can perform validation or other actions here
        setDes(event.target.value);
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
                <div>
                    <br />
                    <label>
                        City name:
                        <input type="text" value={city} readOnly />
                    </label>
                    <br />
                    <label>
                        Country name:
                        <input type="text" value={country} readOnly />
                    </label>
                    <br />
                    <label>
                        Location:
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={{
                                borderColor: editableLocation ? '#FFA500' : '#ced4da', // Use your preferred shade of orange
                                padding: '5px', // Add padding for better appearance
                            }}
                        />
                    </label>
                    <br />
                    <label>
                        Rent:
                        <input
                            type="text"
                            value={rent}
                            onChange={(e) => setRent(e.target.value)}
                            style={{
                                borderColor: editableRent ? '#FFA500' : '#ced4da', // Use your preferred shade of orange
                                padding: '5px', // Add padding for better appearance
                            }}
                        />
                    </label>
                    <br />
                    <label>
                        Description:
                        <input
                            type="text"
                            value={des}
                            onChange={(e) => setDes(e.target.value)}
                            style={{
                                borderColor: editableDescription ? '#FFA500' : '#ced4da', // Use your preferred shade of orange
                                padding: '5px', // Add padding for better appearance
                            }}
                        />
                    </label>
                    <br />
                    <label>
                        Room type:
                        <input type="text" value={type} readOnly />
                    </label>
                    <br />
                    <label>
                        Rating:
                        <input type="text" value={rating} readOnly />
                    </label>
                </div>
                <div className="text-center mt-4">
  <div className="row">
    <div className="col">
      <button
        className="button mx-2 flex items-center border px-2 py-2 rounded-full bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out"
        type="button"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
    <div className="col">
      <button
        className="button mx-2 flex items-center border px-2 py-2 rounded-full bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out"
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  </div>
</div>

            </div>
        </div>
    );
};

export default ManagerRoomInfo;