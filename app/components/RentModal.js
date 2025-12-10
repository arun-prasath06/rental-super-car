'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Clock, MapPin, ArrowRightLeft } from 'lucide-react';

export default function RentModal({ isOpen, onClose, onSubmit, product }) {
    const [mounted, setMounted] = useState(false);

    // Form States
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [pickupDate, setPickupDate] = useState('');

    // Pickup Time Parts
    const [pickupHour, setPickupHour] = useState('10');
    const [pickupMinute, setPickupMinute] = useState('00');
    const [pickupAmPm, setPickupAmPm] = useState('AM');

    const [dropDate, setDropDate] = useState('');

    // Drop Time Parts
    const [dropHour, setDropHour] = useState('10');
    const [dropMinute, setDropMinute] = useState('00');
    const [dropAmPm, setDropAmPm] = useState('AM');

    const [returnSameLocation, setReturnSameLocation] = useState(true);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null;

    const handleSubmit = () => {
        const pickupTime = `${pickupHour}:${pickupMinute} ${pickupAmPm}`;
        const dropTime = `${dropHour}:${dropMinute} ${dropAmPm}`;

        if (!pickupLocation || !pickupDate || !dropDate) {
            alert('Please fill in all rental details');
            return;
        }

        const bookingDetails = {
            pickupLocation,
            dropoffLocation: returnSameLocation ? pickupLocation : dropoffLocation,
            pickupDate,
            pickupTime,
            dropDate,
            dropTime,
            product
        };

        onSubmit(bookingDetails);
    };

    const inputStyle = {
        background: '#f5f5f5',
        border: 'none',
        padding: '0.8rem 1rem',
        borderRadius: '8px',
        color: '#333',
        width: '100%',
        fontSize: '0.9rem',
        outline: 'none'
    };

    const containerStyle = {
        background: 'rgba(20,20,20,0.5)',
        border: '1px solid #dc143c',
        borderRadius: '12px',
        padding: '1.5rem',
        flex: 1
    };

    const modalContent = (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
            animation: 'fadeIn 0.1s ease-out'
        }}>
            <div style={{
                background: '#000',
                padding: '2rem',
                borderRadius: '0px',
                width: '100%',
                maxWidth: '900px',
                border: 'none', // Borderless for cleaner full screen look
                position: 'relative',
                maxHeight: '100vh',
                overflowY: 'auto',
                animation: 'zoomIn 0.1s ease-out'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: 'none',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        zIndex: 10
                    }}
                >
                    <X size={24} />
                </button>

                <h2 style={{
                    color: '#dc143c',
                    fontSize: '2rem',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    fontFamily: 'Audiowide, sans-serif'
                }}>
                    The Essence of Luxury Drive
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    <div style={{
                        display: 'flex',
                        gap: '2rem',
                        flexDirection: 'row',
                        alignItems: 'stretch', // Ensure equal height
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        {/* Pickup Section */}
                        <div style={containerStyle}>
                            <h3 style={{ color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#dc143c' }}>•</span> Pick - Up Location
                            </h3>

                            <div style={{ marginBottom: '1rem', position: 'relative' }}>
                                <select
                                    style={inputStyle}
                                    value={pickupLocation}
                                    onChange={(e) => setPickupLocation(e.target.value)}
                                >
                                    <option value="" disabled>Choose Location</option>
                                    <option value="Trichirapalli">Trichirapalli</option>
                                    <option value="Coimbatore">Coimbatore</option>
                                    <option value="Nagerkovil">Nagerkovil</option>
                                    <option value="Madurai">Madurai</option>
                                    <option value="Tirunelveli">Tirunelveli</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Tirupur">Tirupur</option>
                                    <option value="Namakkal">Namakkal</option>
                                    <option value="Salem">Salem</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Chengalpattu">Chengalpattu</option>
                                </select>
                                <MapPin size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666', pointerEvents: 'none' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="date"
                                        style={inputStyle}
                                        value={pickupDate}
                                        onChange={(e) => setPickupDate(e.target.value)}
                                        aria-label="Pickup Date"
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <select
                                        style={{ ...inputStyle, padding: '0.8rem 0.5rem', width: 'auto', flex: 1 }}
                                        value={pickupHour}
                                        onChange={(e) => setPickupHour(e.target.value)}
                                        aria-label="Pickup Hour"
                                    >
                                        {[...Array(12)].map((_, i) => {
                                            const h = (i + 1).toString().padStart(2, '0');
                                            return <option key={h} value={h}>{h}</option>
                                        })}
                                    </select>
                                    <select
                                        style={{ ...inputStyle, padding: '0.8rem 0.5rem', width: 'auto', flex: 1 }}
                                        value={pickupMinute}
                                        onChange={(e) => setPickupMinute(e.target.value)}
                                        aria-label="Pickup Minute"
                                    >
                                        <option value="00">00</option>
                                        <option value="15">15</option>
                                        <option value="30">30</option>
                                        <option value="45">45</option>
                                    </select>
                                    <select
                                        style={{ ...inputStyle, padding: '0.8rem 0.5rem', width: 'auto', flex: 1 }}
                                        value={pickupAmPm}
                                        onChange={(e) => setPickupAmPm(e.target.value)}
                                        aria-label="Pickup AM/PM"
                                    >
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Divider / Icon */}
                        <div style={{
                            background: 'linear-gradient(45deg, #FFD700, #DAA520)',
                            padding: '0.5rem',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 15px rgba(218, 165, 32, 0.5)'
                        }}>
                            <ArrowRightLeft size={24} color="#000" />
                        </div>

                        {/* Dropoff Section */}
                        <div style={containerStyle}>
                            <h3 style={{ color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#dc143c' }}>•</span> Drop - Off Location
                            </h3>

                            {!returnSameLocation && (
                                <div style={{ marginBottom: '1rem', position: 'relative' }}>
                                    <select
                                        style={inputStyle}
                                        value={dropoffLocation}
                                        onChange={(e) => setDropoffLocation(e.target.value)}
                                    >
                                        <option value="" disabled>Choose Drop Location</option>
                                        <option value="Trichirapalli">Trichirapalli</option>
                                        <option value="Coimbatore">Coimbatore</option>
                                        <option value="Nagerkovil">Nagerkovil</option>
                                        <option value="Madurai">Madurai</option>
                                        <option value="Tirunelveli">Tirunelveli</option>
                                        <option value="Bangalore">Bangalore</option>
                                        <option value="Tirupur">Tirupur</option>
                                        <option value="Namakkal">Namakkal</option>
                                        <option value="Salem">Salem</option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="Chengalpattu">Chengalpattu</option>
                                    </select>
                                    <MapPin size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666', pointerEvents: 'none' }} />
                                </div>
                            )}

                            {returnSameLocation && (
                                <div style={{ marginBottom: '1rem', padding: '0.8rem', background: '#222', borderRadius: '8px', color: '#888', fontStyle: 'italic' }}>
                                    Same as Pick-Up Location
                                </div>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="date"
                                        style={inputStyle}
                                        value={dropDate}
                                        onChange={(e) => setDropDate(e.target.value)}
                                        aria-label="Drop Date"
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <select
                                        style={{ ...inputStyle, padding: '0.8rem 0.5rem', width: 'auto', flex: 1 }}
                                        value={dropHour}
                                        onChange={(e) => setDropHour(e.target.value)}
                                        aria-label="Drop Hour"
                                    >
                                        {[...Array(12)].map((_, i) => {
                                            const h = (i + 1).toString().padStart(2, '0');
                                            return <option key={h} value={h}>{h}</option>
                                        })}
                                    </select>
                                    <select
                                        style={{ ...inputStyle, padding: '0.8rem 0.5rem', width: 'auto', flex: 1 }}
                                        value={dropMinute}
                                        onChange={(e) => setDropMinute(e.target.value)}
                                        aria-label="Drop Minute"
                                    >
                                        <option value="00">00</option>
                                        <option value="15">15</option>
                                        <option value="30">30</option>
                                        <option value="45">45</option>
                                    </select>
                                    <select
                                        style={{ ...inputStyle, padding: '0.8rem 0.5rem', width: 'auto', flex: 1 }}
                                        value={dropAmPm}
                                        onChange={(e) => setDropAmPm(e.target.value)}
                                        aria-label="Drop AM/PM"
                                    >
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div
                            onClick={() => setReturnSameLocation(!returnSameLocation)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: '#fff',
                                cursor: 'pointer',
                                userSelect: 'none'
                            }}
                        >
                            <div style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                border: '2px solid #FFD700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {returnSameLocation && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFD700' }} />}
                            </div>
                            <span>Return to the same location</span>
                        </div>

                        <button
                            onClick={handleSubmit}
                            style={{
                                background: '#FFD700', // Gold color from image
                                color: '#000',
                                border: 'none',
                                padding: '1rem 3rem',
                                borderRadius: '8px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.6)'; }}
                            onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.4)'; }}
                        >
                            Let's Drive
                        </button>
                    </div>

                </div>
            </div>
            <style jsx global>{`
                @keyframes zoomIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );

    return createPortal(modalContent, document.body);
}
