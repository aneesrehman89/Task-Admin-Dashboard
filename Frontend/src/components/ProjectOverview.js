import React, { useContext, useState } from 'react'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../assest/styling/ProjectOverview.css';
import { RiProgress5Line } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoListCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { UserDetail } from '../ContextProvider/Context';

const ProjectOverview = () => {
  const { emp, addTaskDetail, inProgress, complete, setAddTaskDetail, dataUpdated, setDataUpdated } = useContext(UserDetail);
  // console.log("ProjectOverViewaddTaskDetail",addTaskDetail)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Calculate total pages and current items
  const totalPages = Math.ceil(addTaskDetail.length / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentTasks = addTaskDetail.slice(firstItemIndex, lastItemIndex);

  const getTaskStatus = (task) => {
    if (inProgress.includes(task)) return 'In Progress';
    if (complete.includes(task)) return 'Completed';
    return 'To Do';
  };

  const deleteTask = async (index) => {
    const taskName = addTaskDetail[index]; 
    
    const email = emp.email; 

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${email}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: taskName, email, addTaskDetail}), 
      });

      if (response.ok) {
       console.log(response)
        const updatedTasks = addTaskDetail.filter((v, i) => i !== index);
        console.log("frontend updatedTasks",updatedTasks);
        setAddTaskDetail(updatedTasks);
        // setDataUpdated(updatedTasks);
        console.log("del fun setaddtask ",addTaskDetail);
        // setDataUpdated(!dataUpdated);
        // console.log("toggle state", dataUpdated);
        alert('Task successfully deleted!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to delete the task.');
      }
    } catch (error) {
      console.error('Error deleting the task:', error);
      alert('An error occurred while deleting the task.');
    }
  };


 

  return (
    <>
      <Header />
      <Sidebar />
      <div className="mainContainer">
        <div className="parentProjectOverview">
          <div className="ProjectOverviewCards">
            <div className="ProjectOverviewCard">
              <div className="projectCardContent">
                <div className="number">{addTaskDetail.length}</div>
                <div className="cardName">Total Projects</div>
              </div>
              <div className="cardIconBox">
                <IoListCircleSharp />
              </div>
            </div>

            <div className="ProjectOverviewCard">
              <div className="projectCardContent">
                <div className="number">{inProgress.length}</div>
                <div className="cardName">Inprogress Projects</div>
              </div>
              <div className="cardIconBox">
                <RiProgress5Line />
              </div>
            </div>

            <div className="ProjectOverviewCard">
              <div className="projectCardContent">
                <div className="number">{complete.length}</div>
                <div className="cardName">Completed Projects</div>
              </div>
              <div className="cardIconBox">
                <IoCheckmarkDoneCircle />
              </div>
            </div>
          </div>
        </div>
        <div className="table">
          <div className="projectOverviewContainer">
            <div className="tableHeading">
              <h2>Project Overview</h2>
            </div>
            <table className='projectDetails'>
              <thead>
                <tr>
                  <td>Project Name</td>
                  <td id='second'>Status</td>
                  <td id='third'>Deadline</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {currentTasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task}</td>
                    <td id='statusData'>{getTaskStatus(task)}</td>
                    <td id='deadlineData'>23 Nov,2024</td>
                    <td>
                      <MdDelete id='delIcon' onClick={() => deleteTask(index)} />
                    </td>
                  </tr>
                ))}

                <div className="projectoverviewPagination">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <GrPrevious className='arrowIcon'/>
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <GrNext className='arrowIcon' />
                  </button>
                </div>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  )
}

export default ProjectOverview
