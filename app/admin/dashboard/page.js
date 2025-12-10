'use client';
import { useState, useEffect } from 'react';
import { Download, Car, Bike, Wrench, Settings, Users, TrendingUp } from 'lucide-react';
import { getInventoryStats, getRentalStats, getSalesStats, getVisitorStats, formatAirportTimestamp } from '../../../utils/statsUtils';
import { generateInventoryPDF, generateRentalsPDF, generateSalesPDF, generateAnalyticsPDF, generateSparesStockPDF } from '../../../utils/exportUtils';

export default function AdminDashboard() {
    const [inventoryStats, setInventoryStats] = useState(null);
    const [rentalStats, setRentalStats] = useState(null);
    const [salesStats, setSalesStats] = useState(null);
    const [visitorStats, setVisitorStats] = useState(null);
    const [userLogins, setUserLogins] = useState([]);
    const [loginStats, setLoginStats] = useState({ hour: 0, day: 0, week: 0, month: 0, year: 0 }); // Login Stats
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchAllStats();

        // Update time every second
        const interval = setInterval(() => {
            setCurrentTime(formatAirportTimestamp());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const fetchAllStats = async () => {
        try {
            setLoading(true);

            // Import data directly instead of fetching
            const products = (await import('../../../data/products.json')).default;
            const orders = (await import('../../../data/orders.json')).default;
            const analytics = (await import('../../../data/analytics.json')).default;

            // Fetch Login Data
            try {
                const loginRes = await fetch('/api/record-login');
                const logins = await loginRes.json();
                if (Array.isArray(logins)) {
                    setUserLogins(logins);
                    calculateLoginStats(logins);
                }
            } catch (e) { console.error("Login fetch error", e); }

            // Calculate stats
            setInventoryStats(getInventoryStats(products));
            setRentalStats(getRentalStats(orders));
            setSalesStats(getSalesStats(orders));
            setVisitorStats(getVisitorStats(analytics.visits || []));

            setLoading(false);
        } catch (error) {
            console.error('Error fetching stats:', error);
            setLoading(false);
        }
    };

    const calculateLoginStats = (logins) => {
        const now = new Date();
        const oneHour = 60 * 60 * 1000;
        const oneDay = 24 * oneHour;
        const oneWeek = 7 * oneDay;
        const oneMonth = 30 * oneDay;
        const oneYear = 365 * oneDay;

        const stats = { hour: 0, day: 0, week: 0, month: 0, year: 0 };

        logins.forEach(login => {
            const loginTime = new Date(login.timestamp);
            const diff = now - loginTime;

            if (diff < oneHour) stats.hour++;
            if (diff < oneDay) stats.day++;
            if (diff < oneWeek) stats.week++;
            if (diff < oneMonth) stats.month++;
            if (diff < oneYear) stats.year++;
        });

        setLoginStats(stats);
    };

    const exportLoginsPDF = async () => {
        const { default: jsPDF } = await import('jspdf');
        const { default: autoTable } = await import('jspdf-autotable');

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.setTextColor(220, 20, 60); // Crimson
        doc.text('User Login Activity Report', 14, 20);

        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

        // Stats Summary
        autoTable(doc, {
            startY: 40,
            head: [['Time Period', 'Total Logins']],
            body: [
                ['Last Hour', loginStats.hour],
                ['Last 24 Hours', loginStats.day],
                ['Last 7 Days', loginStats.week],
                ['Last 30 Days', loginStats.month],
                ['Last Year', loginStats.year],
            ],
            theme: 'grid',
            headStyles: { fillColor: [220, 20, 60] }
        });

        // Detailed Logs
        doc.text('Recent User Activity (Login/Logout)', 14, doc.lastAutoTable.finalY + 15);

        const tableRows = userLogins.map(login => [
            new Date(login.timestamp).toLocaleString(),
            login.email,
            login.name,
            login.type ? (login.type === 'LOGIN' ? 'Logged In' : 'Logged Out') : 'Logged In'
        ]);

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 20,
            head: [['Timestamp', 'Email', 'Name', 'Action']],
            body: tableRows,
            theme: 'striped',
            headStyles: { fillColor: [40, 40, 40] }
        });

        doc.save('user_activity_report.pdf');
    };

    if (loading || !mounted) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        border: '3px solid #dc143c',
                        borderTop: '3px solid transparent',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        margin: '0 auto 1rem',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <p>Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#000', padding: '2rem 1rem' }}>
            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                        Admin Dashboard
                    </h1>
                    <p suppressHydrationWarning style={{ color: '#dc143c', fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                        {mounted ? currentTime : 'Loading...'}
                    </p>
                </div>

                {/* --- NEW SECTION: USER LOGIN ACTIVITY (Top Priority) --- */}
                <div style={{
                    background: '#111',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid #333',
                    marginBottom: '2rem',
                    animation: 'slideUp 0.3s ease-out'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #222', paddingBottom: '1rem' }}>
                        <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Users size={24} color="#dc143c" /> User Login Activity
                        </h2>
                        <button
                            onClick={exportLoginsPDF}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.5rem 1rem', background: '#dc143c', color: '#fff',
                                border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
                            }}>
                            <Download size={16} /> Export PDF
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                        {[
                            { label: 'Last Hour', val: loginStats.hour, color: '#4ade80' },
                            { label: 'Today (24h)', val: loginStats.day, color: '#60a5fa' },
                            { label: 'This Week', val: loginStats.week, color: '#facc15' },
                            { label: 'This Month', val: loginStats.month, color: '#f472b6' },
                            { label: 'This Year', val: loginStats.year, color: '#a78bfa' },
                        ].map((stat, i) => (
                            <div key={i} style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '8px', border: `1px solid ${stat.color}33` }}>
                                <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{stat.label}</p>
                                <p style={{ color: stat.color, fontSize: '1.8rem', fontWeight: 'bold' }}>{stat.val}</p>
                            </div>
                        ))}
                    </div>

                    {/* Latest Logins Table (Preview) */}
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ background: '#222', color: '#ccc', textAlign: 'left' }}>
                                    <th style={{ padding: '0.8rem' }}>Time</th>
                                    <th style={{ padding: '0.8rem' }}>User Email</th>
                                    <th style={{ padding: '0.8rem' }}>Name</th>
                                    <th style={{ padding: '0.8rem' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userLogins.slice(0, 10).map((login, idx) => {
                                    const isLogout = login.type === 'LOGOUT';
                                    return (
                                        <tr key={idx} style={{ borderBottom: '1px solid #222', color: '#eee' }}>
                                            <td style={{ padding: '0.8rem' }}>{new Date(login.timestamp).toLocaleTimeString()}</td>
                                            <td style={{ padding: '0.8rem' }}>{login.email}</td>
                                            <td style={{ padding: '0.8rem' }}>{login.name}</td>
                                            <td style={{ padding: '0.8rem' }}>
                                                <span style={{
                                                    background: isLogout ? 'rgba(239, 68, 68, 0.1)' : 'rgba(74, 222, 128, 0.1)',
                                                    color: isLogout ? '#f87171' : '#4ade80',
                                                    padding: '0.2rem 0.6rem',
                                                    borderRadius: '4px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '600'
                                                }}>
                                                    {isLogout ? 'Logged Out' : 'Logged In'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {userLogins.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>No recent activity.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Inventory Stats */}
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>
                            Inventory Statistics
                        </h2>
                        <button
                            onClick={() => generateInventoryPDF(inventoryStats)}
                            className="btn btn-outline"
                            style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                        >
                            <Download size={18} />
                            Export PDF
                        </button>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        <div style={{
                            background: '#1a1a1a',
                            border: '1px solid #dc143c',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            textAlign: 'center'
                        }}>
                            <Car size={40} color="#dc143c" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                Super Cars
                            </h3>
                            <p style={{ color: '#dc143c', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                                {inventoryStats.totalCars} Models
                            </p>
                            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                ({inventoryStats.totalCars} × 2 = {inventoryStats.totalCarUnits} units)
                            </p>
                            <div style={{ fontSize: '0.85rem', lineHeight: '1.8' }}>
                                <div style={{ color: '#4ade80' }}>
                                    ✓ {inventoryStats.availableCars} models available ({inventoryStats.availableCarUnits} units)
                                </div>
                                <div style={{ color: '#f87171' }}>
                                    ● {inventoryStats.rentedCars} models rented ({inventoryStats.rentedCarUnits} units)
                                </div>
                            </div>
                        </div>

                        <div style={{
                            background: '#1a1a1a',
                            border: '1px solid #dc143c',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            textAlign: 'center'
                        }}>
                            <Bike size={40} color="#dc143c" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                Super Bikes
                            </h3>
                            <p style={{ color: '#dc143c', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                                {inventoryStats.totalBikes} Models
                            </p>
                            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                ({inventoryStats.totalBikes} × 2 = {inventoryStats.totalBikeUnits} units)
                            </p>
                            <div style={{ fontSize: '0.85rem', lineHeight: '1.8' }}>
                                <div style={{ color: '#4ade80' }}>
                                    ✓ {inventoryStats.availableBikes} models available ({inventoryStats.availableBikeUnits} units)
                                </div>
                                <div style={{ color: '#f87171' }}>
                                    ● {inventoryStats.rentedBikes} models rented ({inventoryStats.rentedBikeUnits} units)
                                </div>
                            </div>
                        </div>

                        {/* Spares Card */}
                        <div style={{
                            background: '#1a1a1a',
                            border: '1px solid #dc143c',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            textAlign: 'center'
                        }}>
                            <Wrench size={40} color="#dc143c" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                OG Spares
                            </h3>
                            <p style={{ color: '#dc143c', fontSize: '2.5rem', fontWeight: 'bold' }}>
                                {inventoryStats.totalSpares}
                            </p>
                            <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Total Parts</p>
                        </div>

                        {/* Kits Card */}
                        <div style={{
                            background: '#1a1a1a',
                            border: '1px solid #dc143c',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            textAlign: 'center'
                        }}>
                            <Settings size={40} color="#dc143c" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                Mod Kits
                            </h3>
                            <p style={{ color: '#dc143c', fontSize: '2.5rem', fontWeight: 'bold' }}>
                                {inventoryStats.totalKits}
                            </p>
                            <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Total Kits</p>
                        </div>
                    </div>
                </div>

                {/* Super Cars Inventory Section */}
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>
                            Super Cars Inventory
                        </h2>
                        <button
                            onClick={() => generateInventoryPDF(inventoryStats)}
                            className="btn btn-outline"
                            style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                        >
                            <Download size={18} />
                            Export PDF
                        </button>
                    </div>

                    <div style={{
                        background: '#1a1a1a',
                        border: '1px solid #dc143c',
                        borderRadius: '12px',
                        padding: '1.5rem'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                background: 'rgba(74,222,128,0.1)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(74,222,128,0.3)'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Available Models</p>
                                <p style={{ color: '#4ade80', fontSize: '2rem', fontWeight: 'bold' }}>
                                    {inventoryStats.availableCars} ({inventoryStats.availableCarUnits} units)
                                </p>
                            </div>
                            <div style={{
                                background: 'rgba(248,113,113,0.1)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(248,113,113,0.3)'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Rented Models</p>
                                <p style={{ color: '#f87171', fontSize: '2rem', fontWeight: 'bold' }}>
                                    {inventoryStats.rentedCars} ({inventoryStats.rentedCarUnits} units)
                                </p>
                            </div>
                        </div>

                        {inventoryStats.cars && inventoryStats.cars.length > 0 ? (
                            <div style={{ overflowX: 'auto', maxHeight: '500px', overflowY: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ position: 'sticky', top: 0, background: '#1a1a1a', zIndex: 1 }}>
                                        <tr style={{ borderBottom: '2px solid #333' }}>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#dc143c' }}>Model Name</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'center', color: '#dc143c' }}>Units</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'center', color: '#dc143c' }}>Status</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'right', color: '#dc143c' }}>Price/Hour</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventoryStats.cars
                                            .sort((a, b) => a.name.localeCompare(b.name))
                                            .map((car, index) => {
                                                const statusColor = car.rented ? '#f87171' : '#4ade80';
                                                const statusText = car.rented ? 'Rented' : 'Available';

                                                return (
                                                    <tr key={index} style={{ borderBottom: '1px solid #222' }}>
                                                        <td style={{ padding: '0.75rem', color: '#fff' }}>{car.name}</td>
                                                        <td style={{ padding: '0.75rem', textAlign: 'center', color: '#aaa', fontWeight: 'bold' }}>
                                                            {car.units}
                                                        </td>
                                                        <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                                            <span style={{
                                                                padding: '0.25rem 0.75rem',
                                                                borderRadius: '12px',
                                                                fontSize: '0.8rem',
                                                                fontWeight: 'bold',
                                                                background: `${statusColor}20`,
                                                                color: statusColor,
                                                                border: `1px solid ${statusColor}`
                                                            }}>
                                                                {statusText}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '0.75rem', color: '#aaa', textAlign: 'right' }}>
                                                            ₹{car.price?.toLocaleString('en-IN') || 'N/A'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p style={{ color: '#aaa', textAlign: 'center', padding: '2rem' }}>
                                No car data available
                            </p>
                        )}
                    </div>
                </div>

                {/* Super Bikes Inventory Section */}
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>
                            Super Bikes Inventory
                        </h2>
                        <button
                            onClick={() => generateInventoryPDF(inventoryStats)}
                            className="btn btn-outline"
                            style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                        >
                            <Download size={18} />
                            Export PDF
                        </button>
                    </div>

                    <div style={{
                        background: '#1a1a1a',
                        border: '1px solid #dc143c',
                        borderRadius: '12px',
                        padding: '1.5rem'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                background: 'rgba(74,222,128,0.1)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(74,222,128,0.3)'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Available Models</p>
                                <p style={{ color: '#4ade80', fontSize: '2rem', fontWeight: 'bold' }}>
                                    {inventoryStats.availableBikes} ({inventoryStats.availableBikeUnits} units)
                                </p>
                            </div>
                            <div style={{
                                background: 'rgba(248,113,113,0.1)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(248,113,113,0.3)'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Rented Models</p>
                                <p style={{ color: '#f87171', fontSize: '2rem', fontWeight: 'bold' }}>
                                    {inventoryStats.rentedBikes} ({inventoryStats.rentedBikeUnits} units)
                                </p>
                            </div>
                        </div>

                        {inventoryStats.bikes && inventoryStats.bikes.length > 0 ? (
                            <div style={{ overflowX: 'auto', maxHeight: '500px', overflowY: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ position: 'sticky', top: 0, background: '#1a1a1a', zIndex: 1 }}>
                                        <tr style={{ borderBottom: '2px solid #333' }}>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#dc143c' }}>Model Name</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'center', color: '#dc143c' }}>Units</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'center', color: '#dc143c' }}>Status</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'right', color: '#dc143c' }}>Price/Hour</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventoryStats.bikes
                                            .sort((a, b) => a.name.localeCompare(b.name))
                                            .map((bike, index) => {
                                                const statusColor = bike.rented ? '#f87171' : '#4ade80';
                                                const statusText = bike.rented ? 'Rented' : 'Available';

                                                return (
                                                    <tr key={index} style={{ borderBottom: '1px solid #222' }}>
                                                        <td style={{ padding: '0.75rem', color: '#fff' }}>{bike.name}</td>
                                                        <td style={{ padding: '0.75rem', textAlign: 'center', color: '#aaa', fontWeight: 'bold' }}>
                                                            {bike.units}
                                                        </td>
                                                        <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                                            <span style={{
                                                                padding: '0.25rem 0.75rem',
                                                                borderRadius: '12px',
                                                                fontSize: '0.8rem',
                                                                fontWeight: 'bold',
                                                                background: `${statusColor}20`,
                                                                color: statusColor,
                                                                border: `1px solid ${statusColor}`
                                                            }}>
                                                                {statusText}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '0.75rem', color: '#aaa', textAlign: 'right' }}>
                                                            ₹{bike.price?.toLocaleString('en-IN') || 'N/A'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p style={{ color: '#aaa', textAlign: 'center', padding: '2rem' }}>
                                No bike data available
                            </p>
                        )}
                    </div>
                </div>

                {/* Car Spares Stock Inventory Section */}
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>
                            Super Car Spare Parts Stock Inventory
                        </h2>
                        <button
                            onClick={() => generateSparesStockPDF(inventoryStats.carSpares, 'Super Car Spares')}
                            className="btn btn-outline"
                            style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                        >
                            <Download size={18} />
                            Export PDF
                        </button>
                    </div>

                    <div style={{
                        background: '#1a1a1a',
                        border: '1px solid #dc143c',
                        borderRadius: '12px',
                        padding: '1.5rem'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                background: 'rgba(74,222,128,0.1)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(74,222,128,0.3)'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>High Stock (50+)</p>
                                <p style={{ color: '#4ade80', fontSize: '2rem', fontWeight: 'bold' }}>
                                    {inventoryStats.carSpares?.filter(s => s.stock > 50).length || 0}
                                </p>
                            </div>
                            <div style={{
                                background: 'rgba(251,191,36,0.1)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(251,191,36,0.3)'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Medium Stock (21-50)</p>
                                <p style={{ color: '#fbbf24', fontSize: '2rem', fontWeight: 'bold' }}>
                                    {inventoryStats.carSpares?.filter(s => s.stock > 20 && s.stock <= 50).length || 0}
                                </p>
                            </div>
                            <div style={{
                                background: 'rgba(248,113,113,0.1)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(248,113,113,0.3)'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Low Stock (5-20)</p>
                                <p style={{ color: '#f87171', fontSize: '2rem', fontWeight: 'bold' }}>
                                    {inventoryStats.carSpares?.filter(s => s.stock <= 20).length || 0}
                                </p>
                            </div>
                        </div>

                        {inventoryStats.carSpares && inventoryStats.carSpares.length > 0 ? (
                            <div style={{ overflowX: 'auto', maxHeight: '500px', overflowY: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ position: 'sticky', top: 0, background: '#1a1a1a', zIndex: 1 }}>
                                        <tr style={{ borderBottom: '2px solid #333' }}>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#dc143c' }}>Part Name</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'center', color: '#dc143c' }}>Stock</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'center', color: '#dc143c' }}>Status</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'right', color: '#dc143c' }}>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventoryStats.carSpares
                                            .sort((a, b) => a.stock - b.stock)
                                            .map((spare, index) => {
                                                const stockColor = spare.stock > 50 ? '#4ade80' : spare.stock > 20 ? '#fbbf24' : '#f87171';
                                                const stockStatus = spare.stock > 50 ? 'In Stock' : spare.stock > 20 ? 'Limited' : 'Low';

                                                return (
                                                    <tr key={index} style={{ borderBottom: '1px solid #222' }}>
                                                        <td style={{ padding: '0.75rem', color: '#fff' }}>{spare.name}</td>
                                                        <td style={{ padding: '0.75rem', textAlign: 'center', color: stockColor, fontWeight: 'bold', fontSize: '1.1rem' }}>
                                                            {spare.stock}
                                                        </td>
                                                        <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                                            <span style={{
                                                                padding: '0.25rem 0.75rem',
                                                                borderRadius: '12px',
                                                                fontSize: '0.8rem',
                                                                fontWeight: 'bold',
                                                                background: `${stockColor}20`,
                                                                color: stockColor,
                                                                border: `1px solid ${stockColor}`
                                                            }}>
                                                                {stockStatus}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '0.75rem', color: '#aaa', textAlign: 'right' }}>
                                                            ₹{spare.price?.toLocaleString('en-IN') || 'N/A'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p style={{ color: '#aaa', textAlign: 'center', padding: '2rem' }}>
                                No car spare parts data available
                            </p>
                        )}
                    </div>
                </div>

                {/* Bike Spares Stock Inventory Section */}
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>
                            Super Bike Spare Parts Stock Inventory
                        </h2>
                        <button
                            onClick={() => generateSparesStockPDF(inventoryStats.bikeSpares, 'Super Bike Spares')}
                            className="btn btn-outline"
                            style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                        >
                            <Download size={18} />
                            Export PDF
                        </button>
                    </div>

                    <div style={{
                        background: '#1a1a1a',
                        border: '1px solid #dc143c',
                        borderRadius: '12px',
                        padding: '1.5rem'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                background: 'rgba(74,222,128,0.1)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(74,222,128,0.3)'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>High Stock (50+)</p>
                                <p style={{ color: '#4ade80', fontSize: '2rem', fontWeight: 'bold' }}>
                                    {inventoryStats.bikeSpares?.filter(s => s.stock > 50).length || 0}
                                </p>
                            </div>
                            <div style={{
                                background: 'rgba(251,191,36,0.1)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(251,191,36,0.3)'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Medium Stock (21-50)</p>
                                <p style={{ color: '#fbbf24', fontSize: '2rem', fontWeight: 'bold' }}>
                                    {inventoryStats.bikeSpares?.filter(s => s.stock > 20 && s.stock <= 50).length || 0}
                                </p>
                            </div>
                            <div style={{
                                background: 'rgba(248,113,113,0.1)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(248,113,113,0.3)'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Low Stock (5-20)</p>
                                <p style={{ color: '#f87171', fontSize: '2rem', fontWeight: 'bold' }}>
                                    {inventoryStats.bikeSpares?.filter(s => s.stock <= 20).length || 0}
                                </p>
                            </div>
                        </div>

                        {inventoryStats.bikeSpares && inventoryStats.bikeSpares.length > 0 ? (
                            <div style={{ overflowX: 'auto', maxHeight: '500px', overflowY: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ position: 'sticky', top: 0, background: '#1a1a1a', zIndex: 1 }}>
                                        <tr style={{ borderBottom: '2px solid #333' }}>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#dc143c' }}>Part Name</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'center', color: '#dc143c' }}>Stock</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'center', color: '#dc143c' }}>Status</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'right', color: '#dc143c' }}>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventoryStats.bikeSpares
                                            .sort((a, b) => a.stock - b.stock)
                                            .map((spare, index) => {
                                                const stockColor = spare.stock > 50 ? '#4ade80' : spare.stock > 20 ? '#fbbf24' : '#f87171';
                                                const stockStatus = spare.stock > 50 ? 'In Stock' : spare.stock > 20 ? 'Limited' : 'Low';

                                                return (
                                                    <tr key={index} style={{ borderBottom: '1px solid #222' }}>
                                                        <td style={{ padding: '0.75rem', color: '#fff' }}>{spare.name}</td>
                                                        <td style={{ padding: '0.75rem', textAlign: 'center', color: stockColor, fontWeight: 'bold', fontSize: '1.1rem' }}>
                                                            {spare.stock}
                                                        </td>
                                                        <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                                            <span style={{
                                                                padding: '0.25rem 0.75rem',
                                                                borderRadius: '12px',
                                                                fontSize: '0.8rem',
                                                                fontWeight: 'bold',
                                                                background: `${stockColor}20`,
                                                                color: stockColor,
                                                                border: `1px solid ${stockColor}`
                                                            }}>
                                                                {stockStatus}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '0.75rem', color: '#aaa', textAlign: 'right' }}>
                                                            ₹{spare.price?.toLocaleString('en-IN') || 'N/A'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p style={{ color: '#aaa', textAlign: 'center', padding: '2rem' }}>
                                No bike spare parts data available
                            </p>
                        )}
                    </div>
                </div>

                {/* Rental Status */}
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>
                            Rental Status
                        </h2>
                        <button
                            onClick={() => generateRentalsPDF(rentalStats)}
                            className="btn btn-outline"
                            style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                        >
                            <Download size={18} />
                            Export PDF
                        </button>
                    </div>

                    <div style={{
                        background: '#1a1a1a',
                        border: '1px solid #dc143c',
                        borderRadius: '12px',
                        padding: '1.5rem'
                    }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold' }}>
                                Currently Rented: {rentalStats.activeRentals} vehicle(s)
                            </span>
                        </div>

                        {rentalStats.currentRentals.length > 0 ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #333' }}>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#dc143c' }}>Vehicle</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'center', color: '#dc143c' }}>Units</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#dc143c' }}>Type</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#dc143c' }}>Start Date</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#dc143c' }}>End Date</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#dc143c' }}>Customer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rentalStats.currentRentals.map((rental, index) => (
                                            <tr key={index} style={{ borderBottom: '1px solid #222' }}>
                                                <td style={{ padding: '0.75rem', color: '#fff' }}>{rental.name}</td>
                                                <td style={{ padding: '0.75rem', color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>{rental.units}</td>
                                                <td style={{ padding: '0.75rem', color: '#aaa' }}>{rental.type.toUpperCase()}</td>
                                                <td style={{ padding: '0.75rem', color: '#aaa' }}>{rental.startDate || 'N/A'}</td>
                                                <td style={{ padding: '0.75rem', color: '#aaa' }}>{rental.endDate || 'N/A'}</td>
                                                <td style={{ padding: '0.75rem', color: '#aaa' }}>{rental.customer}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p style={{ color: '#aaa', textAlign: 'center', padding: '2rem' }}>
                                No active rentals at the moment
                            </p>
                        )}
                    </div>
                </div>

                {/* Sales Statistics */}
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>
                            Spare Parts Sales
                        </h2>
                        <button
                            onClick={() => generateSalesPDF(salesStats)}
                            className="btn btn-outline"
                            style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                        >
                            <Download size={18} />
                            Export PDF
                        </button>
                    </div>

                    <div style={{
                        background: '#1a1a1a',
                        border: '1px solid #dc143c',
                        borderRadius: '12px',
                        padding: '1.5rem'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                background: 'rgba(220,20,60,0.1)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(220,20,60,0.3)'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Units Sold</p>
                                <p style={{ color: '#dc143c', fontSize: '2rem', fontWeight: 'bold' }}>{salesStats.totalUnitsSold}</p>
                            </div>
                            <div style={{
                                background: 'rgba(220,20,60,0.1)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(220,20,60,0.3)'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Revenue</p>
                                <p style={{ color: '#dc143c', fontSize: '2rem', fontWeight: 'bold' }}>
                                    ₹{salesStats.totalRevenue.toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>

                        {salesStats.sparesSold.length > 0 ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #333' }}>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#dc143c' }}>Spare Part</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'right', color: '#dc143c' }}>Units Sold</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'right', color: '#dc143c' }}>Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salesStats.sparesSold.map((item, index) => (
                                            <tr key={index} style={{ borderBottom: '1px solid #222' }}>
                                                <td style={{ padding: '0.75rem', color: '#fff' }}>{item.name}</td>
                                                <td style={{ padding: '0.75rem', color: '#aaa', textAlign: 'right' }}>{item.units}</td>
                                                <td style={{ padding: '0.75rem', color: '#4ade80', textAlign: 'right' }}>
                                                    ₹{item.revenue.toLocaleString('en-IN')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p style={{ color: '#aaa', textAlign: 'center', padding: '2rem' }}>
                                No sales recorded yet
                            </p>
                        )}
                    </div>
                </div>

                {/* Visitor Analytics */}
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>
                            Visitor Analytics
                        </h2>
                        <button
                            onClick={() => generateAnalyticsPDF(visitorStats)}
                            className="btn btn-outline"
                            style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                        >
                            <Download size={18} />
                            Export PDF
                        </button>
                    </div>

                    <div style={{
                        background: '#1a1a1a',
                        border: '1px solid #dc143c',
                        borderRadius: '12px',
                        padding: '1.5rem'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                            gap: '1rem'
                        }}>
                            <div style={{
                                background: 'rgba(220,20,60,0.1)',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(220,20,60,0.3)',
                                textAlign: 'center'
                            }}>
                                <Users size={32} color="#dc143c" style={{ margin: '0 auto 0.5rem' }} />
                                <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Last Hour</p>
                                <p style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>{visitorStats.lastHour}</p>
                            </div>

                            <div style={{
                                background: 'rgba(220,20,60,0.1)',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(220,20,60,0.3)',
                                textAlign: 'center'
                            }}>
                                <TrendingUp size={32} color="#dc143c" style={{ margin: '0 auto 0.5rem' }} />
                                <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Today</p>
                                <p style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>{visitorStats.today}</p>
                            </div>

                            <div style={{
                                background: 'rgba(220,20,60,0.1)',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(220,20,60,0.3)',
                                textAlign: 'center'
                            }}>
                                <Users size={32} color="#dc143c" style={{ margin: '0 auto 0.5rem' }} />
                                <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '0.5rem' }}>This Month</p>
                                <p style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>{visitorStats.thisMonth}</p>
                            </div>

                            <div style={{
                                background: 'rgba(220,20,60,0.1)',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(220,20,60,0.3)',
                                textAlign: 'center'
                            }}>
                                <TrendingUp size={32} color="#dc143c" style={{ margin: '0 auto 0.5rem' }} />
                                <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '0.5rem' }}>This Year</p>
                                <p style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>{visitorStats.thisYear}</p>
                            </div>

                            <div style={{
                                background: 'rgba(220,20,60,0.1)',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(220,20,60,0.3)',
                                textAlign: 'center'
                            }}>
                                <Users size={32} color="#dc143c" style={{ margin: '0 auto 0.5rem' }} />
                                <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '0.5rem' }}>All Time</p>
                                <p style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>{visitorStats.allTime}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Refresh Button */}
                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={fetchAllStats}
                        className="btn btn-primary"
                        style={{ padding: '1rem 2rem' }}
                    >
                        Refresh All Statistics
                    </button>
                </div>
            </div>
        </div>
    );
}
