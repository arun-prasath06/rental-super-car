'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginModal from './LoginModal';
import RentModal from './RentModal';

export default function AddToCartButton({ product }) {
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRentModal, setShowRentModal] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem('user_session');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleRentClick = () => {
        if (!user) {
            setShowLoginModal(true);
        } else {
            // Use RentModal for ALL products as requested ("copy to all")
            setShowRentModal(true);
        }
    };

    const handleLogin = (userData) => {
        setUser(userData);
        setShowLoginModal(false);
        // Automatically open rent modal after login for ALL products
        setShowRentModal(true);
    };

    const handleBookingSubmit = (bookingDetails) => {
        // Combine product info with booking details
        const cartItem = {
            ...product, // ID, name, price, etc.
            rentalDetails: {
                pickupLocation: bookingDetails.pickupLocation,
                dropoffLocation: bookingDetails.dropoffLocation,
                pickupDate: bookingDetails.pickupDate,
                pickupTime: bookingDetails.pickupTime,
                dropDate: bookingDetails.dropDate,
                dropTime: bookingDetails.dropTime
            },
            quantity: 1 // Default to 1 unit
        };

        const cart = JSON.parse(localStorage.getItem('rental_cart') || '[]');
        cart.push(cartItem);
        localStorage.setItem('rental_cart', JSON.stringify(cart));

        setShowRentModal(false);
        router.push('/cart');
    };

    return (
        <>
            <button
                onClick={handleRentClick}
                className="btn btn-primary"
            >
                {product.type === 'car' || product.type === 'bike' ? 'Rent Now' : 'Buy Now'}
            </button>

            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLogin}
            />

            <RentModal
                isOpen={showRentModal}
                onClose={() => setShowRentModal(false)}
                onSubmit={handleBookingSubmit}
                product={product}
            />
        </>
    );
}
