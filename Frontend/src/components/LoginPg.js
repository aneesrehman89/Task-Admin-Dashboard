import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import '../assest/styling/LoginPg.css'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { UserDetail } from '../ContextProvider/Context';

const LoginPg = () => {

  const [showPass, setshowPass] = useState(false)
  const { setemp } = useContext(UserDetail);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  let onSubmit = async (data) => {
    const { email, password } = data;
    
    try {
      const LoginData = await fetch("${process.env.REACT_APP_API_URL}/login", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({email, password}),
      });

      const res = await LoginData.json();
      console.log("login res", res)

      if (LoginData.status === 201) {
        // localStorage.setItem("userdatatoken",res.result.token)
        toast.success("User Login Successfully...");
        reset();

        const userRes = await fetch(`${process.env.REACT_APP_API_URL}/users/${email}`);
        const empData = await userRes.json();
        setemp(empData);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
      else {
        toast.error("Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="loginPage">
        <div className="loginForm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Login Page</h2>
            <div className="inputfield">
              <label><strong>Email:</strong></label>
              <input
                placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="inputfield">
              <label><strong>Password:</strong></label>
              <div className="inputParentContainer">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter Password"
                  {...register("password", {
                    required: "Password is required"
                  })}
                />
                <button type='button' className="showpasswordBtn" onClick={() => setshowPass(!showPass)}>
                  {showPass ? <BiSolidShow /> : <BiSolidHide />}
                </button>
              </div>
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>
            <div className="login_btnContainer">
              <button type="submit">Log in</button>
            </div>

            <div className="checkbox">
              <label>Create a new account<Link to="/register"><span> Register Here</span></Link></label>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPg
