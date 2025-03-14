import React, { useEffect, useState, useContext } from 'react'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../assest/styling/Attendance.css';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { UserDetail } from '../ContextProvider/Context';

const Attendance = () => {
  const { emp } = useContext(UserDetail);
  const email = emp.email;
  const [attendance, setAttendance] = useState({});
  const [isAttendanceActive, setIsAttendanceActive] = useState(false);

  const todayDate = new Date().toISOString().split("T")[0];
  const checkInTime = attendance[todayDate]?.checkInTime
    ? new Date(attendance[todayDate].checkInTime).toLocaleTimeString()
    : null;
  const checkOutTime = attendance[todayDate]?.checkOutTime
    ? new Date(attendance[todayDate].checkOutTime).toLocaleTimeString()
    : null;

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const totalPages = Math.ceil(Object.keys(attendance).length / recordsPerPage);

  // Pagination logic
  const currentRecords = Object.entries(attendance).slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  // Handle "Mark Attendance" button
  const handleMarkAttendance = () => {
    // Initialize attendance for today if not already present
    if (!attendance[todayDate]) {
      setAttendance((prev) => ({
        ...prev,
        [todayDate]: { checkInTime: null, checkOutTime: null, status: "Absent" },
      }));
    }
    setIsAttendanceActive(true);
  };

  // Handle "Check In" button
  const handleCheckIn = () => {
    if (!checkInTime) {
      const now = new Date().toISOString();
      setAttendance((prev) => ({
        ...prev,
        [todayDate]: {
          ...prev[todayDate],
          checkInTime: now,
          status: "Present",
        },
      }));
    }
  };

  // Handle "Check Out" button
  const handleCheckOut = () => {
    if (!checkOutTime && checkInTime) {
      const now = new Date().toISOString();
      setAttendance((prev) => ({
        ...prev,
        [todayDate]: {
          ...prev[todayDate],
          checkOutTime: now,
        },
      }));
    }
  };

  const isCheckInDisabled = !!checkInTime;
  const isCheckOutDisabled = !!checkOutTime || !checkInTime;

  // Automatically set status to "Absent" at the end of the day if no check-in
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!attendance[todayDate]?.checkInTime) {
        setAttendance((prev) => ({
          ...prev,
          [todayDate]: {
            ...prev[todayDate],
            status: "Absent",
          },
        }));
      }
    }, 1000 * 60 * 60 * 24); // Adjust timing as needed (e.g., at midnight)
    return () => clearTimeout(timer);
  }, [attendance, todayDate]);

  // Function to save attendance to the backend
  const saveAttendanceToBackend = async () => {
    try {
      const response = await fetch("http://localhost:8009/attendance", {
        method: "POST", // 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, attendance }),
      });

      const result = await response.json();
      // console.log("Server Response:", result);

      if (!response.ok) {
        console.error("Failed to save attendance:", result.message);
      } else {
        // console.log("Attendance saved successfully:", result.attendance);
      }
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  // Save attendance whenever it changes
  useEffect(() => {
    if (Object.keys(attendance).length > 0) {
      saveAttendanceToBackend();
    }
  }, [attendance]);

  // Fetch attendance data from backend
  const fetchAttendance = async () => {
    const email = emp.email;
    try {
      const response = await fetch(`http://localhost:8009/attendances/${email}`);

      if (response.ok) {
        const data = await response.json();
        setAttendance(data.attendance || {});
      } else {
        console.error("Failed to fetch attendance.");
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  // Fetch attendance on component mount
  useEffect(() => {
    if (email) {
      fetchAttendance();
    }
  }, [email]);

  // Calculate totals
  const totalDays = Object.keys(attendance).length;
  const totalPresents = Object.values(attendance).filter((day) => day.status === "Present").length;
  const totalAbsents = Object.values(attendance).filter((day) => day.status === "Absent").length;

  return (
    <>
      <Header />
      <Sidebar />
      <div className="mainContainer">
        <div className="attendanceParentContainer">
          <div className="attendanceCards">
            <div className="attendanceCard">
              <div className="attendanceCardContent">
                <div className="number">{totalPresents}</div>
                <div className="cardName">Total Presents</div>
              </div>
            </div>
            <div className="attendanceCard">
              <div className="attendanceCardContent">
                <div className="number">{totalAbsents}</div>
                <div className="cardName">Total Absents</div>
              </div>
            </div>
            <div className="attendanceCard">
              <div className="attendanceCardContent">
                <div className="number">{totalDays}</div>
                <div className="cardName">Total Days</div>
              </div>
            </div>
          </div>

          <div className='btn_Container'>
            <button
              onClick={handleMarkAttendance}
              disabled={isAttendanceActive}
              style={{
                backgroundColor: isAttendanceActive ? "#ccc" : "#4CAF50",
                cursor: isAttendanceActive ? "not-allowed" : "pointer",
              }}
            >
              Mark Attendance
            </button>

            {isAttendanceActive && (
              <div className="checkInOut_btn">
                <button
                  onClick={handleCheckIn}
                  disabled={isCheckInDisabled}
                  style={{
                    backgroundColor: isCheckInDisabled ? "#ccc" : "#4CAF50",
                    cursor: isCheckInDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  Check In
                </button>
                <button
                  onClick={handleCheckOut}
                  disabled={isCheckOutDisabled}
                  style={{
                    backgroundColor: isCheckOutDisabled ? "#ccc" : "#FF5722",
                    cursor: isCheckOutDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  Check Out
                </button>
              </div>
            )}
          </div>

          <div className="attendanceParentContainer">
            {attendance[todayDate] && attendance[todayDate].status !== "Absent" && (
              <div className="attendenceHistoryContainer">
                <h2>Attendance History</h2>
                <div className="tableWrapper">
                  <table className="attendanceTable">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Check In </th>
                        <th>Check Out </th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecords.map(([date, details]) => (
                        <tr key={date}>
                          <td>{date}</td>
                          <td>{details.checkInTime ? new Date(details.checkInTime).toLocaleTimeString() : '-'}</td>
                          <td>{details.checkOutTime ? new Date(details.checkOutTime).toLocaleTimeString() : '-'}</td>
                          <td>{details.status || 'Absent'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="paginationControls">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <GrPrevious className="arrowIcon" />
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <GrNext className="arrowIcon" />
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </>

  )
}

export default Attendance