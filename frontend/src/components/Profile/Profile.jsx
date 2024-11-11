import React, { useState } from 'react';

function MyProfile({ user = {} }) {
  const [isEditing, setIsEditing] = useState(false);

  const defaultUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    contact: '123-456-7890',
    address: '123 Main Street, City, Country',
    profilePicture: 'https://via.placeholder.com/150'
  };

  // Merge `user` with `defaultUser` to fill in missing data
  const initialData = { ...defaultUser, ...user };
  const [profileData, setProfileData] = useState(initialData);
  const [editData, setEditData] = useState(initialData);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfileData(editData);
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">My Profile</h2>
          <button
            className="text-teal-600 border border-teal-600 px-4 py-2 rounded hover:bg-teal-600 hover:text-white transition"
            onClick={handleEditClick}
          >
            Edit Profile
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <img
              src={profileData.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full mr-4"
            />
            <div>
              <p className="text-lg font-semibold">{profileData.name}</p>
              <p className="text-gray-600">{profileData.email}</p>
              <p className="text-gray-600">{profileData.contact}</p>
              <p className="text-gray-600">{profileData.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Overlay */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="contact">Contact Number</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={editData.contact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={editData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-gray-600 mr-4"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
