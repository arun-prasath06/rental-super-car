'use client';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function LoginModal({ isOpen, onClose, onLogin }) {
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null;

    const handleGoogleLogin = async () => {
        setIsLoading(true);

        // 1. Simulate Google Login Delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // 2. Mock User Data
        const mockUser = {
            name: 'Arun Prasath',
            email: 'arun.prasath@gmail.com',
            timestamp: new Date().toISOString(),
            verified: true
        };

        // 3. Persist to Backend for Admin Dashboard
        try {
            await fetch('/api/record-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...mockUser, type: 'LOGIN' })
            });
        } catch (err) {
            console.error("Failed to log login event", err);
        }

        localStorage.setItem('user_session', JSON.stringify(mockUser));
        setIsLoading(false);
        onLogin(mockUser);
    };

    const modalContent = (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
            animation: 'fadeIn 0.2s ease-out'
        }}>
            <div style={{
                background: '#fff',
                padding: '2.5rem',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '420px',
                position: 'relative',
                textAlign: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'transparent',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f1f1f1'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                    <X size={20} />
                </button>

                <div style={{ marginBottom: '1.5rem' }}>
                    <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" style={{ height: '36px' }} />
                </div>

                <h2 style={{ color: '#202124', fontSize: '1.5rem', fontWeight: '400', marginBottom: '0.5rem' }}>Sign in</h2>
                <p style={{ color: '#5f6368', fontSize: '1rem', marginBottom: '2.5rem' }}>to continue to Rental Super Car</p>

                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        width: '100%',
                        padding: '10px 12px',
                        backgroundColor: '#fff',
                        color: '#3c4043',
                        border: '1px solid #dadce0',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: isLoading ? 'wait' : 'pointer',
                        transition: 'background 0.2s, box-shadow 0.2s',
                        fontFamily: 'Roboto, sans-serif'
                    }}
                    onMouseOver={(e) => {
                        if (!isLoading) {
                            e.currentTarget.style.background = '#f7fafe';
                            e.currentTarget.style.borderColor = '#d2e3fc';
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!isLoading) {
                            e.currentTarget.style.background = '#fff';
                            e.currentTarget.style.borderColor = '#dadce0';
                        }
                    }}
                >
                    {isLoading ? (
                        <div style={{ width: '20px', height: '20px', border: '2px solid #ddd', borderTopColor: '#4285f4', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    ) : (
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" style={{ width: '18px', height: '18px' }} />
                    )}
                    <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
                </button>

                <div style={{ marginTop: '2.5rem', textAlign: 'left', fontSize: '0.85rem', color: '#5f6368' }}>
                    Not your computer? Use Guest mode to sign in privately. <br />
                    <a href="#" style={{ color: '#1a73e8', textDecoration: 'none', fontWeight: '500' }}>Learn more</a>
                </div>
            </div>
            <style jsx global>{`
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );

    return createPortal(modalContent, document.body);
}
