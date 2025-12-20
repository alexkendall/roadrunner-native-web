/**
 * Translation Configuration
 * 
 * Configure the Cloud Translate API settings for your application.
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Enable Cloud Translation API:
 *    - Go to https://console.cloud.google.com/apis/library/translate.googleapis.com
 *    - Select your project (or create one)
 *    - Click "Enable"
 * 
 * 2. Create API Credentials:
 *    - Go to https://console.cloud.google.com/apis/credentials
 *    - Click "Create Credentials" > "API Key"
 *    - Copy the generated API key
 *    - (Recommended) Restrict the key to "Cloud Translation API" only
 *    - (Recommended) Add HTTP referrer restrictions for production
 * 
 * 3. Set Environment Variable:
 *    - Create a .env file in your project root (if not exists)
 *    - Add: EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY=your_api_key_here
 *    - Restart the development server
 * 
 * 4. (Optional) For Production Security:
 *    Consider using a Firebase Cloud Function as a proxy to hide your API key:
 *    - Create a Cloud Function that calls the Translation API
 *    - Call your Cloud Function from the frontend instead
 */

import { LanguageCode } from '../Services/TranslationService';

export interface TranslationConfig {
  /** Default language for the app */
  defaultLanguage: LanguageCode;
  
  /** Language of the original content */
  sourceLanguage: LanguageCode;
  
  /** Languages to show in the language selector */
  enabledLanguages: LanguageCode[];
  
  /** Cache translations in AsyncStorage for offline access */
  enableOfflineCache: boolean;
  
  /** Maximum number of cached translations */
  maxCacheSize: number;
  
  /** Auto-detect user's preferred language from device */
  autoDetectUserLanguage: boolean;
}

const translationConfig: TranslationConfig = {
  // Default display language
  defaultLanguage: 'en',
  
  // Original content language (helps API translate more accurately)
  sourceLanguage: 'en',
  
  // Languages available in the selector
  // Add or remove languages based on your needs
  enabledLanguages: [
    'en',  // English
    'es',  // Spanish
    'fr',  // French
    'de',  // German
    'it',  // Italian
    'pt',  // Portuguese
    'ja',  // Japanese
    'ko',  // Korean
    'zh',  // Chinese (Simplified)
    'ar',  // Arabic
    'hi',  // Hindi
    'ru',  // Russian
  ],
  
  // Enable offline caching (requires expo-async-storage)
  enableOfflineCache: false,
  
  // Maximum translations to cache
  maxCacheSize: 500,
  
  // Try to detect user's language from device settings
  autoDetectUserLanguage: true,
};

export default translationConfig;

/**
 * Helper to check if API key is configured
 */
export const isTranslationConfigured = (): boolean => {
  return !!process.env.EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
};

/**
 * Get the API key (for debugging only - don't expose in production)
 */
export const getTranslationApiKeyStatus = (): string => {
  const key = process.env.EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
  if (!key) {
    return 'NOT_CONFIGURED';
  }
  // Show only first 8 characters for security
  return `CONFIGURED (${key.substring(0, 8)}...)`;
};





































