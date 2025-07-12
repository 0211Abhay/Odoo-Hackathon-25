import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import './ForgotPasswordModal.css';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError('Email is required');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Clear any previous errors
        setError('');

        // Simulate API call
        console.log('Reset password requested for:', email);

        // Show success state
        setIsSubmitted(true);

        // Close modal after 3 seconds
        setTimeout(() => {
            onClose();
            setIsSubmitted(false);
            setEmail('');
        }, 3000);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (error) setError('');
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Reset Password</h2>
                    <button className="close-button" onClick={onClose}>
                        ×
                    </button>
                </div>

                {!isSubmitted ? (
                    <>
                        <div className="modal-body">
                            <p className="modal-description">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={handleEmailChange}
                                        error={!!error}
                                    />
                                    {error && <span className="error-message">{error}</span>}
                                </div>

                                <Button type="submit" fullWidth>
                                    Send Reset Link
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="modal-body success-state">
                        <div className="success-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22,4 12,14.01 9,11.01"></polyline>
                            </svg>
                        </div>
                        <h3>Check Your Email</h3>
                        <p>
                            We've sent a password reset link to <strong>{email}</strong>
                        </p>
                        <p className="success-note">
                            Please check your email and follow the instructions to reset your password.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordModal; 