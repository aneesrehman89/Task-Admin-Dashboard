import React, { useContext } from 'react'
import { UserDetail } from '../ContextProvider/Context'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Authentication = ({children}) => {
  const {emp} =useContext(UserDetail);
  
  if(emp || Cookies.get('user')){
  return <Navigate to="/dashboard" />;
  }
  return children;
};

export default Authentication;
