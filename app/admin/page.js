'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { Package, ShieldCheck, DollarSign, LogOut } from 'lucide-react';

export default function AdminPage() {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/admin/login');
        } else {
            setAuthorized(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        router.push('/');
    };

    if (!authorized) return null; // Or a loading spinner

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '2rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 className="text-red" style={{ margin: 0, fontSize: '2.5rem' }}>COMMAND CENTER</h1>
                        <p style={{ color: '#666' }}>WELCOME BACK, COMMANDER</p>
                    </div>
                    <button onClick={handleLogout} className="btn btn-outline" style={{ fontSize: '0.8rem', display: 'flex', gap: '0.5rem' }}>
                        <LogOut size={16} /> LOGOUT
                    </button>
                </div>

                <div className="grid">
                    {/* Stats */}
                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--primary)' }}>
                        <div style={{ padding: '1rem', background: 'rgba(220, 20, 60, 0.1)', borderRadius: '50%' }}>
                            <Package color="rgb(var(--primary))" />
                        </div>
                        <div>
                            <h3 style={{ margin: 0 }}>1,204</h3>
                            <p className="text-muted">Total Spares</p>
                        </div>
                    </div>
                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #32ff64' }}>
                        <div style={{ padding: '1rem', background: 'rgba(50, 255, 100, 0.1)', borderRadius: '50%' }}>
                            <ShieldCheck color="#32ff64" />
                        </div>
                        <div>
                            <h3 style={{ margin: 0 }}>12</h3>
                            <p className="text-muted">Pending IDs</p>
                        </div>
                    </div>
                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #6464ff' }}>
                        <div style={{ padding: '1rem', background: 'rgba(100, 100, 255, 0.1)', borderRadius: '50%' }}>
                            <DollarSign color="#6464ff" />
                        </div>
                        <div>
                            <h3 style={{ margin: 0 }}>$42,800</h3>
                            <p className="text-muted">Revenue</p>
                        </div>
                    </div>
                </div>

                <h2 style={{ marginTop: '3rem', fontSize: '1.5rem', border: 'none' }}>ACTIVE ORDERS</h2>
                <div className="card" style={{ padding: '0', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ background: '#111', color: '#888', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Order ID</th>
                                <th style={{ padding: '1rem' }}>Type</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #333' }}>
                                <td style={{ padding: '1rem' }}>#ORD-9921</td>
                                <td style={{ padding: '1rem' }}>Nissan GTR Kit</td>
                                <td style={{ padding: '1rem' }}><span style={{ color: 'orange' }}>Validating ID</span></td>
                                <td style={{ padding: '1rem' }}>
                                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Process</button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1rem' }}>#ORD-9922</td>
                                <td style={{ padding: '1rem' }}>Ducati V4</td>
                                <td style={{ padding: '1rem' }}><span style={{ color: '#32ff64' }}>Approved</span></td>
                                <td style={{ padding: '1rem' }}>
                                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
