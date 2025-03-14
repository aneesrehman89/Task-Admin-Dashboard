import React, { useContext, useState } from "react";
import "../assest/styling/Profile.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { UserDetail } from "../ContextProvider/Context";
import { TfiEmail } from "react-icons/tfi";
import { SlLocationPin } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import { BsCalendar2Date } from "react-icons/bs";
import femaleProfileImg from "../assest/images/femaleProfile.jpeg";
import maleProfileImg from "../assest/images/Capture.PNG";

const Profile = () => {
  const { emp } = useContext(UserDetail);
 
  const [profileImage, setProfileImage] = useState(null); // State to store the uploaded image

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the uploaded image URL
      };
      reader.readAsDataURL(file); // Convert file to data URL
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="profileContainer">
        <div className="profileCardContainer">
          <div className="profileLeft">
            <div className="profileImageContainer">
              {/* Display uploaded image if available, otherwise fallback to gender-based images */}
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="profileImage" />
              ) : emp.gender === "female" ? (
                <img src={femaleProfileImg} alt="Profile" className="profileImage" />
              ) : (
                <img src={maleProfileImg} alt="Profile" className="profileImage" />
              )}
              {/* Input field for image upload */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="profileImageUpload"
              />
              <label htmlFor="profileImageUpload" className="uploadLabel">
                Upload Image
              </label>
            </div>
          </div>
          <div className="profileRight">
            <h1 className="profileName">{emp.fullName}</h1>
            <h3 className="profileDesignation">Employee</h3>
            <div className="profileDetailContainer">
              <div className="profileDetails">
                <p>
                  <BsTelephone /> {emp.phone}
                </p>
                <div className="addressRow">
                  <div className="addressIcon">
                    <p>
                      <SlLocationPin id="locationIcon" />
                    </p>
                  </div>
                  <div className="addressContainer">
                    <p>{emp.address}</p>
                  </div>
                </div>
                <p>
                  <TfiEmail /> {emp.email}
                </p>
                <p>
                  <RxPerson /> {emp.gender}
                </p>
                <p>
                  <BsCalendar2Date /> {emp.jdate}
                </p>
              </div>
            </div>
            <div className="cardBottom">
              <h3>Your profile is complete! Stay updated with the latest detail.</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;