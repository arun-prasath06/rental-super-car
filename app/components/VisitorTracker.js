'use client';
import { useEffect } from 'react';

export default function VisitorTracker() {
    useEffect(() => {
        // Track visit on mount
        const trackVisit = async () => {
            try {
                const response = await fetch('/api/track-visit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        timestamp: new Date().toISOString(),
                        page: window.location.pathname,
                        referrer: document.referrer
                    })
                });

                if (!response.ok) {
                    console.error('Failed to track visit');
                }
            } catch (error) {
                console.error('Error tracking visit:', error);
            }
        };

        trackVisit();
    }, []);

    return null; // This component doesn't render anything
}
