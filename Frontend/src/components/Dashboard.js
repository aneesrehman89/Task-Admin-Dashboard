import React, { useState, useEffect, useContext } from 'react';
import '../assest/styling/Dashboard.css';
import { LuListTodo } from "react-icons/lu";
import { RiProgress4Line } from "react-icons/ri";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { VscAdd } from "react-icons/vsc";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import { FiSearch } from "react-icons/fi";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { toast, ToastContainer } from "react-toastify";
import { FaHandPointLeft } from "react-icons/fa";

import { UserDetail } from '../ContextProvider/Context';

const Dashboard = () => {

//    const DashboardValid = async()=>{
//      let token = localStorage.getItem('userdatatoken');
//      console.log("Token ",token); 

//        const res = await fetch("${process.env.REACT_APP_API_URL}/validuser",{
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//        });

//        const data = await res.json();
//        console.log("dashboard data ",data);
// }

// useEffect(()=>{
//   DashboardValid();
// },[])

  const { emp, updateTaskData, updatedUserTask, dataUpdated } = useContext(UserDetail);

  const [searchTask, setSearchTask] = useState('');
  const [addTask, setAddTask] = useState('');
  const [addTaskDetail, setAddTaskDetail] = useState([]);
  const [inProgress, setInprogress] = useState([]);
  const [complete, setComplete] = useState([]);

  //for pagination
  const [currentPg, setCurrentPg] = useState(1);
  const [viewItems] = useState(4);
  const lastItem  = currentPg* viewItems ;
  const firstItem = lastItem - viewItems ;
  const filteredTasks = addTaskDetail.filter((task) =>
    task.toLowerCase().includes(searchTask.toLowerCase())
  );
  const currentItem = filteredTasks.slice(firstItem, lastItem);
  const totalPages = Math.ceil(filteredTasks.length/viewItems);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addTask.trim()) {
      toast.warning("Please enter a task");
      return;
    }

    if (addTaskDetail.includes(addTask)) {
      toast.warning("Task already exists");
    } else {
      setAddTaskDetail([...addTaskDetail, addTask]);
      setAddTask("");
      toast.info("Task added successfully");
    }
  };

  const deleteRow = (index) => {
    setAddTaskDetail(addTaskDetail.filter((v, i) => i !== index));
    toast.warning("Task deleted from todo list");
  };

  const deleteCompleteTask = (index) => {
    setComplete(complete.filter((v, i) => i !== index));
    toast.warning("Task deleted from completed tasks");
  };

  const deleteInprogressTask = (index) => {
    setInprogress(inProgress.filter((v, i) => i !== index));
    toast.warning("Task deleted from in-progress tasks");
  };

  const handleComplete = (index) => {
    const completeTask = addTaskDetail[index];
    // Remove the task from inProgress if it exists
    const updatedInProgress = inProgress.filter((task) => task !== completeTask);
    setInprogress(updatedInProgress);

    if (!complete.includes(completeTask)) {
      setComplete([...complete, completeTask]);
      toast.info("Task moved to completed");
    }
  };

  const handleInprogress = (index) => {
    const inProgressTask = addTaskDetail[index];
    // Remove the task from complete if it exists
    const updatedComplete = complete.filter((task) => task !== inProgressTask);
    setComplete(updatedComplete);

    if (!inProgress.includes(inProgressTask)) {
      setInprogress([...inProgress, inProgressTask]);
      toast.info("Task moved to in-progress");
    }
  };

  const saveTaskData = async () => {
    const email = emp.email;
    try {
      updateTaskData(addTaskDetail,inProgress,complete);
      // setAddTaskDetail(dataUpdated);
      await fetch(`${process.env.REACT_APP_API_URL}/dashboard/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addTaskDetail,
          complete,
          inProgress,
        }),
      });
    }
    catch (error) {
      toast.error("An error occur while saving");
    }
  };


  const fetchTaskData = async () => {
    const email = emp.email;
    try {
      const userTask = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${email}`);
      const finalTask = await userTask.json();
      if (userTask.ok) {
        setAddTaskDetail(finalTask.data.addTaskDetail || []);
        setComplete(finalTask.data.complete || []);
        setInprogress(finalTask.data.inProgress || []);
        updateTaskData(finalTask.data);
        // setAddTaskDetail(dataUpdated || finalTask.data.addTaskDetail);
      }
      else {
        console.error("Error fetching task data");
      }
    }
    catch (error) {
      console.error("Error fetching task data:", error);
    }
  };

  

  const email = emp.email; 

  useEffect(() => {
    if (email){
      fetchTaskData();
    } else{
      toast.warn("No Tasks available in the database")
    }
  }, [email,updatedUserTask, dataUpdated]);

  useEffect(() => {
    if (email) saveTaskData();
  }, [addTaskDetail, complete, inProgress]);

  

  return (
    <>
      <Header />
      <Sidebar />
      <ToastContainer />
      <div className="mainContainer">
        <div className="dashboardParentContainer">
          <div className="dashboardSearch">
            <div className="search">
              <div className="searchBar">
                <input
                  type="text"
                  name="search"
                  placeholder="Search here..."
                  value={searchTask}
                  onChange={(e) => setSearchTask(e.target.value)}
                />
                <label><FiSearch /></label>
              </div>
            </div>
          </div>
          <div className="contentContainer">
            <div className="cards">
              <div className="card">
                <div className="cardHeading">
                  <div className="iconBox">
                    <LuListTodo />
                  </div>
                  <div className="card-Content">
                    <h3>
                    Projects</h3>
                  </div>
                </div>
                <div className="cardList">
                  <div className="addTask">
                    <input
                      type="text"
                      name="inputTask"
                      value={addTask}
                      onChange={(e) => setAddTask(e.target.value)} />
                    <div className="addIconContainer">
                      <VscAdd  id="addIcon" onClick={handleSubmit} />
                    </div>
                  </div>
                  <div className="taskListContainer">
                    {currentItem.length >= 1 ? (
                     currentItem.map((task, i) => (
                        <ul key={i}>
                          <li>
                           <div className="index">{firstItem + i + 1}.</div> 
                           <div class="taskContent"> {task}
                            <span>
                            <i onClick={() => deleteRow(i)} class="fa-regular fa-circle-xmark"></i>                
                              <div className="listIcon">
                                <RiProgress4Line onClick={() => handleInprogress(i)} size={25} />
                                <IoCheckmarkDoneCircleOutline onClick={() => handleComplete(i)} size={25} />
                              </div>
                            </span>
                            </div>
                          </li>
                        </ul>
                      ))
                    ) : (
                      <p style={{ textAlign: 'center' }}>Task Not Found</p>
                    )}
                  </div>
                  <div className="dashboardPagination">
                    <button
                      onClick={() => setCurrentPg((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPg === 1}
                    >
                     <GrPrevious style={{color:'white'}} />
                    </button>
                    <span>
                     {currentPg} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPg((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPg === totalPages}
                    >
                      <GrNext style={{color:'white'}}/>
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="cardHeading">
                  <div className="iconBox">
                    <RiProgress4Line />
                  </div>
                  <div className="card-Content">
                    <h3> In-progress</h3>
                  </div>
                </div>
                <div className="cardList">
                  <div className="taskListContainer">
                    {inProgress.map((task, i) => (
                      <ul key={i}>
                        <li>
                          {i + 1}. {task}
                          <RxCross2 id="InprogressCrossIcon" onClick={() => deleteInprogressTask(i)} />
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="cardHeading">
                  <div className="iconBox">
                    <IoCheckmarkDoneCircleOutline />
                  </div>
                  <div className="card-Content">
                    <h3>Complete</h3>
                  </div>
                </div>
                <div className="cardList">
                  <div className="taskListContainer">
                    {complete.map((task, i) => (
                      <ul key={i}>
                        <li>
                          {i + 1}. {task}
                          <RxCross2 id="CompleteCrossIcon" onClick={() => deleteCompleteTask(i)} />
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default Dashboard;
