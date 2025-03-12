import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const SignUpLayer = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phoneNumber: '', role: '', image: ''
  });
  const [loading, setLoading ] = useState(false);
  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData(prevState => ({ ...prevState, image: file })); // Update the state with the file
};
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleResendEmail = async () => {
    if (!formData.email) {
      toast.error("Please enter your email first!");
      return;
    }
    try {
      await axios.post('http://localhost:5001/api/users/resend-verification-email', { email: formData.email });
      toast.success('Verification email resent successfully!');
    } catch (error) {
      console.error('Error resending verification email:', error);
      toast.error(error.response?.data?.message || 'Failed to resend verification email.');
    }
  };
 
  const validatePhoneNumber = (phoneNumber) => {
    const digitsOnly = phoneNumber.replace(/\D/g, ""); 
    return digitsOnly.length >= 8 && digitsOnly.length <= 15; 
  };
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*\d{3,}).{8,}$/;
    return re.test(password);
  };

  const validateForm = () => {
    const { name, email, password, phoneNumber, role } = formData;
    const checkbox = document.getElementById('condition').checked;

    if (!name || !email || !password || !phoneNumber || !role) {
      toast.error('Please fill in all the required fields.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error('Please enter a valid phoneNumber.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    if (!validatePassword(password)) {
      toast.error('Password must be at least 8 characters long, contain 1 uppercase letter and at least 3 numbers.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    if (!checkbox) {
      toast.error('You must agree to the Terms & Conditions and Privacy Policy.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()){
      setLoading(false);
      return;} 

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:5001/api/users/sign-up', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      toast.success('Sign-up successful! Redirecting to sign in page', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {navigate('/sign-in'); },3000);
    } catch (error) {
      console.error('Error during sign-up:', error.response ? error.response.data : error.message);
    
      // Log the entire error to see what the response contains
      if (error.response) {
        console.log("Error response: ", error.response);
      }
    
      // Check if user already exists
      if (error.response && error.response.data && error.response.data.message && error.response.data.message.includes("User already exists")) {
        toast.error('User already exists. Please try a different email!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else if (error.response && error.response.data && error.response.data.message && error.response.data.message.includes("Field is missing")) {
        toast.error('Please fill in all the required fields.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Sign-up failed. Please try again!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    
  };

  return (
    <section className='auth bg-base d-flex flex-wrap'>
      <div className='auth-left d-lg-block d-none'>
        <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
          <img src='/assets/images/signup.jpg' alt='Illustration of signing up' />
        </div>
      </div>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
          <h1 className="mb-12" style={{ color: "blue" }}>Finova</h1>

            <h4 className='mb-12'>Sign Up to your Account</h4>
            <p className='mb-32 text-secondary-light text-lg'>
              Welcome back! please enter your detail
            </p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='f7:person' />
              </span>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='Username'
              />
            </div>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='Email'
              />
            </div>
            <div className='mb-20'>
              <div className='position-relative '>
                <div className='icon-field'>
                  <span className='icon top-50 translate-middle-y'>
                    <Icon icon='solar:lock-password-outline' />
                  </span>
                  <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    className='form-control h-56-px bg-neutral-50 radius-12'
                    id='your-password'
                    placeholder='Password'
                  />
                </div>
                <span
                  className='toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light'
                  data-toggle='#your-password'
                />
              </div>
              <span className='mt-12 text-sm text-secondary-light'>
              Password must be at least 8 characters long, contain 1 uppercase letter and at least 3 numbers.
              </span>
            </div>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mdi:phone" />
              </span>
              <PhoneInput
                country={"tn"}
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                inputClass="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Phone Number"
              />
            </div>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mdi:account' />
              </span>
              <select
                name='role'
                value={formData.role}
                onChange={handleChange}
                className='form-control h-56-px bg-neutral-50 radius-12'
              >
                <option value=''>Select Role</option>
                <option value='Business owner'>Business owner</option>
                <option value='Financial manager'>Financial manager</option>
                <option value='Accountant'>Accountant</option>
                <option value='Admin'>Admin</option>

              </select>
            </div>
            <div className='icon-field mb-16'>
    <Icon icon='mdi:image' className='icon top-50 translate-middle-y' />
    <input
        type='file'
        name='image'
        onChange={handleFileChange}
        className='form-control h-56-px bg-neutral-50 radius-12'
        required
    />
</div>
            <div className=''>
              <div className='d-flex justify-content-between gap-2'>
                <div className='form-check style-check d-flex align-items-start'>
                  <input
                    className='form-check-input border border-neutral-300 mt-4'
                    type='checkbox'
                    defaultValue=''
                    id='condition'
                  />
                  <label
                    className='form-check-label text-sm'
                    htmlFor='condition'
                  >
                    By creating an account means you agree to the
                    <Link to='/sign-up/terms-conditions' className='text-primary-600 fw-semibold'>
                      Terms &amp; Conditions
                    </Link>{" "}
                    and our
                    <Link to='/sign-up/terms-conditions' className='text-primary-600 fw-semibold'>
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
            >
              {" "}
              Sign Up
            </button>
            <div className='mt-32 center-border-horizontal text-center'>
            <button type='button' onClick={handleResendEmail} className='btn btn-secondary btn-sm radius-8 px-3 py-1'>
          Resend Verification Email
            </button>
              <span className='bg-base z-1 px-4'>Or sign up with</span>
            </div>
            <div className='mt-32 d-flex align-items-center gap-3'>
              <button
                type='button'
                className='fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50'
              >
                <Icon
                  icon='ic:baseline-facebook'
                  className='text-primary-600 text-xl line-height-1'
                />
                Facebook
              </button>
              <button
                type='button'
                className='fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50'
              >
                <Icon
                  icon='logos:google-icon'
                  className='text-primary-600 text-xl line-height-1'
                />
                Google
              </button>
            </div>
            <div className='mt-32 text-center text-sm'>
              <p className='mb-0'>
                Already have an account?{" "}
                <Link to='/sign-in' className='text-primary-600 fw-semibold'>
                  Sign In
                </Link>
              </p>
             
            </div>
          </form>
        </div>
      </div>
      
      {/* Toast container to display notifications */}
      <ToastContainer />
    </section>
  );
};

export default SignUpLayer;