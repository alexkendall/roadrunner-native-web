import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/Store';
import {
  setCurrentLanguage,
  setSourceLanguage,
  translateTextAsync,
  translateBatchAsync,
  detectLanguageAsync,
  fetchAvailableLanguages,
  clearTranslations,
  clearError,
} from '../Redux/Slices/TranslationSlice';
import { LanguageCode, SUPPORTED_LANGUAGES } from '../Services/TranslationService';
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

/**
 * Custom hook for translation functionality
 * 
 * Usage:
 * ```tsx
 * const { t, currentLanguage, setLanguage, isTranslating } = useTranslation();
 * 
 * // Simple translation
 * const translated = await t('Hello World');
 * 
 * // Change language
 * setLanguage('es');
 * ```
 */
export const useTranslation = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Select translation state from Redux
  const {
    currentLanguage,
    sourceLanguage,
    availableLanguages,
    translations,
    isTranslating,
    isLoadingLanguages,
    error,
    autoDetectEnabled,
    detectedLanguage,
  } = useSelector((state: RootState) => state.translation);

  // Load available languages on mount
  useEffect(() => {
    if (availableLanguages.length <= Object.keys(SUPPORTED_LANGUAGES).length) {
      dispatch(fetchAvailableLanguages(currentLanguage));
    }
  }, []);

  /**
   * Translate a single text string
   * Returns the translated text or original text if translation fails
   */
  const translate = useCallback(
    async (text: string, targetLang?: LanguageCode): Promise<string> => {
      const target = targetLang || currentLanguage;
      
      // Return original if translating to source language
      if (target === sourceLanguage) {
        return text;
      }

      // Check if we already have this translation cached
      const cacheKey = `${target}:${text.substring(0, 50).replace(/\s+/g, '_')}`;
      if (translations[cacheKey]) {
        return translations[cacheKey];
      }

      try {
        const result = await dispatch(
          translateTextAsync({ text, targetLanguage: target })
        ).unwrap();
        return result.result.translatedText;
      } catch {
        return text; // Return original on error
      }
    },
    [dispatch, currentLanguage, sourceLanguage, translations]
  );

  /**
   * Shorthand alias for translate function
   */
  const t = translate;

  /**
   * Translate multiple texts at once (more efficient for batch operations)
   */
  const translateMany = useCallback(
    async (texts: string[], targetLang?: LanguageCode): Promise<string[]> => {
      const target = targetLang || currentLanguage;
      
      if (target === sourceLanguage) {
        return texts;
      }

      try {
        const result = await dispatch(
          translateBatchAsync({ texts, targetLanguage: target })
        ).unwrap();
        return result.results.map(r => r.result.translatedText);
      } catch {
        return texts; // Return originals on error
      }
    },
    [dispatch, currentLanguage, sourceLanguage]
  );

  /**
   * Get a cached translation synchronously (returns original if not cached)
   */
  const getCached = useCallback(
    (text: string, targetLang?: LanguageCode): string => {
      const target = targetLang || currentLanguage;
      const cacheKey = `${target}:${text.substring(0, 50).replace(/\s+/g, '_')}`;
      return translations[cacheKey] || text;
    },
    [currentLanguage, translations]
  );

  /**
   * Check if a translation is cached
   */
  const isCached = useCallback(
    (text: string, targetLang?: LanguageCode): boolean => {
      const target = targetLang || currentLanguage;
      const cacheKey = `${target}:${text.substring(0, 50).replace(/\s+/g, '_')}`;
      return !!translations[cacheKey];
    },
    [currentLanguage, translations]
  );

  /**
   * Set the current display language
   */
  const setLanguage = useCallback(
    (language: LanguageCode) => {
      dispatch(setCurrentLanguage(language));
    },
    [dispatch]
  );

  /**
   * Set the source language (language of original content)
   */
  const setSource = useCallback(
    (language: LanguageCode) => {
      dispatch(setSourceLanguage(language));
    },
    [dispatch]
  );

  /**
   * Detect the language of a text
   */
  const detectLang = useCallback(
    async (text: string): Promise<string> => {
      try {
        return await dispatch(detectLanguageAsync(text)).unwrap();
      } catch {
        return 'en';
      }
    },
    [dispatch]
  );

  /**
   * Clear all cached translations
   */
  const clearCache = useCallback(() => {
    dispatch(clearTranslations());
  }, [dispatch]);

  /**
   * Clear any error state
   */
  const dismissError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  /**
   * Get language info by code
   */
  const getLanguageInfo = useCallback(
    (code: LanguageCode) => {
      return (
        availableLanguages.find(lang => lang.code === code) ||
        SUPPORTED_LANGUAGES[code] ||
        { code, name: code, nativeName: code }
      );
    },
    [availableLanguages]
  );

  /**
   * Current language info object
   */
  const currentLanguageInfo = useMemo(
    () => getLanguageInfo(currentLanguage),
    [currentLanguage, getLanguageInfo]
  );

  return {
    // Translation functions
    t,
    translate,
    translateMany,
    getCached,
    isCached,
    detectLang,
    
    // Language settings
    currentLanguage,
    sourceLanguage,
    setLanguage,
    setSource,
    
    // Language info
    availableLanguages,
    currentLanguageInfo,
    getLanguageInfo,
    
    // State
    isTranslating,
    isLoadingLanguages,
    error,
    autoDetectEnabled,
    detectedLanguage,
    
    // Utilities
    clearCache,
    dismissError,
    
    // Constants
    SUPPORTED_LANGUAGES,
  };
};

export default useTranslation;

























