import React, { useState } from 'react';
import axios, { Axios } from 'axios';
import { backendUrl } from '../../service/url';

const AddDetails = ({ setShowAddDetails , category,refreshItems }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const [formInput,setFormInput]=useState({
    price:"",
    material:"",
    category:category,
    image:"",
});

  const handleInput=(event)=>{
    const{name,value}=event.target;

    let obj={[name]:value};

    setFormInput((prev)=>({...prev,...obj}));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(formInput.category);
    if (formInput.price==""||formInput.material=="") {
      setError('Please fill out all fields.');
      return;
    }
    try {
      const response=await axios.post(`${backendUrl}/addItem`,formInput,{
        headers:{
            'Content-Type':'application/json'
        }
    });
    if(response.data.success){
      console.log('Item added:', response.data);
      refreshItems();
    }
    } catch (error) {
      console.error('Error adding item:', error);
    }
    setError('');
    // Handle the form submission logic here (e.g., uploading the data)
    setShowAddDetails(false); // Close the form after successful submission
  };

  const handleImageChange = (e) => {
    var imgData = new FileReader();
    imgData.readAsDataURL(e.target.files[0]);
    imgData.onload = () => {
      let obj = { image: imgData.result };

      setFormInput((prev)=>({...prev,...obj}));
      // setImage(imgData.result);
      // console.log(imgData.result);
      // console.log(obj);
    }
    imgData.onerror = () => {
      console.log("Error: ",Error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Scrap Item</h2>
      
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Item</label>
          <input
            type="text"
            name="material"
            onChange={handleInput}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter scrap type"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            onChange={handleInput}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter price"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button 
            type="button" 
            onClick={() => setShowAddDetails(false)} 
            className="text-red-500 font-semibold"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDetails;
