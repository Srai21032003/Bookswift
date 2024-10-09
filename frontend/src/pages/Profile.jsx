import React from 'react';
import './Profile.css'; // Import the CSS file for styling

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My profile</h1>
        <div className="profile-info">
          <img
            className="profile-image"
            src='../assets/girl1.webp' // Placeholder for the profile image
            alt="Profile"
          />
          <div className="profile-details">
            <h2>Matilda Brown</h2>
            <p>matildabrown@email.com</p>
          </div>
        </div>
      </div>

      <div className="profile-options">
        <div className="profile-option">
          <span>My orders</span>
          <p>Already have 12 orders</p>
        </div>
        <div className="profile-option">
          <span>Shipping addresses</span>
          <p>2 addresses</p>
        </div>
        <div className="profile-option">
          <span>Payment methods</span>
          <p>Visa ***734</p>
        </div>
        {/* <div className="profile-option">
          <span>Promocodes</span>
          <p>You have special promocodes</p>
        </div> */}
        {/* <div className="profile-option">
          <span>My reviews</span>
          <p>Reviews for 4 items</p>
        </div> */}
        <div className="profile-option">
          <span>Settings</span>
          <p>Notifications, password</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
