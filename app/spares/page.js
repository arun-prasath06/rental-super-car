'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Search, ShoppingCart, Car, Bike } from 'lucide-react';
import Image from 'next/image';

export default function SparesPage() {
    const [parts, setParts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch parts from products.json
        fetch('/data/products.json')
            .then(res => res.json())
            .then(data => {
                const partsData = data.filter(item => item.type === 'part');
                setParts(partsData);
            });
    }, []);

    // Filter parts by search
    const filteredParts = parts.filter(part =>
        part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Separate parts by main category
    const carParts = filteredParts.filter(part => part.category === 'Super Car Parts');
    const bikeParts = filteredParts.filter(part => part.category === 'Super Bike Parts');

    // Group by subcategory
    const groupBySubcategory = (partsList) => {
        const grouped = {};
        partsList.forEach(part => {
            const subcat = part.subcategory || 'Other';
            if (!grouped[subcat]) {
                grouped[subcat] = [];
            }
            grouped[subcat].push(part);
        });
        return grouped;
    };

    const groupedCarParts = groupBySubcategory(carParts);
    const groupedBikeParts = groupBySubcategory(bikeParts);

    const PartCard = ({ part }) => {
        const stockColor = part.stock > 50 ? '#4ade80' : part.stock > 20 ? '#fbbf24' : '#f87171';
        const stockStatus = part.stock > 50 ? 'In Stock' : part.stock > 20 ? 'Limited Stock' : 'Low Stock';

        return (
            <div
                className="card"
                style={{
                    padding: '0',
                    background: '#0e0e0e',
                    overflow: 'hidden',
                    transition: 'transform 0.3s',
                    cursor: 'pointer',
                    border: '1px solid #222'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
                <div style={{
                    width: '100%',
                    height: '180px',
                    position: 'relative',
                    background: '#000'
                }}>
                    <Image
                        src={part.image}
                        alt={part.name}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                    {/* Stock Badge */}
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(0,0,0,0.8)',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        color: stockColor,
                        border: `1px solid ${stockColor}`,
                        borderRadius: '4px'
                    }}>
                        {part.stock} in stock
                    </div>
                </div>
                <div style={{ padding: '1.2rem' }}>
                    <h3 style={{
                        fontSize: '1.1rem',
                        marginBottom: '0.5rem',
                        color: '#fff',
                        minHeight: '2.5rem'
                    }}>
                        {part.name}
                    </h3>
                    <p style={{
                        color: '#888',
                        fontSize: '0.85rem',
                        marginBottom: '0.75rem',
                        lineHeight: '1.4',
                        minHeight: '3rem'
                    }}>
                        {part.description}
                    </p>

                    {/* Stock Status */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                        fontSize: '0.85rem'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: stockColor
                        }}></div>
                        <span style={{ color: stockColor }}>{stockStatus}</span>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid #222',
                        paddingTop: '1rem'
                    }}>
                        <span style={{
                            fontSize: '1.3rem',
                            color: '#dc143c',
                            fontWeight: 'bold'
                        }}>
                            ₹{part.price.toLocaleString()}
                        </span>
                        <button className="btn btn-primary" style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.85rem'
                        }}>
                            <ShoppingCart size={14} style={{ marginRight: '0.5rem' }} />
                            ADD
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <main style={{ minHeight: '100vh', background: '#050505' }}>
            <Navbar />

            {/* Header */}
            <section className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
                <h1 className="text-red" style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>OG SPARES</h1>
                <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>PREMIUM ORIGINAL PARTS FOR YOUR SUPER MACHINES</p>

                <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '1rem', color: '#666' }} />
                    <input
                        type="text"
                        placeholder="Search parts..."
                        value={searchTerm}
                        style={{
                            width: '100%',
                            padding: '1rem 1rem 1rem 3.5rem',
                            background: '#111',
                            border: '1px solid #333',
                            color: '#fff',
                            fontSize: '1.1rem',
                            borderRadius: '0'
                        }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </section>

            {/* SUPER CAR PARTS SECTION */}
            <section className="container" style={{ paddingBottom: '4rem' }}>
                <div style={{
                    background: 'linear-gradient(135deg, #1a0000 0%, #0e0e0e 100%)',
                    padding: '2rem',
                    marginBottom: '3rem',
                    border: '2px solid #dc143c',
                    borderRadius: '0'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <Car size={40} color="#dc143c" />
                        <h2 style={{
                            fontSize: '2.5rem',
                            margin: 0,
                            color: '#dc143c',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            OG Spares of Super Car
                        </h2>
                    </div>
                    <p style={{ color: '#888', fontSize: '1.1rem', margin: 0 }}>
                        Complete A-Z Original Parts Catalog for Supercars
                    </p>
                </div>

                {Object.keys(groupedCarParts).length > 0 ? (
                    Object.keys(groupedCarParts).sort().map(subcategory => (
                        <div key={subcategory} style={{ marginBottom: '3rem' }}>
                            <h3 style={{
                                fontSize: '1.8rem',
                                borderLeft: '4px solid #dc143c',
                                paddingLeft: '1rem',
                                marginBottom: '1.5rem',
                                color: '#fff'
                            }}>
                                {subcategory}
                            </h3>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {groupedCarParts[subcategory].map(part => (
                                    <PartCard key={part.id} part={part} />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                        No car parts found
                    </p>
                )}
            </section>

            {/* SUPER BIKE PARTS SECTION */}
            <section className="container" style={{ paddingBottom: '4rem' }}>
                <div style={{
                    background: 'linear-gradient(135deg, #001a00 0%, #0e0e0e 100%)',
                    padding: '2rem',
                    marginBottom: '3rem',
                    border: '2px solid #00ff00',
                    borderRadius: '0'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <Bike size={40} color="#00ff00" />
                        <h2 style={{
                            fontSize: '2.5rem',
                            margin: 0,
                            color: '#00ff00',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            OG Spares of Super Bike
                        </h2>
                    </div>
                    <p style={{ color: '#888', fontSize: '1.1rem', margin: 0 }}>
                        Complete A-Z Original Parts Catalog for Superbikes
                    </p>
                </div>

                {Object.keys(groupedBikeParts).length > 0 ? (
                    Object.keys(groupedBikeParts).sort().map(subcategory => (
                        <div key={subcategory} style={{ marginBottom: '3rem' }}>
                            <h3 style={{
                                fontSize: '1.8rem',
                                borderLeft: '4px solid #00ff00',
                                paddingLeft: '1rem',
                                marginBottom: '1.5rem',
                                color: '#fff'
                            }}>
                                {subcategory}
                            </h3>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {groupedBikeParts[subcategory].map(part => (
                                    <PartCard key={part.id} part={part} />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                        No bike parts found
                    </p>
                )}
            </section>

            {carParts.length === 0 && bikeParts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: '#666' }}>
                    <p style={{ fontSize: '1.5rem' }}>No parts found matching your search</p>
                </div>
            )}
        </main>
    );
}
