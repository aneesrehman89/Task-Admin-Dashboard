import React, { useContext, useEffect, useState } from "react";
import "../assest/styling/Setting.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import { UserDetail } from "../ContextProvider/Context";
import { useForm } from "react-hook-form";

const Setting = () => {
  const { emp, updateUserDetail } = useContext(UserDetail); // Access context
  const [editData, setEditData] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  useEffect(() => {
    if (emp) {
      reset(emp); // Reset form values with `emp` data
    }
  }, [emp, reset]);

  const handleEdit = () => {
    setEditData(true);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8009/personalDetail',{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      });

      const result = await response.json();

    if (response.ok) {
      updateUserDetail(result.updatedUser); 
      setEditData(true); 
    } else {
      toast.error(result.error || "Failed to update details");
    }

    } catch (error) {
      console.error("Error updating personal details:", error);
    toast.error("An error occurred while updating details.");
    }
    
  };
  const saveBtn = () =>{
    if (isValid) {
      toast.success("Your profile settings have been saved.");
    }
  }

  return (
    <>
    <ToastContainer />
      <Header />
      <Sidebar />
      <div className="settingParentContainer">
        <div className="settingChildContainer">
          <h1>Profile</h1>
          <form onSubmit={handleSubmit(onSubmit, saveBtn)}>
            <div className="settingformParentContainer">
              <div className="settingformContainer">
                <div className="inputfield">
                  <label>
                    <strong>Full Name:</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    {...register("fullName", {
                      required: "Full name is required.",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Name can only contain letters and spaces",
                      },
                    })}
                    disabled={!editData}
                  />
                  {errors.fullName && (
                    <p className="error">{errors.fullName.message}</p>
                  )}
                </div>
                <div className="inputfield">
                  <label>
                    <strong>Email:</strong>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email address.",
                      },
                    })}
                    disabled={!editData}
                  />
                  {errors.email && (
                    <p className="error">{errors.email.message}</p>
                  )}
                </div>
                <div className="inputfield">
                  <label>
                    <strong>Phone Number:</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    {...register("phone", {
                      required: "Phone number is required.",
                      pattern: {
                        value: /^[0-9]{11}$/,
                        message: "Enter a valid 11-digit phone number.",
                      },
                    })}
                    disabled={!editData}
                  />
                  {errors.phone && (
                    <p className="error">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              <div className="settingformContainer">
                <div className="inputfield">
                  <label>
                    <strong>Address:</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    {...register("address", {
                      required: "Address is required.",
                    })}
                    disabled={!editData}
                  />
                  {errors.address && (
                    <p className="error">{errors.address.message}</p>
                  )}
                </div>
                <div className="inputfield">
                  <label>
                    <strong>Joining Date:</strong>
                  </label>
                  <input
                    type="date"
                    {...register("jdate", {
                      required: "Joining date is required.",
                    })}
                    disabled={!editData}
                  />
                  {errors.jdate && (
                    <p className="error">{errors.jdate.message}</p>
                  )}
                </div>
               
                
                <div className="inputfield">
                  <label>
                    <strong>Gender:</strong>
                  </label>
                  <div className="gender">
                    <input
                      type="radio"
                      value="male"
                      {...register("gender", {
                        required: "Please select a gender.",
                      })}
                      disabled={!editData}
                    />
                    <label>Male</label>
                    <br />
                    <input
                      type="radio"
                      value="female"
                      {...register("gender", {
                        required: "Please select a gender.",
                      })}
                      disabled={!editData}
                    />
                    <label>Female</label>
                  </div>
                  {errors.gender && (
                    <p className="error">{errors.gender.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="buttonContainer">
              {!editData ? (
                <button type="button" onClick={handleEdit}>
                  Edit Profile
                </button>
              ) : (
                <button type="submit" onClick={saveBtn}>Save Information</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Setting;
