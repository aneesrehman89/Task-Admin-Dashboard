import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../assest/styling/Feedback.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { CiLocationArrow1 } from 'react-icons/ci';
import feedback from '../assest/images/feedback.jpg';
import { ToastContainer, toast } from 'react-toastify';
import { UserDetail } from '../ContextProvider/Context';

const Feedback = () => {

  const {emp} = useContext(UserDetail);
  const [focusedField] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
     email: emp.email,
     phone: emp.phone
    },
  });

  const onSubmit = async (data) => {
    toast.info('Thank you for your feedback!');
    reset();
    const {email, phone, title, feedback} = data;
    try {
       await fetch (`${process.env.REACT_APP_API_URL}/feedback`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, phone, title, feedback}),
      });
    } catch (error) {
      console.error("Error during feedback form:", error);
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <ToastContainer />
      <div className="mainContainer">
        <div className="parentFeedbackContainer">
          <div className="feedbackContainer">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="left">
                <h2>Let us know what you think</h2>
                <div className="inputfield">
                  <label>
                    <strong>Email address:</strong>
                  </label>
                  <input 
                    type="email"
                    readOnly
                    {...register('email', { 
                      required: 'Email is required', 
                      pattern: { 
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                        message: 'Invalid email format' 
                      } 
                    })}
                    placeholder="Your Email address"
                    autoComplete="off"
                  />
                  {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

                <div className="inputfield">
                  <label>
                    <strong>Phone Number:</strong>
                  </label>
                  <input
                    type="text"
                    readOnly
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Invalid phone number (10 digits only)',
                      }
                    })}
                    placeholder="Your phone number"
                  />
                  {errors.phone && <p className="error">{errors.phone.message}</p>}
                </div>

                <div className={`inputfield ${focusedField === 'title' ? 'active' : ''}`}>
                  <label>
                    <strong>Title:</strong>
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    placeholder="Your feedback title"
                  />
                  {errors.title && <p className="error">{errors.title.message}</p>}
                </div>

                <div className="inputfield">
                  <label>
                    <strong>Feedback:</strong>
                  </label>
                  <textarea
                    {...register('feedback', { required: 'Feedback is required' })}
                    placeholder="Your feedback"
                    cols={50}
                    rows={5}
                  />
                  {errors.feedback && <p className="error">{errors.feedback.message}</p>}
                </div>

                <button type="submit">
                  <CiLocationArrow1 /> Submit feedback
                </button>
              </div>
            </form>
            <div className="right">
              <img src={feedback} alt="imgembedded" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
