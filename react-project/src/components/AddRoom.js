import React, { useEffect, useState } from 'react';
import DropZone from 'react-dropzone';
import './AddRoom.css';
import axios from 'axios';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    rent: '',
    location: '',
    img: '',
    des: '',
    type: '',
    history: null,
    rating: null,
    trending: false,
    sleep: false,
    views: false,
    luxury: false,
    farm: false,
    mountain: false,
    exciting: false,
    tropical: false,
  });




  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);

  useEffect(() => {
    getImage();
  }, []);


  const submitImage = async (e) => {
    console.log("In Submit");
    e.preventDefault();
    console.log(image);
    formData.img = null;

    try{
      const result = await axios.post("http://localhost:3000/api/roomAdd",formData);
      console.log(result);
    }
    catch(error){
      if (error.response) {
        // The request was made, and the server responded with a status code that falls outside the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        // The request was made, but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log('Error', error.message);
      }
    }
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
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };





  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <DropZone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
  {({ getRootProps, getInputProps }) => (
    <div
      style={{
        padding: '10px',
        width: '150px',
        height: '150px',
        border: '2px dashed grey',
        borderRadius: '5px',
        display: 'flex',
        cursor: 'pointer',
        margin: 'auto',
      }}
      {...getRootProps()}
    >
      <input
        {...getInputProps()}
        accept="image/*"
        style={{ display: 'block' }} // Change display to 'block' to make it visible
        tabindex="0" // Set tabindex to '0' to make it focusable
        name="img"
        onChange={onInputChange}
        className="hidden-input" 
      />
      <p>Drop your picture here</p>
    </div>
  )}
</DropZone>

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
        <div className = 'vertical-gap'></div>
         <div className="flex items-center border px-3 py-2 rounded-full gap-2 bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out"
          >
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
