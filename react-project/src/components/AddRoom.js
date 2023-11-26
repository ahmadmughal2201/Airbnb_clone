import React, { useEffect, useState } from 'react';
import DropZone from 'react-dropzone';
import './AddRoom.css';
import axios from 'axios';
import { useMyContext } from './MyContext';
import { useNavigate } from "react-router-dom";
import {saveLogs} from "../utils/logs";


const AddRoom = () => {
  const navigate = useNavigate();
  const [mandata, setmanData] = useState({
    MID: '',
    RID: '',
    status: true,
  })
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    rent: '',
    location: '',
    img: null,
    des: '',
    type: '',
    history: 's',
    rating: '0',
    trending: false,
    sleep: false,
    views: false,
    luxury: false,
    farm: false,
    mountain: false,
    exciting: false,
    tropical: false,
  });

  const [fileData, setFileData] = useState({ img: '' });

  const { managerId, setManagerId, roomId, setRoomId} = useMyContext();
  const [img, setImage] = useState();
  const [allImage, setAllImage] = useState(null);

  useEffect(() => {
    getImage();
  }, []);


  const submitImage = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        // Append each property to FormData
        fd.append(key, value);
      });
      console.log(fd.data);
      console.log("Before Axios request");
      const result = await axios.post("http://localhost:3000/api/upload-image", fd);
      console.log("After Axios request");
      setRoomId(result.data.id);
      console.log("Room Id: ", roomId);
      console.log("Server response:", result.data);
      try{
        console.log("Before Axios request 2");
        mandata.MID = managerId;
        mandata.RID = result.data.id;
        console.log("Result Data Id: ", result.data.id);
        const res = await axios.post("http://localhost:3000/api/add-manager-room",mandata)
        console.log("After Axios request 2");
        console.log("Manager room response:", res.data);
      }catch (error) {
        saveLogs(error.message, "/add-room", "Manager");
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
    
    navigate("/manager");
  };

  const getImage = async () => {
    console.log("In get");
    try{
      console.log("in try")
      const result = await axios.get("http://localhost:3000/api/get-image");
      console.log(result);
      setAllImage(result.data.data);
    }
    catch(error){
      console.error(error);
    }
  };

  const onInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    const inputValue = type === 'file' ? files[0] : type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  // Store the selected image in the image state if needed
    setImage(e.target.files[0]);
  };





  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    const inputValue = type === 'file' ? files[0] : type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    console.log("In the handle submit");
    try {
        console.log("In the try block");
        const r = await axios.post('http://localhost:3000/api/room', formData);
        console.log('Room Uploaded!:', r.data);
    }catch(err){
      console.error("Can't be uploaded. Errror is: ", err);
    }
    // You can access the values entered by the user in formData.field1, formData.field2, etc.
    // Perform any actions or submit the data as needed.
  };

  const handleTypeChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setFormData({
      ...formData, img : e.target.files[0]
    })
  }

  const handleOptionClick = (option) => {
    setFormData({ ...formData, type: option });
    setIsComboBoxOpen(false);
  };

  const [isComboBoxOpen, setIsComboBoxOpen] = useState(false);

  const handleComboBoxClick = () => {
    setIsComboBoxOpen(!isComboBoxOpen);
  };

   const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData({ ...formData, [name]: checked });
  };

  return (
    <div  className='Add' >
      <form onSubmit={submitImage} className='formStyle'>
<div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {img ? img.name : "Upload Photo"}
                  <input
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={onInputChange}
                    hidden
                  />
                </label>
              </div>
<div>
                {img && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

<div class="vertical-gap"></div>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder='Enter City'
          className='textBoxBorder form-control'
          required
        />
        <input
          type="text"
          id = 'country'
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Enter Country"
          className='textBoxBorder form-control'
          required
        />
        <input
          type="text"
          id = 'rent'
          name="rent"
          value={formData.rent}
          onChange={handleChange}
          placeholder="Enter Per Day Rent"
          className='textBoxBorder form-control'
          required
        />
        <input
          type="text"
          id = 'location'
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Add Address"
          className='textBoxBorder form-control'
          required
        />
        <input
          type="text"
          id = 'des'
          name="des"
          value={formData.des}
          onChange={handleChange}
          placeholder="Add Description"
          className='textBoxBorder form-control descrip'
          required
        />
          <div className={`combo-box ${isComboBoxOpen ? 'active' : ''}`}>
            <div className="combo-box-header">
              <input
                type="text"
                id="role"
                name="role"
                value={formData.type}
                onChange={handleTypeChange}
                className="textBoxBorder form-control"
                placeholder="Select a Room Type"
                onClick={handleComboBoxClick}
              />
              <div className="combo-box-arrow" onClick={handleComboBoxClick}>
                &#9660;
              </div>
            </div>
            {isComboBoxOpen && (
              <ul className="combo-box-options">
                <li onClick={() => handleOptionClick('Bed & Breakfast')}>Bed & Breakfast</li>
                <li onClick={() => handleOptionClick('Hostel')}>Hostel</li>
                <li onClick={() => handleOptionClick('Motel')}>Motel</li>
                <li onClick={() => handleOptionClick('Suite')}>Suite</li>
                <li onClick={() => handleOptionClick('Guest House')}>Guest House</li>
                <li onClick={() => handleOptionClick('Resort')}>Resort</li>
                <li onClick={() => handleOptionClick('Apartment')}>Apartment</li>
              </ul>
            )}
        </div>
        <div>
      <label>
        <input
          type="checkbox"
          name="sleep"
          checked={formData.sleep}
          onChange={handleCheckboxChange}
        />
        Sleep
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="views"
          checked={formData.views}
          onChange={handleCheckboxChange}
        />
        Views
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="luxury"
          checked={formData.luxury}
          onChange={handleCheckboxChange}
        />
        Luxury
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="farm"
          checked={formData.farm}
          onChange={handleCheckboxChange}
        />
        Farm
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="mountain"
          checked={formData.mountain}
          onChange={handleCheckboxChange}
        />
        Mountain
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="tropical"
          checked={formData.tropical}
          onChange={handleCheckboxChange}
        />
        tropical
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="exciting"
          checked={formData.exciting}
          onChange={handleCheckboxChange}
        />
        Exciting
      </label>
    </div>
    <div className='vertical-gap'></div>
<div className="flex items-center justify-center">
  <div className="border px-3 py-2 rounded-full bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out">
    <button type="submit">Submit</button>
  </div>
</div>

      </form>
    </div>
  );
};

export default AddRoom;
