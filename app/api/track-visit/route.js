import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const body = await request.json();
        const analyticsPath = path.join(process.cwd(), 'data', 'analytics.json');

        // Read current analytics data
        let analyticsData = { visits: [], stats: { totalVisits: 0, uniqueVisitors: 0, lastUpdated: null } };

        if (fs.existsSync(analyticsPath)) {
            const fileContent = fs.readFileSync(analyticsPath, 'utf-8');
            analyticsData = JSON.parse(fileContent);
        }

        // Add new visit
        analyticsData.visits.push({
            timestamp: body.timestamp,
            page: body.page,
            referrer: body.referrer
        });

        // Update stats
        analyticsData.stats.totalVisits = analyticsData.visits.length;
        analyticsData.stats.lastUpdated = new Date().toISOString();

        // Write back to file
        fs.writeFileSync(analyticsPath, JSON.stringify(analyticsData, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error tracking visit:', error);
        return NextResponse.json({ error: 'Failed to track visit' }, { status: 500 });
    }
}
