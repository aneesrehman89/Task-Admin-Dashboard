import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../assest/styling/PersonalDetail.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { UserDetail } from '../ContextProvider/Context';

const PersonalDetail = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const { setemp } = useContext(UserDetail);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: state?.fullName,
      email: state?.email
    },
  });

  const onSubmit = async (data) => {
    const finalData = { ...data, ...state};

    try {
      const response = await fetch('http://localhost:8009/personalDetail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalData),
      });

      const res = await response.json();
      console.log("personal res",res)
    
      if (response.status === 200) {
        localStorage.setItem("userdatatoken",res.token);
        toast.success("User Register Successfully...");
        reset();

        const userRes = await fetch(`http://localhost:8009/users/${finalData.email}`);
        const empData = await userRes.json();
        console.log(userRes);

        setemp(empData);

        setTimeout(() => {
          toast.success("User Register Successfully...");
          navigate("/dashboard");
        }, 1000);
      }
      else if (response.status === 422) {
        toast.error(res.error); // Show the error message from the backend
      }
      else {
        toast.error("Something went wrong");
      }
    }
    catch (error) {
      toast.error("Network Error!");
    }

  };

  return (
    <>
      <ToastContainer />
      <div className="PersonalDetailparentContainer">
        <div className="PersonalDetailChildContainer">
          <h1>Personal Detail</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="formParentContainer">
              <div className="formContainer">
                <div className="inputfield">
                  <label><strong>Full Name:</strong></label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    {...register('fullName', {
                      required: 'Full name is required.',
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Name can only contain letters and spaces",
                      },
                    })}
                  />
                  {errors.fname && <p className="error">{errors.fname.message}</p>}
                </div>
                <div className="inputfield">
                  <label><strong>Email:</strong></label>
                  <input
                    type="email"
                   
                    placeholder="Enter your Email"
                    {...register('email', {
                      required: 'Email is required.',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Enter a valid email address.',
                      },
                    })}
                  />
                  {errors.email && <p className="error">{errors.email.message}</p>}
                </div>
                <div className="inputfield">
                  <label><strong>Phone Number:</strong></label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    {...register('phone', {
                      required: 'Phone number is required.',
                      pattern: {
                        value: /^[0-9]{11}$/,
                        message: 'Enter a valid 11-digit phone number.',
                      },
                    })}
                  />
                  {errors.phone && <p className="error">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="formContainer">
                <div className="inputfield">
                  <label><strong>Address:</strong></label>
                  <input
                    type="text"
                    placeholder="Enter your Address"
                    {...register('address', { required: 'Address is required.' })}
                  />
                  {errors.address && <p className="error">{errors.address.message}</p>}
                </div>
                <div className="inputfield">
                  <label><strong>Joining date:</strong></label>
                  <input
                    type="date"
                    {...register('jdate', { required: 'Joining date is required.' })}
                  />
                  {errors.jdate && <p className="error">{errors.jdate.message}</p>}
                </div>
                
                <div className="inputfield">
                  <label><strong>Gender:</strong></label>
                  <div className="gender">
                    <div className="maleDiv">
                    <input
                      type="radio"
                      value="male"
                      {...register('gender', { required: 'Please select a gender.' })}
                    />
                    <label className='genderLabel'>Male</label>
                    </div>
                    <br />
                    <div className="femaleDiv">
                    <input
                      type="radio"
                      value="female"
                      {...register('gender', { required: 'Please select a gender.' })}
                    />
                    <label className='genderLabel'>Female</label>
                    </div>
                  </div>
                  {errors.gender && <p className="error">{errors.gender.message}</p>}
                </div>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PersonalDetail;
