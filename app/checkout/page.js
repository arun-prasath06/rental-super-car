'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        idImage: null,
        paymentId: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Clear cart
        localStorage.removeItem('rental_cart');

        alert('Booking Submitted Successfully! Check your email for confirmation.');
        router.push('/');
    };

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '2rem 0', maxWidth: '600px' }}>
                <h1 className="text-gold">Secure Checkout</h1>

                <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div className="card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Personal Details</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <input required type="text" placeholder="Full Name" style={inputStyle}
                                onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            <input required type="email" placeholder="Email Address" style={inputStyle}
                                onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            <input required type="tel" placeholder="Phone Number" style={inputStyle}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                    </div>

                    <div className="card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Identity Verification</h3>
                        <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            Please upload a clear scan of your Government ID (Driving License/Passport).
                        </p>
                        <div style={{
                            border: '2px dashed #444',
                            padding: '2rem',
                            textAlign: 'center',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            background: '#111'
                        }}>
                            <input required type="file" accept="image/*" style={{ color: '#fff' }} />
                        </div>
                    </div>

                    <div className="card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Payment</h3>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: '200px',
                                height: '200px',
                                background: '#fff',
                                margin: '0 auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000',
                                fontWeight: 'bold',
                                border: '4px solid var(--primary)'
                            }}>
                                [QR CODE PLACEHOLDER]
                            </div>
                            <p style={{ marginTop: '0.5rem', color: 'rgb(var(--primary))' }}>Scan to Pay with UPI</p>
                        </div>

                        <input required type="text" placeholder="Enter Transaction ID / UTR" style={inputStyle}
                            onChange={e => setFormData({ ...formData, paymentId: e.target.value })} />
                    </div>

                    <button disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                        {loading ? 'Processing...' : 'Confirm Booking'}
                    </button>

                </form>
            </div>
        </main>
    );
}

const inputStyle = {
    background: '#222',
    border: '1px solid #444',
    padding: '1rem',
    borderRadius: '4px',
    color: '#fff',
    width: '100%',
    fontFamily: 'inherit'
};
