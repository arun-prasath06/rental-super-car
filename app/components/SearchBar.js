'use client';

import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef(null);
    const router = useRouter();

    // Fetch suggestions as user types
    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setSuggestions(data);
                setShowSuggestions(data.length > 0);
            } catch (error) {
                console.error('Search failed:', error);
            }
        }, 300); // Debounce 300ms

        return () => clearTimeout(timer);
    }, [query]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!showSuggestions) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0) {
                handleSuggestionClick(suggestions[selectedIndex]);
            } else {
                handleSearch();
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (item) => {
        setShowSuggestions(false);
        setQuery('');

        // Navigate based on type
        if (item.type === 'car' || item.type === 'bike' || item.type === 'kit') {
            router.push(`/products/${item.type}`);
        } else if (item.type === 'part') {
            router.push('/spares');
        }
    };

    const handleSearch = () => {
        if (query.trim()) {
            // Simple search logic - can be enhanced later
            const firstSuggestion = suggestions[0];
            if (firstSuggestion) {
                handleSuggestionClick(firstSuggestion);
            }
        }
    };

    const getTypeLabel = (type) => {
        const labels = {
            'car': 'Super Car',
            'bike': 'Super Bike',
            'kit': 'Mod Kit',
            'part': 'OG Spare'
        };
        return labels[type] || type;
    };

    const getTypeBadgeColor = (type) => {
        const colors = {
            'car': '#dc143c',
            'bike': '#f59e0b',
            'kit': '#8b5cf6',
            'part': '#10b981'
        };
        return colors[type] || '#6b7280';
    };

    return (
        <div className="container" style={{ marginTop: '1rem', marginBottom: '2rem', position: 'relative' }} ref={searchRef}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                borderRadius: '50px',
                padding: '0.3rem 0.5rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                width: '100%',
                maxWidth: '100%'
            }}>
                <div style={{ padding: '0 1rem', color: '#666' }}>
                    <Search size={22} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    placeholder="Describe the vehicle or spare part you're looking for..."
                    style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        padding: '0.8rem 0',
                        fontSize: '1rem',
                        color: '#333',
                        background: 'transparent'
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        background: '#dc143c',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '0.8rem 2rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        marginLeft: '0.5rem'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#b01030'}
                    onMouseOut={(e) => e.target.style.background = '#dc143c'}
                >
                    Search
                </button>
            </div>

            {/* Autocomplete Suggestions */}
            {showSuggestions && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: '#fff',
                    borderRadius: '16px',
                    marginTop: '0.5rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    border: '1px solid #e5e7eb'
                }}>
                    {suggestions.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => handleSuggestionClick(item)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem 1rem',
                                cursor: 'pointer',
                                background: selectedIndex === index ? '#f3f4f6' : '#fff',
                                borderBottom: index < suggestions.length - 1 ? '1px solid #e5e7eb' : 'none',
                                transition: 'background 0.15s'
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb'
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    color: '#111',
                                    fontWeight: '600',
                                    marginBottom: '0.25rem',
                                    fontSize: '0.95rem'
                                }}>
                                    {item.name}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '0.15rem 0.5rem',
                                        borderRadius: '4px',
                                        background: getTypeBadgeColor(item.type) + '20',
                                        color: getTypeBadgeColor(item.type),
                                        fontWeight: '600'
                                    }}>
                                        {getTypeLabel(item.type)}
                                    </span>
                                    <span style={{
                                        fontSize: '0.85rem',
                                        color: '#6b7280'
                                    }}>
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                            <div style={{
                                color: '#dc143c',
                                fontWeight: 'bold',
                                fontSize: '1rem'
                            }}>
                                ₹{item.price.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
