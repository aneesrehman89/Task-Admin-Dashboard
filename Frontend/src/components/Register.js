import { React, useState } from 'react'
import '../assest/styling/Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";


const Register = () => {

  const [showPass, setshowPass] = useState(false)
  const [showConfirmPass, setshowConfirmPass] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  // Password match validation
  const password = watch("password");

  let onSubmit = async (data) => {

    setTimeout(() => {
            navigate("/personalDetail", { state: data  });
          }, 1000);
  

  };

  return (
    <>
      <div className="RegPage">
        <div className="RegForm">
          <h2>Registration Page</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputfield">
              <label><strong>Full Name:</strong></label>
              <input
                type="text"
                placeholder="Enter full name"
                {...register("fullName", { required: "Full name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name can only contain letters and spaces",
                  },
                })}
              />
              {errors.fullName && <p className="error">{errors.fullName.message}</p>}
            </div>
            <div className="inputfield">
              <label><strong>Email:</strong></label>
              <input
                type="email"
                placeholder="Enter your Email"
                autoComplete="off"
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
                  placeholder="Enter your Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button type='button' className="showpasswordBtn" onClick={() => setshowPass(!showPass)}>
                  {showPass ? <BiSolidShow /> : <BiSolidHide />}
                </button>
              </div>
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>
            <div className="inputfield">
              <label>
                <strong>Confirm Password:</strong>
              </label>
              <div className="inputParentContainer">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Confirm your Password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <button type='button' className="showpasswordBtn" onClick={() => setshowConfirmPass(!showConfirmPass)}>
                  {showConfirmPass ? <BiSolidShow /> : <BiSolidHide />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="inputfield">
              <div className="register_btnContainer">
                <button type="submit">Register</button>
              </div>
            </div>
            <div className="checkbox">
              <label>Already have an account?
                <span>
                  <Link to="/login"> Login Here</Link>
                </span>
              </label>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

export default Register




