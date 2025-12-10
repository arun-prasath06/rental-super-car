'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, User } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function AdminLogin() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Hardcoded credentials as requested
        if (username === 'arun@2003' && password === 'Rc200@ktm') {
            localStorage.setItem('admin_token', 'true');
            router.push('/admin');
        } else {
            setError('Invalid Credentials. Access Denied.');
        }
    };

    return (
        <main>
            <Navbar />
            <div className="container" style={{
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '400px',
                    background: '#0a0a0a',
                    padding: '2rem',
                    borderRadius: '0',
                    border: '1px solid var(--primary)',
                    boxShadow: '0 0 50px rgba(220, 20, 60, 0.2)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <Shield size={50} color="#dc143c" style={{ marginBottom: '1rem' }} />
                        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>SECURE ACCESS</h1>
                        <p className="text-muted">ADMINISTRATORS ONLY</p>
                    </div>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <User size={18} color="#666" style={{ position: 'absolute', left: '1rem', top: '1rem' }} />
                            <input
                                type="text"
                                placeholder="Admin ID"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <Lock size={18} color="#666" style={{ position: 'absolute', left: '1rem', top: '1rem' }} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={inputStyle}
                            />
                        </div>

                        {error && <p style={{ color: '#ff0000', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}

                        <button className="btn btn-primary" style={{ width: '100%' }}>
                            LOGIN SYSTEM
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

const inputStyle = {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem',
    background: '#151515',
    border: '1px solid #333',
    color: '#fff',
    outline: 'none',
    fontSize: '1rem'
};
