import React, { useState } from 'react';
import DropZone from 'react-dropzone';
import './AddRoom.css';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    rent: '',
    loacation: '',
    img: '',
    des: '',
    type: '',
    history: null,
    rating: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the values entered by the user in formData.field1, formData.field2, etc.
    // Perform any actions or submit the data as needed.
  };

  return (
    <div  className=' py-10 sm:mx-10 md:mx-11 lg:mx-12 px-7 justify-center gap-7 column-container' >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="City"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className='textBoxBorder'
        />
        <input
          type="text"
          name="Country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          className='textBoxBorder'
        />
        <input
          type="text"
          name="Rent"
          value={formData.rent}
          onChange={handleChange}
          placeholder="Rent"
          className='textBoxBorder'
        />
        <input
          type="text"
          name="Location"
          value={formData.loacation}
          onChange={handleChange}
          placeholder="Location"
          className='textBoxBorder'
        />
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
      <input {...getInputProps()} />
      <p>Drop your picture here</p>
    </div>
  )}
</DropZone>

        <input
          type="text"
          name="Description"
          value={formData.des}
          onChange={handleChange}
          placeholder="Description"
          className='textBoxBorder'
        />
        <input
          type="text"
          name="Type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type"
          className='textBoxBorder'
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddRoom;
