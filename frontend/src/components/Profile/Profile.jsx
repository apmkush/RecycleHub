import React from 'react';

// Profile component that takes props for user type and details
const Profile = ({ userType, userDetails, profilePicture }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h1 className="text-2xl font-bold">{userDetails.name}</h1>
          <p className="text-gray-600">{userDetails.email}</p>
        </div>
      </div>

      {/* Common Profile Details */}
      <div className="mb-4">
        <p><span className="font-semibold">Contact Number:</span> {userDetails.contactNumber}</p>
        {userType === 'customer' && (
          <p><span className="font-semibold">Home Address/Preferred Pickup Location:</span> {userDetails.address}</p>
        )}
      </div>

      {/* User-Specific Details */}
      {userType === 'dealer' && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Operational Details</h2>
          <p><span className="font-semibold">Operational Areas:</span> {userDetails.operationalAreas.join(', ')}</p>
          <p><span className="font-semibold">Dealer License Number:</span> {userDetails.licenseNumber}</p>
          <p><span className="font-semibold">Certifications:</span> {userDetails.certifications.join(', ')}</p>
        </div>
      )}

      {userType === 'admin' && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Admin Settings</h2>
          <p><span className="font-semibold">Notification Management:</span> {userDetails.notificationManagement}</p>
        </div>
      )}
    </div>
  );
};

// Sample props for demonstration purposes
const sampleCustomer = {
  name: 'John Doe',
  contactNumber: '123-456-7890',
  email: 'john.doe@example.com',
  address: '123 Main St, Anytown, USA',
};

const sampleDealer = {
  name: 'Jane Smith',
  contactNumber: '987-654-3210',
  email: 'jane.smith@example.com',
  operationalAreas: ['Area 1', 'Area 2'],
  licenseNumber: 'DL-12345',
  certifications: ['Certification A', 'Certification B'],
};

const sampleAdmin = {
  name: 'Admin User',
  contactNumber: '555-000-1234',
  email: 'admin.user@example.com',
  notificationManagement: 'Enabled',
};

// Main function to render based on user type
const App = () => {
  // Change this variable to 'customer', 'dealer', or 'admin' for testing
  const userType = 'customer'; 
  const profilePicture = 'https://via.placeholder.com/150'; // Replace with actual URL

  let userDetails;
  if (userType === 'customer') {
    userDetails = sampleCustomer;
  } else if (userType === 'dealer') {
    userDetails = sampleDealer;
  } else if (userType === 'admin') {
    userDetails = sampleAdmin;
  }

  return <Profile userType={userType} userDetails={userDetails} profilePicture={profilePicture} />;
};

export default App;
