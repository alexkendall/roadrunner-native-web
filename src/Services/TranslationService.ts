/**
 * TranslationService - Google Cloud Translate API Integration
 * 
 * This service provides translation functionality using Google Cloud Translation API.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Enable Cloud Translation API in Google Cloud Console:
 *    https://console.cloud.google.com/apis/library/translate.googleapis.com
 * 
 * 2. Create an API key:
 *    - Go to APIs & Services > Credentials
 *    - Click "Create Credentials" > "API Key"
 *    - Optionally restrict the key to Cloud Translation API
 * 
 * 3. Add the API key to your environment:
 *    - Create/update .env file in project root
 *    - Add: EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY=your_api_key
 * 
 * 4. For production, consider using API key restrictions:
 *    - HTTP referrer restrictions for web
 *    - Or use a Firebase Cloud Function as a proxy
 */

// Supported languages - add more as needed
export const SUPPORTED_LANGUAGES = {
  en: { code: 'en', name: 'English', nativeName: 'English' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français' },
  de: { code: 'de', name: 'German', nativeName: 'Deutsch' },
  it: { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  ko: { code: 'ko', name: 'Korean', nativeName: '한국어' },
  zh: { code: 'zh', name: 'Chinese (Simplified)', nativeName: '中文' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский' },
} as const;

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES;

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface TranslationResult {
  translatedText: string;
  detectedSourceLanguage?: string;
}

export interface TranslationError {
  code: string;
  message: string;
}

// Cache for translations to avoid redundant API calls
const translationCache = new Map<string, string>();

// Generate cache key
const getCacheKey = (text: string, targetLang: string, sourceLang?: string): string => {
  return `${sourceLang || 'auto'}:${targetLang}:${text}`;
};

/**
 * Get the API key from environment
 */
const getApiKey = (): string => {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
  
  if (!apiKey) {
    console.warn(
      '⚠️ Google Translate API key not configured!\n\n' +
      'To set up translation:\n' +
      '1. Enable Cloud Translation API in Google Cloud Console\n' +
      '2. Create an API key in APIs & Services > Credentials\n' +
      '3. Add EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY=your_key to your .env file\n' +
      '4. Restart the development server\n'
    );
    return '';
  }
  
  return apiKey;
};

/**
 * Translate a single text string
 * 
 * @param text - Text to translate
 * @param targetLanguage - Target language code (e.g., 'es', 'fr')
 * @param sourceLanguage - Optional source language code (auto-detected if not provided)
 * @returns Promise with translated text and detected source language
 */
export const translateText = async (
  text: string,
  targetLanguage: LanguageCode,
  sourceLanguage?: LanguageCode
): Promise<TranslationResult> => {
  // Return original text if translating to same language
  if (sourceLanguage === targetLanguage) {
    return { translatedText: text };
  }

  // Check cache first
  const cacheKey = getCacheKey(text, targetLanguage, sourceLanguage);
  const cachedTranslation = translationCache.get(cacheKey);
  if (cachedTranslation) {
    return { translatedText: cachedTranslation };
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    // Return original text if no API key is configured
    return { translatedText: text };
  }

  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    const body: Record<string, string | string[]> = {
      q: text,
      target: targetLanguage,
      format: 'text',
    };
    
    if (sourceLanguage) {
      body.source = sourceLanguage;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const translation = data.data.translations[0];
    
    // Cache the result
    translationCache.set(cacheKey, translation.translatedText);
    
    return {
      translatedText: translation.translatedText,
      detectedSourceLanguage: translation.detectedSourceLanguage,
    };
  } catch (error: any) {
    console.error('Translation error:', error);
    
    // Return original text on error to prevent app from breaking
    return { translatedText: text };
  }
};

/**
 * Translate multiple texts in a single API call (more efficient)
 * 
 * @param texts - Array of texts to translate
 * @param targetLanguage - Target language code
 * @param sourceLanguage - Optional source language code
 * @returns Promise with array of translated texts
 */
export const translateBatch = async (
  texts: string[],
  targetLanguage: LanguageCode,
  sourceLanguage?: LanguageCode
): Promise<TranslationResult[]> => {
  // Return original texts if translating to same language
  if (sourceLanguage === targetLanguage) {
    return texts.map(text => ({ translatedText: text }));
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return texts.map(text => ({ translatedText: text }));
  }

  // Check which texts need translation (not in cache)
  const uncachedIndices: number[] = [];
  const results: TranslationResult[] = [];
  
  texts.forEach((text, index) => {
    const cacheKey = getCacheKey(text, targetLanguage, sourceLanguage);
    const cached = translationCache.get(cacheKey);
    if (cached) {
      results[index] = { translatedText: cached };
    } else {
      uncachedIndices.push(index);
    }
  });

  // If all texts are cached, return early
  if (uncachedIndices.length === 0) {
    return results;
  }

  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    const textsToTranslate = uncachedIndices.map(i => texts[i]);
    
    const body: Record<string, string | string[]> = {
      q: textsToTranslate,
      target: targetLanguage,
      format: 'text',
    };
    
    if (sourceLanguage) {
      body.source = sourceLanguage;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const translations = data.data.translations;

    // Map results back to original indices and cache
    uncachedIndices.forEach((originalIndex, translationIndex) => {
      const translation = translations[translationIndex];
      const text = texts[originalIndex];
      const cacheKey = getCacheKey(text, targetLanguage, sourceLanguage);
      
      translationCache.set(cacheKey, translation.translatedText);
      
      results[originalIndex] = {
        translatedText: translation.translatedText,
        detectedSourceLanguage: translation.detectedSourceLanguage,
      };
    });

    return results;
  } catch (error: any) {
    console.error('Batch translation error:', error);
    
    // Return original texts for any that weren't cached
    uncachedIndices.forEach(index => {
      if (!results[index]) {
        results[index] = { translatedText: texts[index] };
      }
    });
    
    return results;
  }
};

/**
 * Detect the language of a text
 * 
 * @param text - Text to analyze
 * @returns Promise with detected language code
 */
export const detectLanguage = async (text: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return 'en'; // Default to English if no API key
  }

  try {
    const url = `https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.detections[0][0].language;
  } catch (error) {
    console.error('Language detection error:', error);
    return 'en'; // Default to English on error
  }
};

/**
 * Get list of available languages from API
 * 
 * @param displayLanguage - Language code for display names (e.g., 'en' for English names)
 * @returns Promise with array of available languages
 */
export const getAvailableLanguages = async (
  displayLanguage: LanguageCode = 'en'
): Promise<Language[]> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    // Return supported languages if no API key
    return Object.values(SUPPORTED_LANGUAGES);
  }

  try {
    const url = `https://translation.googleapis.com/language/translate/v2/languages?key=${apiKey}&target=${displayLanguage}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.languages.map((lang: { language: string; name: string }) => ({
      code: lang.language,
      name: lang.name,
      nativeName: lang.name, // API doesn't provide native names
    }));
  } catch (error) {
    console.error('Error fetching available languages:', error);
    return Object.values(SUPPORTED_LANGUAGES);
  }
};

/**
 * Clear the translation cache
 */
export const clearTranslationCache = (): void => {
  translationCache.clear();
};

/**
 * Get cache statistics for debugging
 */
export const getCacheStats = (): { size: number; entries: string[] } => {
  return {
    size: translationCache.size,
    entries: Array.from(translationCache.keys()),
  };
};

export default {
  translateText,
  translateBatch,
  detectLanguage,
  getAvailableLanguages,
  clearTranslationCache,
  getCacheStats,
  SUPPORTED_LANGUAGES,
};























