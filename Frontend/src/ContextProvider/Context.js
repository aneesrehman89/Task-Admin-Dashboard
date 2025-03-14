import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const UserDetail = createContext();

const Context = ({ children }) => {

  const [emp, setemp] = useState(null);
  const [addTaskDetail, setAddTaskDetail] = useState([]);
  const [inProgress, setInprogress] = useState([]);
  const [complete, setComplete] = useState([]);


  // Load user from cookies on initialization
  useEffect(() => {
    const storedUser = Cookies.get('emp');
    if (storedUser) {
      setemp(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (emp) {
      Cookies.set('emp', JSON.stringify(emp), { expires: 7 });
    }
    else {
      Cookies.remove('emp');
    }
  }, [emp]);


  // Function to update employee details
  const updateUserDetail = (updatedData) => {
    setemp(updatedData);
  };

  // Function to update task states
  const updateTaskData = (updateTaskData, inProgress, complete) => {
    setAddTaskDetail(updateTaskData || []);
    setInprogress(inProgress || []);
    setComplete(complete || []);
  };

  return (
    <UserDetail.Provider value={{ emp, setemp, updateUserDetail, addTaskDetail, inProgress, complete, updateTaskData, setAddTaskDetail, setInprogress, setComplete }}>
      {children}
    </UserDetail.Provider>
  );
};

export default Context;
