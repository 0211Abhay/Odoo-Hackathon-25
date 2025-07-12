import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


import './RegisterPage.css';

const RegisterPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    console.log(formData)
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
          formData
        );
  
        console.log('✅ Registration successful:', response.data);
  
        // ✅ Navigate to login page
        navigate('/login');
  
      } catch (error) {
        console.error('❌ Registration failed:', error.response?.data || error.message);
  
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        }
      }
    } else {
      setErrors(newErrors);
    }
  };
  

  return (
    <div className="register-page">
      <Header />
      <div className="register-container fade-in">
        <div className="register-form">
          <div className="register-header">
            <h1>Create Account</h1>
            <p>Join the Skill Swap community</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Input
                type="text"
                name="username"
                placeholder="Full Name"
                value={formData.username}
                onChange={handleInputChange}
                error={!!errors.username}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            <div className="form-group">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <Button type="submit" fullWidth>
              Create Account
            </Button>
          </form>

          <div className="register-footer">
            <p>Already have an account? <Link to="/login" className="login-link">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
