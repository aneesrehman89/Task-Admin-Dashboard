import React, { useContext, useState } from 'react'
import '../assest/styling/Header.css';
import empimg from '../assest/images/user.jpg'
import { BiLogOut } from "react-icons/bi";
import { RiSettings3Line } from "react-icons/ri";
import Avatar from '@mui/material/Avatar';
import { useNavigate, Link } from 'react-router-dom';
import { UserDetail } from '../ContextProvider/Context';

const Header = () => {
  const navigate = useNavigate();
  const { emp, setemp } = useContext(UserDetail);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);


  let handleLogout = async () => {
    setemp(null);
    setShowLogoutPopup(false);
    navigate('/login');
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  const toggleLogoutPopup = () => {
    setShowLogoutPopup(true);
  };

  return (
    <>
      <div className="headerParent">
        <div className="header">
          <div className='parentImgContainer'>
            <div className="imgContainer">
              <img src={empimg} alt='img' />
            </div>
            <p>Welcome, <strong>{emp.fullName.toUpperCase([0])}!</strong></p>
          </div>
          {emp ? (
            <div className="dropdown">
              <div className="avatar">
                <Avatar style={{ background: "#0d1936" }}> {emp.fullName[0].toUpperCase()} </Avatar>
              </div>
              <div className="dropdownContent">
                <ul>
                  <li onClick={toggleLogoutPopup}><BiLogOut id='dropdownIcon' /> Logout</li>
                  <hr />
                  <li><Link id='setting' to='/setting'> <RiSettings3Line id='dropdownIcon' /> Settings</Link></li>
                </ul>
              </div>
            </div>)
            : (
              <div className="dropdown">
                <div className="avatar">
                  <Avatar style={{ background: "#0d1936" }} />
                </div>
                <div className="dropdownContent">
                  <ul>
                    <li id='logoutList' onClick={toggleLogoutPopup}><BiLogOut id='dropdownIcon' /> Logout</li>
                    <hr />
                    <li><Link id='setting' to='/setting'><RiSettings3Line id='dropdownIcon' />Settings</Link></li>
                  </ul>
                </div>
              </div>
            )}
        </div>
      </div>

      {showLogoutPopup && (
        <div className="logoutPopup">
          <div className="popupContent">
            <p>Are you sure you want to logout?</p>
            <div className="popupButtons">
              <button className="yesButton" onClick={handleLogout}>Yes</button>
              <button className="noButton" onClick={handleCancelLogout}>No</button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default Header
