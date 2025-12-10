# Google OAuth Setup Instructions

## Step 1: Get Google OAuth Credentials

1. Go to: https://console.cloud.google.com/apis/credentials
2. Create a new project (or select existing)
3. Click "Create Credentials" → "OAuth Client ID"
4. Choose "Web application"
5. Add Authorized JavaScript origins:
   - http://localhost:3000
   - https://rental-super-car.vercel.app
6. Add Authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google
   - https://rental-super-car.vercel.app/api/auth/callback/google
7. Click "Create"
8. **Copy** the Client ID and Client Secret

## Step 2: Create .env.local file

Create a file named `.env.local` in your project root with:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-here
GOOGLE_CLIENT_ID=paste-your-client-id-here
GOOGLE_CLIENT_SECRET=paste-your-client-secret-here
```

## Step 3: Generate NEXTAUTH_SECRET

Run this command in terminal:
```
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and paste it as NEXTAUTH_SECRET

## Step 4: Add to Vercel

1. Go to: https://vercel.com/arunprasathganesan58-6112s-projects/rental-super-car/settings/environment-variables
2. Add all 4 environment variables
3. For NEXTAUTH_URL in production, use: https://rental-super-car.vercel.app

## Step 5: Restart Development Server

```
npm run dev
```

Now Real Google Login will work!
