import React, { useContext, useEffect } from 'react'
import { UserDetail } from '../ContextProvider/Context'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProctectedUser = ({children}) => {
  const {emp,setemp } = useContext(UserDetail);
  
  useEffect(() => {
    if (!emp) {
      const storedUser = Cookies.get('user');
      if (storedUser) {
        setemp(JSON.parse(storedUser));
      }
    }
  }, [emp, setemp]);
  
   if(!emp){
   return <Navigate to="/login" />;
   }
  
  return children;
  
}

export default ProctectedUser
