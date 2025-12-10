'use client';

import { useState } from 'react';

export default function LoginModal({ onClose, onLogin }) {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        // Validate inputs
        if (!name.trim() || !email.trim()) {
            setError('Please enter both name and email');
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }

        setError('');
        setIsLoading(true);

        // Simulate loading for UX
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock user data with customer's input
        const mockUser = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            timestamp: new Date().toISOString(),
            verified: true
        };

        // Store in localStorage
        localStorage.setItem('user_session', JSON.stringify(mockUser));

        // Log the login event
        try {
            await fetch('/api/record-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: mockUser.name,
                    email: mockUser.email,
                    timestamp: mockUser.timestamp,
                    type: 'LOGIN'
                })
            });
        } catch (error) {
            console.error('Failed to log login:', error);
        }

        setIsLoading(false);

        // Trigger the onLogin callback
        if (onLogin) onLogin(mockUser);

        // Close modal
        onClose();

        // Refresh to update navbar
        window.location.reload();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
        }}>
            <div style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '2rem',
                maxWidth: '400px',
                width: '90%',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                position: 'relative'
            }}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#666'
                    }}
                >
                    ×
                </button>

                {/* Google Logo */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <svg width="48" height="48" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                </div>

                {/* Title */}
                <h2 style={{
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    color: '#202124',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                }}>
                    Sign in
                </h2>

                <p style={{
                    textAlign: 'center',
                    color: '#5f6368',
                    fontSize: '0.9rem',
                    marginBottom: '1.5rem'
                }}>
                    to continue to Piston Rental-X Pro
                </p>

                {/* Input Fields */}
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #dadce0',
                            borderRadius: '4px',
                            fontSize: '0.95rem',
                            outline: 'none',
                            transition: 'border 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#1a73e8'}
                        onBlur={(e) => e.target.style.borderColor = '#dadce0'}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #dadce0',
                            borderRadius: '4px',
                            fontSize: '0.95rem',
                            outline: 'none',
                            transition: 'border 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#1a73e8'}
                        onBlur={(e) => e.target.style.borderColor = '#dadce0'}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <p style={{
                        color: '#d93025',
                        fontSize: '0.85rem',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </p>
                )}

                {/* Google Sign-In Button */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #dadce0',
                        borderRadius: '4px',
                        background: '#fff',
                        color: '#3c4043',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.2s',
                        opacity: isLoading ? 0.6 : 1
                    }}
                    onMouseOver={(e) => {
                        if (!isLoading) {
                            e.target.style.background = '#f8f9fa';
                            e.target.style.borderColor = '#c6c6c6';
                        }
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = '#fff';
                        e.target.style.borderColor = '#dadce0';
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    </svg>
                    {isLoading ? 'Signing in...' : 'Sign in with Google'}
                </button>

                {/* Demo Notice */}
                <p style={{
                    marginTop: '1.5rem',
                    fontSize: '0.75rem',
                    color: '#5f6368',
                    textAlign: 'center',
                    lineHeight: '1.5',
                    background: '#f1f3f4',
                    padding: '0.5rem',
                    borderRadius: '4px'
                }}>
                    🎭 Demo Mode: Click to simulate Google login
                </p>
            </div>
        </div>
    );
}
