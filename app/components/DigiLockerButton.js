'use client';
import { ShieldCheck } from 'lucide-react';

export default function DigiLockerButton({ onVerified }) {
    const handleLogin = () => {
        // In a real implementation, this redirects to your backend API
        // which then redirects to DigiLocker's OAuth page.
        // window.location.href = '/api/digilocker/auth';

        // Simulating the flow for demonstration since we don't have real Keys
        const width = 500;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const popup = window.open(
            '/digilocker-mock.html', // We will strictly simulate for now
            'DigiLocker Login',
            `width=${width},height=${height},top=${top},left=${left}`
        );

        // Listen for the simulation success
        window.addEventListener('message', (event) => {
            if (event.data === 'DIGILOCKER_VERIFIED') {
                onVerified();
            }
        });
    };

    return (
        <div style={{ margin: '1rem 0', padding: '1rem', background: 'rgba(37, 99, 235, 0.1)', border: '1px solid #2563eb', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <img src="/digilocker-logo.png" alt="DigiLocker" style={{ height: '30px' }} onError={(e) => e.target.style.display = 'none'} />
                <h4 style={{ color: '#fff', margin: 0 }}>Government KYC Verification</h4>
            </div>
            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Verify your Driving License and Aadhar securely via DigiLocker.
            </p>
            <button
                onClick={handleLogin}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    width: '100%',
                    justifyContent: 'center'
                }}
            >
                <ShieldCheck size={18} />
                Verify with DigiLocker
            </button>
        </div>
    );
}
