# Firebase Setup Guide

This app uses Firebase Storage to load photography images with anonymous authentication.

## Prerequisites

1. Firebase project: `roadrunner-native-web`
2. Firebase Storage bucket with a `Photography` folder containing your images

## Setup Steps

### 1. Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `roadrunner-native-web`
3. Click the gear icon ⚙️ > Project Settings
4. Scroll down to "Your apps" section
5. If you don't have a web app, click "Add app" > Web (</>) icon
6. Copy the configuration values

### 2. Configure Firebase in the App

You have two options:

#### Option A: Environment Variables (Recommended)

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=roadrunner-native-web.firebaseapp.com
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=roadrunner-native-web.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Note:** Make sure to add `.env` to your `.gitignore` file to keep your keys secure!

#### Option B: Direct Configuration

Edit `src/Config/Firebase.ts` and replace the placeholder values with your actual Firebase config.

### 3. Enable Anonymous Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Find **Anonymous** in the list
3. Click on it and toggle **Enable**
4. Click **Save**

### 4. Set Up Storage Security Rules

1. In Firebase Console, go to **Storage** > **Rules**
2. Replace the rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to read all files
    match /{allPaths=**} {
      allow read: if request.auth != null;
      // Optionally allow write operations (adjust as needed)
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

### 5. Upload Images to Storage

1. In Firebase Console, go to **Storage**
2. Create a folder named `Photography` (if it doesn't exist)
3. Upload your photography images to this folder

The app will automatically list and display all images in the `Photography` folder.

## Testing

1. Start the app: `yarn start` or `yarn web`
2. Navigate to the Photography page
3. You should see a loading indicator, then your images should appear
4. Check the browser console for any errors

## Troubleshooting

- **"Failed to load images"**: 
  - Check that anonymous authentication is enabled
  - Verify Storage rules allow authenticated reads
  - Ensure images are in the `Photography` folder in Storage

- **"Failed to initialize Firebase authentication"**:
  - Verify your Firebase config values are correct
  - Check that the API key is valid
  - Ensure your Firebase project is active

- **Images not appearing**:
  - Check browser console for errors
  - Verify images are uploaded to the correct folder (`Photography`)
  - Ensure Storage rules are published

