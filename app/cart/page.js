'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { Trash2, Smartphone, CreditCard, ShieldCheck } from 'lucide-react';
import DigiLockerButton from '../components/DigiLockerButton';

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [mounted, setMounted] = useState(false);

    // Customer Details State
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        licenseNo: '',
        aadharNo: '' // Indian Gov ID
    });

    const [isIdVerified, setIsIdVerified] = useState(false); // DigiLocker Verification State

    // Payment State
    const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' or 'card'
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvv: '',
        name: ''
    });

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('rental_cart');
            if (stored) {
                setCart(JSON.parse(stored));
            }
        }
    }, []);

    const handleDigiLockerSuccess = () => {
        setIsIdVerified(true);
        // Simulate fetching data from the API
        setCustomerDetails(prev => ({
            ...prev,
            name: 'Arun Prasath', // Example verified name
            licenseNo: 'TN0120240001234',
            aadharNo: '123456789012'
        }));
        alert('DigiLocker Verification Successful! Verified details fetched.');
    };

    // Function to parse date & time string (e.g., "10:00 AM") into a Date object
    const parseDateTime = (dateStr, timeStr) => {
        if (!dateStr || !timeStr) return null;

        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');

        if (hours === '12') hours = '00';
        if (modifier === 'PM') hours = parseInt(hours, 10) + 12;

        return new Date(`${dateStr}T${hours}:${minutes}:00`);
    };

    // Calculate duration in hours
    const calculateDurationHours = (item) => {
        if (!item.rentalDetails) return 0; // For pure purchase items

        const start = parseDateTime(item.rentalDetails.pickupDate, item.rentalDetails.pickupTime);
        const end = parseDateTime(item.rentalDetails.dropDate, item.rentalDetails.dropTime);

        if (!start || !end) return 0;

        const diffMs = end - start;
        const diffHrs = diffMs / (1000 * 60 * 60);

        return diffHrs > 0 ? diffHrs : 0;
    };

    // Calculate item total price
    const calculateItemTotal = (item) => {
        if (item.type === 'car' || item.type === 'bike') {
            const hours = calculateDurationHours(item);
            return Math.ceil(hours) * item.price;
        } else {
            // Spares/Kits are fixed price
            return item.price * (item.quantity || 1);
        }
    };

    const cartTotal = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);

    const removeItem = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        localStorage.setItem('rental_cart', JSON.stringify(newCart));
    };

    const handleCheckout = () => {
        if (!customerDetails.name || !customerDetails.phone || !customerDetails.address || !customerDetails.licenseNo) {
            alert('Please fill in all government mandated customer details.');
            return;
        }

        // Simulate Processing
        alert(`Transaction Successful!\n\nTransaction ID: TXN${Date.now()}\nAmount Paid: ₹${cartTotal.toLocaleString('en-IN')}\n\nThank you for choosing Rental Super Car!`);

        // Save Order logic here would go to backend
        // Clear cart
        localStorage.removeItem('rental_cart');
        setCart([]);
    };

    if (!mounted) return null;

    return (
        <main style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <h1 className="text-gold" style={{ marginBottom: '2rem', textAlign: 'center' }}>Secure Checkout</h1>

                {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <h2>Your cart is empty</h2>
                        <Link href="/" className="btn btn-outline" style={{ marginTop: '1rem' }}>Browse Vehicles</Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                        {/* Left Column: Cart Items */}
                        <div>
                            <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Your Selection</h2>
                            {cart.map((item, index) => {
                                const hours = calculateDurationHours(item);
                                const itemTotal = calculateItemTotal(item);
                                const isVehicle = item.type === 'car' || item.type === 'bike';

                                return (
                                    <div key={index} style={{
                                        background: '#111',
                                        marginBottom: '1rem',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        border: '1px solid #333',
                                        position: 'relative'
                                    }}>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: '120px', background: `url(${item.image}) center/cover` }}></div>
                                            <div style={{ padding: '1rem', flex: 1 }}>
                                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{item.name}</h3>
                                                <p style={{ color: '#888', fontSize: '0.9rem' }}>{item.category}</p>

                                                {isVehicle && (
                                                    <div style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#aaa', lineHeight: '1.4' }}>
                                                        <p>Pickup: {item.rentalDetails.pickupDate} {item.rentalDetails.pickupTime}</p>
                                                        <p>Drop: {item.rentalDetails.dropDate} {item.rentalDetails.dropTime}</p>
                                                        <p style={{ color: '#dc143c', fontWeight: 'bold' }}>Duration: {hours.toFixed(1)} Hours ({(hours / 24).toFixed(1)} Days)</p>
                                                    </div>
                                                )}

                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                                                    <span className="text-gold" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                                        ₹{itemTotal.toLocaleString('en-IN')}
                                                    </span>
                                                    <button onClick={() => removeItem(index)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}>
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#111', borderRadius: '12px', border: '1px solid #dc143c' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                    <span>Total Amount:</span>
                                    <span className="text-gold">₹{cartTotal.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Customer & Payment */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                            {/* Customer Details Form */}
                            <div style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', border: '1px solid #333' }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                                    <ShieldCheck color="#dc143c" /> Customer Details (Govt. Mandated)
                                </h3>

                                {!isIdVerified ? (
                                    <DigiLockerButton onVerified={handleDigiLockerSuccess} />
                                ) : (
                                    <div style={{ padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid #4ade80', borderRadius: '8px', marginBottom: '1rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <ShieldCheck size={20} /> Verified via DigiLocker
                                    </div>
                                )}

                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    <input type="text" placeholder="Full Name (as per ID)" style={inputStyle} value={customerDetails.name} onChange={e => setCustomerDetails({ ...customerDetails, name: e.target.value })} disabled={isIdVerified} />
                                    <input type="tel" placeholder="Phone Number" style={inputStyle} value={customerDetails.phone} onChange={e => setCustomerDetails({ ...customerDetails, phone: e.target.value })} />
                                    <input type="email" placeholder="Email Address" style={inputStyle} value={customerDetails.email} onChange={e => setCustomerDetails({ ...customerDetails, email: e.target.value })} />
                                    <textarea placeholder="Permanent Address" style={{ ...inputStyle, height: '80px', resize: 'none' }} value={customerDetails.address} onChange={e => setCustomerDetails({ ...customerDetails, address: e.target.value })} />

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="License No"
                                                style={inputStyle}
                                                value={customerDetails.licenseNo}
                                                onChange={e => setCustomerDetails({ ...customerDetails, licenseNo: e.target.value.toUpperCase() })}
                                                maxLength="16"
                                                disabled={isIdVerified}
                                            />
                                            {!isIdVerified && <div style={{ marginTop: '0.5rem' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', color: '#aaa', padding: '0.5rem', border: '1px dashed #555', borderRadius: '4px', justifyContent: 'center' }}>
                                                    <span>📷</span> Upload License
                                                    <input type="file" accept="image/*" style={{ display: 'none' }} />
                                                </label>
                                            </div>}
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Aadhar No"
                                                style={inputStyle}
                                                value={customerDetails.aadharNo}
                                                onChange={e => {
                                                    const val = e.target.value.replace(/\D/g, '');
                                                    if (val.length <= 12) setCustomerDetails({ ...customerDetails, aadharNo: val });
                                                }}
                                                disabled={isIdVerified}
                                            />
                                            {!isIdVerified && <div style={{ marginTop: '0.5rem' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', color: '#aaa', padding: '0.5rem', border: '1px dashed #555', borderRadius: '4px', justifyContent: 'center' }}>
                                                    <span>📷</span> Upload Aadhar
                                                    <input type="file" accept="image/*" style={{ display: 'none' }} />
                                                </label>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', border: '1px solid #333' }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                                    <CreditCard color="#dc143c" /> Payment Method
                                </h3>

                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <button
                                        onClick={() => setPaymentMethod('upi')}
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            border: paymentMethod === 'upi' ? '2px solid #dc143c' : '1px solid #333',
                                            background: paymentMethod === 'upi' ? 'rgba(220,20,60,0.1)' : '#1a1a1a',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                        }}
                                    >
                                        <Smartphone size={20} /> UPI / Apps
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('card')}
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            border: paymentMethod === 'card' ? '2px solid #dc143c' : '1px solid #333',
                                            background: paymentMethod === 'card' ? 'rgba(220,20,60,0.1)' : '#1a1a1a',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                        }}
                                    >
                                        <CreditCard size={20} /> Card
                                    </button>
                                </div>

                                {paymentMethod === 'upi' && (
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ marginBottom: '1rem', color: '#aaa' }}>Certified Government UPI Transactions</p>
                                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                            <div style={upiBadgeStyle}>GPay</div>
                                            <div style={upiBadgeStyle}>PhonePe</div>
                                            <div style={upiBadgeStyle}>Paytm</div>
                                            <div style={upiBadgeStyle}>BHIM</div>
                                        </div>
                                        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fff', borderRadius: '8px', display: 'inline-block' }}>
                                            {/* Mock QR Code */}
                                            <div style={{ width: '150px', height: '150px', background: '#000' }}></div>
                                            <p style={{ color: '#000', marginTop: '0.5rem', fontWeight: 'bold' }}>Scan to Pay</p>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'card' && (
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        <input type="text" placeholder="Card Number" style={inputStyle} value={cardDetails.number} onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })} maxLength="19" />
                                        <input type="text" placeholder="Card Holder Name" style={inputStyle} value={cardDetails.name} onChange={e => setCardDetails({ ...cardDetails, name: e.target.value })} />
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <input type="text" placeholder="MM/YY" style={inputStyle} value={cardDetails.expiry} onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })} maxLength="5" />
                                            <input type="password" placeholder="CVV" style={inputStyle} value={cardDetails.cvv} onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })} maxLength="3" />
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                            <div style={cardBadgeStyle}>VISA</div>
                                            <div style={cardBadgeStyle}>MasterCard</div>
                                            <div style={cardBadgeStyle}>RuPay</div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={handleCheckout}
                                    style={{
                                        width: '100%',
                                        marginTop: '2rem',
                                        padding: '1rem',
                                        background: '#dc143c',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        boxShadow: '0 0 20px rgba(220,20,60,0.4)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    Proceed to Pay ₹{cartTotal.toLocaleString('en-IN')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '4px',
    color: '#fff',
    outline: 'none',
    fontSize: '0.9rem'
};

const upiBadgeStyle = {
    padding: '0.5rem 1rem',
    background: '#fff',
    color: '#000',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '0.8rem'
};

const cardBadgeStyle = {
    padding: '0.3rem 0.6rem',
    background: '#333',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '0.7rem',
    border: '1px solid #555'
};
