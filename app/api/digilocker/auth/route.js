export async function GET(request) {
    // 1. Get these from https://partners.digitallocker.gov.in/
    const CLIENT_ID = process.env.DIGILOCKER_CLIENT_ID;
    const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/digilocker/callback`;
    const STATE = 'random_security_string'; // Should be generated per request

    if (!CLIENT_ID) {
        return Response.json({ error: 'DigiLocker API Keys not configured' }, { status: 500 });
    }

    // 2. Construct OAuth URL
    const authUrl = `https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;

    // 3. Redirect User
    return Response.redirect(authUrl);
}
