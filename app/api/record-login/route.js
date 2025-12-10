import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'user_logins.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return Response.json(JSON.parse(fileContent));
    } catch (error) {
        return Response.json([]); // Return empty if file error
    }
}

export async function POST(request) {
    try {
        const activityData = await request.json(); // { email, name, timestamp, type: 'LOGIN' | 'LOGOUT' }
        const filePath = path.join(process.cwd(), 'data', 'user_logins.json');

        let currentActivity = [];
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            currentActivity = JSON.parse(fileContent);
        } catch (error) {
            // File might not exist
        }

        // Add new activity
        currentActivity.unshift({
            ...activityData,
            type: activityData.type || 'LOGIN' // Default to LOGIN for backward compatibility
        });

        await fs.writeFile(filePath, JSON.stringify(currentActivity, null, 2));

        return Response.json({ success: true });
    } catch (error) {
        console.error('Error logging activity:', error);
        return Response.json({ error: 'Failed to log activity' }, { status: 500 });
    }
}
