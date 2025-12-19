import React, { useEffect, useState } from 'react';
import { Text, TextProps, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useTranslation } from '../../../Hooks/useTranslation';
import Theme from '../../../Config/Theme';

interface TranslatableTextProps extends TextProps {
  /** The text to translate */
  children: string;
  /** Show loading indicator while translating */
  showLoading?: boolean;
  /** Custom loading component */
  loadingComponent?: React.ReactNode;
  /** Callback when translation completes */
  onTranslated?: (translatedText: string) => void;
  /** Skip translation (use original text) */
  skipTranslation?: boolean;
}

/**
 * TranslatableText Component
 * 
 * A drop-in replacement for React Native's Text component that automatically
 * translates its content based on the current language setting.
 * 
 * Usage:
 * ```tsx
 * <TranslatableText style={{ fontSize: 16 }}>
 *   Hello World
 * </TranslatableText>
 * ```
 * 
 * The text will automatically be translated when the language changes.
 */
export const TranslatableText: React.FC<TranslatableTextProps> = ({
  children,
  showLoading = false,
  loadingComponent,
  onTranslated,
  skipTranslation = false,
  style,
  ...textProps
}) => {
  const { t, currentLanguage, sourceLanguage, getCached, isCached } = useTranslation();
  const [translatedText, setTranslatedText] = useState<string>(children);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Skip translation if disabled or same language
    if (skipTranslation || currentLanguage === sourceLanguage) {
      setTranslatedText(children);
      return;
    }

    // Check cache first for instant display
    if (isCached(children)) {
      const cached = getCached(children);
      setTranslatedText(cached);
      onTranslated?.(cached);
      return;
    }

    // Perform translation
    const translateContent = async () => {
      setIsLoading(true);
      try {
        const result = await t(children);
        setTranslatedText(result);
        onTranslated?.(result);
      } catch {
        // Keep original text on error
        setTranslatedText(children);
      } finally {
        setIsLoading(false);
      }
    };

    translateContent();
  }, [children, currentLanguage, sourceLanguage, skipTranslation]);

  // Show loading indicator if requested
  if (isLoading && showLoading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={Theme.primary} />
      </View>
    );
  }

  return (
    <Text style={style} {...textProps}>
      {translatedText}
    </Text>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 20,
  },
});

export default TranslatableText;



































