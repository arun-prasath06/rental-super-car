'use client';
import Link from 'next/link';
import { ShoppingCart, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check for session on mount and when storage changes (optional, but mount is key)
        const checkSession = () => {
            const stored = localStorage.getItem('user_session');
            if (stored) setUser(JSON.parse(stored));
        };
        checkSession();

        // Listen for login events across tabs/components
        window.addEventListener('storage', checkSession);
        return () => window.removeEventListener('storage', checkSession);
    }, []);

    const handleLogout = async () => {
        if (user) {
            // Record Logout
            try {
                await fetch('/api/record-login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: user.name,
                        email: user.email,
                        timestamp: new Date().toISOString(),
                        type: 'LOGOUT'
                    })
                });
            } catch (e) {
                console.error("Logout log failed", e);
            }
        }

        localStorage.removeItem('user_session');
        setUser(null);
        router.push('/'); // Go home
        // Force refresh to update UI if needed, though state change handles this component
        router.refresh();
    };

    return (
        <nav className="navbar container">
            <Link href="/" className="logo">
                Piston <span className="text-red">Rental-X</span> Pro
            </Link>

            <div className="nav-links">
                <Link href="/">Home</Link>
                <Link href="/products/car">Super Cars</Link>
                <Link href="/products/bike">Super Bikes</Link>
                <Link href="/spares">OG Spares</Link>
                <Link href="/products/kit">Mod Kits</Link>
                <Link href="/support">Support</Link>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link href="/cart" className="btn btn-primary" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem' }}>
                    <ShoppingCart size={18} />
                    <span>Cart</span>
                </Link>

                {user && (
                    <button
                        onClick={handleLogout}
                        className="btn"
                        style={{
                            padding: '0.5rem 1rem',
                            display: 'flex',
                            gap: '0.5rem',
                            background: '#333',
                            color: '#fff',
                            border: '1px solid #444',
                            cursor: 'pointer'
                        }}
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                )}
            </div>
        </nav>
    );
}
