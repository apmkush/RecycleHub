import React, { useState } from 'react';

const MyProfile = () => {
  // Initial user data with profile image, name, age, and email
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '1234 Elm Street, Springfield, IL',
    age: 30,
    profileImage: 'https://via.placeholder.com/150' // Placeholder profile image
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  // Save changes to profile
  const saveChanges = () => {
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Profile Information</h2>

        {/* Profile Image and Name Section */}
        <div className="flex flex-col md:flex-row items-center space-x-6 mb-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6 md:mb-0">
            <img
              src={formData.profileImage}
              alt="Profile"
              className="h-40 w-40 rounded-full object-cover mb-4"
            />
            {isEditing ? (
              <input
                type="file"
                onChange={handleImageChange}
                className="border py-2 px-4 rounded-md"
              />
            ) : null}
          </div>

          {/* Name and Email */}
          <div className="flex flex-col">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-2xl font-semibold border p-2 mb-2 rounded-md"
              />
            ) : (
              <h3 className="text-2xl font-semibold mb-2">{user.name}</h3>
            )}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-lg font-semibold border p-2 mb-4 rounded-md"
              />
            ) : (
              <p className="text-lg text-gray-500 mb-4">{user.email}</p>
            )}
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {/* Age */}
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-lg">Age:</h3>
            {isEditing ? (
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
            ) : (
              <p>{user.age}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-lg">Phone:</h3>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
            ) : (
              <p>{user.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-lg">Address:</h3>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
            ) : (
              <p>{user.address}</p>
            )}
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex justify-center">
          {isEditing ? (
            <button
              onClick={saveChanges}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;