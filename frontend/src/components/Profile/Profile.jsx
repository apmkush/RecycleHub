import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from backend (replace 'user-id' with actual user ID)
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-data/user-id');
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);
  const  DisplayMessage=(text)=>{
    toast.success(text, {
        position: "top-center",
        autoClose: 3000, // Auto-close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {marginTop: "10px" },
    });
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async (e) => {
    var imgData = new FileReader();
    imgData.readAsDataURL(e.target.files[0]);
    imgData.onload = () => {
      let obj = { image: imgData.result };

      setFormData((prev)=>({...prev,...obj}));
      // setImage(imgData.result);
      console.log(imgData.result);
      // console.log(obj);
  };

  const saveChanges = async () => {
    try {
      // Send updated user data to backend
      const response = await axios.put(`http://localhost:5000/update-data/user-id`, formData);
      setUser(response.data); // Update local user state
      setIsEditing(false);
      if(response.data.success){
        DisplayMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Profile Information</h2>

        {/* Profile Image */}
        <div className="flex items-center space-x-6 mb-8">
          <div>
            <img
              src={formData.profileImage}
              alt="Profile"
              className="h-40 w-40 rounded-full object-cover mb-4"
            />
            {isEditing && (
              <input type="file" onChange={handleImageChange} className="border py-2 px-4 rounded-md" />
            )}
          </div>

          {/* Edit Fields */}
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`text-2xl font-semibold ${isEditing ? 'border p-2 mb-2 rounded-md' : ''}`}
              disabled={!isEditing}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`text-lg font-semibold ${isEditing ? 'border p-2 mb-4 rounded-md' : ''}`}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`border p-2 rounded-md ${isEditing ? '' : 'hidden'}`}
            disabled={!isEditing}
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`border p-2 rounded-md ${isEditing ? '' : 'hidden'}`}
            disabled={!isEditing}
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`border p-2 rounded-md ${isEditing ? '' : 'hidden'}`}
            disabled={!isEditing}
          />
        </div>

        {/* Edit & Save Buttons */}
        <div className="flex justify-center">
          {isEditing ? (
            <button onClick={saveChanges} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
              Save Changes
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-green-500 text-white py-2 px-4 rounded-lg">
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
}
export default MyProfile;
