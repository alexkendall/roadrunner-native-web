import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// 
// SETUP INSTRUCTIONS:
// 1. Get your Firebase config from: Firebase Console > Project Settings > General > Your apps
// 2. Either set environment variables (recommended) or replace the default values below
// 3. Enable Anonymous Authentication: Firebase Console > Authentication > Sign-in method > Anonymous > Enable
// 4. Set up Storage Rules to allow authenticated users:
//    - Firebase Console > Storage > Rules
//    - Add: rules_version = '2'; service firebase.storage { match /b/{bucket}/o { match /{allPaths=**} { allow read: if request.auth != null; } } }
//
// Environment variables (create .env file in project root):
// EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
// EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=roadrunner-native-web.firebaseapp.com
// EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=roadrunner-native-web.appspot.com
// EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
// EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
// EXPO_PUBLIC_FIREBASE_DATABASE_URL=https://<your-database>.firebaseio.com

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEHMSaDMfwDhwTPc7W2ah_xDHee0J3ZiA",
  authDomain: "roadrunner-native-web.firebaseapp.com",
  projectId: "roadrunner-native-web",
  storageBucket: "roadrunner-native-web.appspot.com",
  messagingSenderId: "882524352816",
  appId: "1:882524352816:web:48b66b794d07bb4e9718f5",
  measurementId: "G-XS8FYX4VBC"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firebase Storage
export const storage = getStorage(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);

// Initialize Firebase Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize anonymous authentication
let authInitialized = false;
let authPromise: Promise<User> | null = null;

export const initializeAuth = async (): Promise<User> => {
  // Return existing promise if auth is already being initialized
  if (authPromise) {
    return authPromise;
  }

  // Return existing user if already authenticated
  if (authInitialized && auth.currentUser) {
    // Ensure token is fresh
    await auth.currentUser.getIdToken();
    return auth.currentUser;
  }

  // Create new auth promise
  authPromise = new Promise(async (resolve, reject) => {
    try {
      // Check if user is already signed in
      if (auth.currentUser) {
        authInitialized = true;
        // Ensure token is available
        await auth.currentUser.getIdToken();
        resolve(auth.currentUser);
        return;
      }

      // Sign in anonymously
      const userCredential = await signInAnonymously(auth);
      authInitialized = true;
      
      // Ensure the ID token is available before resolving
      // This ensures the token is ready for Storage requests
      await userCredential.user.getIdToken();
      
      resolve(userCredential.user);
    } catch (error: any) {
      authPromise = null; // Reset promise on error so it can be retried
      
      // Provide helpful error messages
      if (error?.code === 'auth/configuration-not-found') {
        console.error(
          '❌ Firebase Anonymous Authentication is not enabled!\n\n' +
          'To fix this:\n' +
          '1. Go to Firebase Console: https://console.firebase.google.com/\n' +
          '2. Select your project: roadrunner-native-web\n' +
          '3. Go to Authentication > Sign-in method\n' +
          '4. Find "Anonymous" in the list\n' +
          '5. Click on it and toggle "Enable"\n' +
          '6. Click "Save"\n'
        );
      } else if (error?.code === 'auth/operation-not-allowed') {
        console.error(
          '❌ Anonymous sign-in is not allowed for this project.\n' +
          'Please enable it in Firebase Console > Authentication > Sign-in method > Anonymous'
        );
      } else {
        console.error('Error signing in anonymously:', error);
      }
      
      reject(error);
    }
  });

  return authPromise;
};

export default app;

