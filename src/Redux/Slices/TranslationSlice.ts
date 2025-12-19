import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  translateText,
  translateBatch,
  detectLanguage,
  getAvailableLanguages,
  SUPPORTED_LANGUAGES,
  LanguageCode,
  Language,
  TranslationResult,
} from '../../Services/TranslationService';

// State interface
export interface TranslationState {
  // Current language settings
  currentLanguage: LanguageCode;
  sourceLanguage: LanguageCode;
  
  // Available languages
  availableLanguages: Language[];
  
  // Translation cache in Redux (persistent across component unmounts)
  translations: Record<string, string>;
  
  // Loading states
  isTranslating: boolean;
  isLoadingLanguages: boolean;
  
  // Error handling
  error: string | null;
  
  // Auto-detect settings
  autoDetectEnabled: boolean;
  detectedLanguage: string | null;
}

// Initial state
const initialState: TranslationState = {
  currentLanguage: 'en',
  sourceLanguage: 'en',
  availableLanguages: Object.values(SUPPORTED_LANGUAGES),
  translations: {},
  isTranslating: false,
  isLoadingLanguages: false,
  error: null,
  autoDetectEnabled: true,
  detectedLanguage: null,
};

// Generate a storage key for a translation
const getTranslationKey = (text: string, targetLang: string): string => {
  // Create a simple hash of the text to keep keys manageable
  const textHash = text.substring(0, 50).replace(/\s+/g, '_');
  return `${targetLang}:${textHash}`;
};

// Async thunk for translating single text
export const translateTextAsync = createAsyncThunk<
  { key: string; result: TranslationResult; originalText: string },
  { text: string; targetLanguage?: LanguageCode; sourceLanguage?: LanguageCode },
  { rejectValue: string }
>(
  'translation/translateText',
  async ({ text, targetLanguage, sourceLanguage }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { translation: TranslationState };
      const target = targetLanguage || state.translation.currentLanguage;
      const source = sourceLanguage || state.translation.sourceLanguage;
      
      const result = await translateText(text, target, source);
      const key = getTranslationKey(text, target);
      
      return { key, result, originalText: text };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Translation failed');
    }
  }
);

// Async thunk for batch translation
export const translateBatchAsync = createAsyncThunk<
  { results: { key: string; result: TranslationResult; originalText: string }[] },
  { texts: string[]; targetLanguage?: LanguageCode; sourceLanguage?: LanguageCode },
  { rejectValue: string }
>(
  'translation/translateBatch',
  async ({ texts, targetLanguage, sourceLanguage }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { translation: TranslationState };
      const target = targetLanguage || state.translation.currentLanguage;
      const source = sourceLanguage || state.translation.sourceLanguage;
      
      const results = await translateBatch(texts, target, source);
      
      return {
        results: results.map((result, index) => ({
          key: getTranslationKey(texts[index], target),
          result,
          originalText: texts[index],
        })),
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Batch translation failed');
    }
  }
);

// Async thunk for language detection
export const detectLanguageAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'translation/detectLanguage',
  async (text, { rejectWithValue }) => {
    try {
      return await detectLanguage(text);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Language detection failed');
    }
  }
);

// Async thunk for fetching available languages
export const fetchAvailableLanguages = createAsyncThunk<
  Language[],
  LanguageCode | undefined,
  { rejectValue: string }
>(
  'translation/fetchAvailableLanguages',
  async (displayLanguage, { rejectWithValue }) => {
    try {
      return await getAvailableLanguages(displayLanguage || 'en');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch languages');
    }
  }
);

// Create the slice
const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    // Set current target language
    setCurrentLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.currentLanguage = action.payload;
      // Clear translations when language changes to force re-translation
      state.translations = {};
    },
    
    // Set source language
    setSourceLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.sourceLanguage = action.payload;
      state.translations = {};
    },
    
    // Toggle auto-detect
    setAutoDetect: (state, action: PayloadAction<boolean>) => {
      state.autoDetectEnabled = action.payload;
    },
    
    // Clear all translations
    clearTranslations: (state) => {
      state.translations = {};
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Add a single translation manually
    addTranslation: (
      state,
      action: PayloadAction<{ key: string; translation: string }>
    ) => {
      state.translations[action.payload.key] = action.payload.translation;
    },
    
    // Reset to initial state
    resetTranslation: () => initialState,
  },
  extraReducers: (builder) => {
    // Handle translateTextAsync
    builder
      .addCase(translateTextAsync.pending, (state) => {
        state.isTranslating = true;
        state.error = null;
      })
      .addCase(translateTextAsync.fulfilled, (state, action) => {
        state.isTranslating = false;
        state.translations[action.payload.key] = action.payload.result.translatedText;
        if (action.payload.result.detectedSourceLanguage) {
          state.detectedLanguage = action.payload.result.detectedSourceLanguage;
        }
      })
      .addCase(translateTextAsync.rejected, (state, action) => {
        state.isTranslating = false;
        state.error = action.payload || 'Translation failed';
      });

    // Handle translateBatchAsync
    builder
      .addCase(translateBatchAsync.pending, (state) => {
        state.isTranslating = true;
        state.error = null;
      })
      .addCase(translateBatchAsync.fulfilled, (state, action) => {
        state.isTranslating = false;
        action.payload.results.forEach(({ key, result }) => {
          state.translations[key] = result.translatedText;
        });
      })
      .addCase(translateBatchAsync.rejected, (state, action) => {
        state.isTranslating = false;
        state.error = action.payload || 'Batch translation failed';
      });

    // Handle detectLanguageAsync
    builder
      .addCase(detectLanguageAsync.fulfilled, (state, action) => {
        state.detectedLanguage = action.payload;
      })
      .addCase(detectLanguageAsync.rejected, (state, action) => {
        state.error = action.payload || 'Language detection failed';
      });

    // Handle fetchAvailableLanguages
    builder
      .addCase(fetchAvailableLanguages.pending, (state) => {
        state.isLoadingLanguages = true;
        state.error = null;
      })
      .addCase(fetchAvailableLanguages.fulfilled, (state, action) => {
        state.isLoadingLanguages = false;
        state.availableLanguages = action.payload;
      })
      .addCase(fetchAvailableLanguages.rejected, (state, action) => {
        state.isLoadingLanguages = false;
        state.error = action.payload || 'Failed to fetch languages';
      });
  },
});

// Export actions
export const {
  setCurrentLanguage,
  setSourceLanguage,
  setAutoDetect,
  clearTranslations,
  clearError,
  addTranslation,
  resetTranslation,
} = translationSlice.actions;

// Export reducer
export default translationSlice.reducer;



































