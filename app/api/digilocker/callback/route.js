export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
        return Response.json({ error: 'No code provided' }, { status: 400 });
    }

    try {
        // Exchange code for text
        const tokenResponse = await fetch('https://api.digitallocker.gov.in/public/oauth2/1/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code: code,
                grant_type: 'authorization_code',
                client_id: process.env.DIGILOCKER_CLIENT_ID,
                client_secret: process.env.DIGILOCKER_CLIENT_SECRET,
                redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/digilocker/callback`,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.access_token) {
            // Fetch User Files provided in scope
            // const files = await fetch('https://api.digitallocker.gov.in/public/oauth2/2/files/issued', ...);

            // Redirect back to cart with success flag (In real app, use a session/cookie)
            return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/cart?verified=true`);
        }

        return Response.json({ error: 'Verification Failed' });

    } catch (error) {
        return Response.json({ error: error.message });
    }
}
