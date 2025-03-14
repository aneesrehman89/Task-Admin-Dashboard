import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaAsymmetrik } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { PiUserCircle } from "react-icons/pi";
import { GoProjectRoadmap } from "react-icons/go";
import { LiaUserCheckSolid } from "react-icons/lia";
import { VscFeedback } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import '../assest/styling/Sidebar.css';

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <ul>
          <div classNamne="title">
            <li><FaAsymmetrik className="icon" id='comany-icon'/>
             <div className="listTitle">
            Company Name
            </div>
            </li>
          </div>
          <li >
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? 'title is-active' : 'title')}
            >
              <AiOutlineDashboard className="icon" />
             <div className="listTitle">
              Dashboard
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projectOverview"
              className={({ isActive }) => (isActive ? 'title is-active' : 'title')}
            >
              <GoProjectRoadmap className="icon" />
             <div className="listTitle">
              Project Overview
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/attendance"
              className={({ isActive }) => (isActive ? 'title is-active' : 'title')}
            >
              <LiaUserCheckSolid className="icon" />
             <div className="listTitle">
              Attendance
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? 'title is-active' : 'title')}
            >
              <PiUserCircle className="icon" />
             <div className="listTitle">
              Profile
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feedback"
              className={({ isActive }) => (isActive ? 'title is-active' : 'title')}
            >
              <VscFeedback className="icon" />
             <div className="listTitle">
              Feedback
              </div>
            </NavLink>
          </li>
          <li id="settingList" >
            <NavLink
              to="/setting"
              className={({ isActive }) => (isActive ? 'title is-active' : 'title')}
            >
              <IoSettingsOutline className="icon" />
             <div className="listTitle">
              Settings
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
