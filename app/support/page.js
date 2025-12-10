'use client';
import { Phone, Mail, Clock, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function SupportPage() {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#000',
            padding: '2rem 1rem'
        }}>
            <div className="container" style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    marginBottom: '3rem',
                    paddingTop: '2rem'
                }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem'
                    }}>
                        We are here to help 24/7
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Every Guide is trained and excited to work with you, whether you need help with a password reset or you are looking for a team to build your complete web presence.
                    </p>
                </div>

                {/* Contact Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    {/* Call Us Card */}
                    <div
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(220,20,60,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(220,20,60,0.2)';
                        }}
                        style={{
                            background: '#1a1a1a',
                            border: '1px solid #dc143c',
                            borderRadius: '12px',
                            padding: '2rem',
                            boxShadow: '0 10px 30px rgba(220,20,60,0.2)',
                            transition: 'all 0.3s ease'
                        }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <Phone size={24} />
                            Call Us
                        </h3>
                        <p style={{
                            color: '#aaa',
                            marginBottom: '1rem',
                            lineHeight: '1.6'
                        }}>
                            Contact our award-winning support team
                        </p>
                        <a href="tel:+919345611306" style={{
                            color: '#dc143c',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}>
                            +91-9345611306
                        </a>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#888',
                            marginTop: '1rem'
                        }}>
                            <Clock size={18} />
                            <span>Everyday 7:00 AM - 7:00 PM</span>
                        </div>
                    </div>

                    {/* Email Us Card */}
                    <div
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(220,20,60,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(220,20,60,0.2)';
                        }}
                        style={{
                            background: '#1a1a1a',
                            border: '1px solid #dc143c',
                            borderRadius: '12px',
                            padding: '2rem',
                            boxShadow: '0 10px 30px rgba(220,20,60,0.2)',
                            transition: 'all 0.3s ease'
                        }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <Mail size={24} />
                            Email Us
                        </h3>
                        <p style={{
                            color: '#aaa',
                            marginBottom: '1rem',
                            lineHeight: '1.6'
                        }}>
                            We will respond within 24 hours
                        </p>
                        <a href="mailto:support@pistonrentals.com" style={{
                            color: '#dc143c',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            display: 'block',
                            wordBreak: 'break-word'
                        }}>
                            support@pistonrentals.com
                        </a>
                    </div>
                </div>

                {/* Instagram QR Code Section */}
                <div style={{
                    background: '#1a1a1a',
                    border: '1px solid #dc143c',
                    borderRadius: '12px',
                    padding: '2rem',
                    boxShadow: '0 10px 30px rgba(220,20,60,0.2)',
                    textAlign: 'center',
                    maxWidth: '500px',
                    margin: '0 auto'
                }}>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}>
                        <Instagram size={28} color="#E4405F" />
                        Follow Us on Instagram
                    </h3>
                    <p style={{
                        color: '#aaa',
                        marginBottom: '1.5rem'
                    }}>
                        Scan the QR code to follow us
                    </p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                    }}>
                        <Image
                            src="/instagram-qr.png"
                            alt="Instagram QR Code - Mr Piston"
                            width={300}
                            height={300}
                            style={{
                                border: '2px solid #E4405F',
                                borderRadius: '8px',
                                padding: '1rem',
                                background: '#fff'
                            }}
                        />
                    </div>
                    <p style={{
                        color: '#dc143c',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                    }}>
                        @mr_piston_
                    </p>
                </div>

                {/* Additional Info */}
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    marginTop: '3rem',
                    padding: '2rem',
                    background: 'rgba(220,20,60,0.1)',
                    border: '1px solid rgba(220,20,60,0.3)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h3 style={{
                        fontSize: '1.5rem',
                        marginBottom: '1rem'
                    }}>
                        Need Immediate Assistance?
                    </h3>
                    <p style={{
                        fontSize: '1rem',
                        opacity: 0.9,
                        marginBottom: '1.5rem'
                    }}>
                        Our support team is available 7 days a week to help you with rentals, modifications, or any questions you may have.
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <a href="tel:+919345611306" className="btn btn-primary" style={{
                            padding: '1rem 2rem',
                            fontWeight: 'bold'
                        }}>
                            Call Now
                        </a>
                        <a href="mailto:support@pistonrentals.com" className="btn btn-outline" style={{
                            padding: '1rem 2rem',
                            fontWeight: 'bold'
                        }}>
                            Send Email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
