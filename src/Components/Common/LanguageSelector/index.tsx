import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import { useTranslation } from '../../../Hooks/useTranslation';
import { LanguageCode } from '../../../Services/TranslationService';
import Theme from '../../../Config/Theme';

interface LanguageSelectorProps {
  /** Show native language names (e.g., "Español" instead of "Spanish") */
  showNativeNames?: boolean;
  /** Custom button style */
  buttonStyle?: object;
  /** Custom text style */
  textStyle?: object;
  /** Dropdown or modal mode */
  mode?: 'dropdown' | 'modal';
  /** Callback when language changes */
  onLanguageChange?: (language: LanguageCode) => void;
  /** Show loading indicator when translating */
  showLoadingIndicator?: boolean;
  /** Compact mode - just shows language code */
  compact?: boolean;
}

/**
 * LanguageSelector Component
 * 
 * A dropdown/modal selector for changing the app's display language.
 * Integrates with the translation system to provide real-time language switching.
 * 
 * Usage:
 * ```tsx
 * <LanguageSelector mode="dropdown" showNativeNames />
 * ```
 */
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  showNativeNames = true,
  buttonStyle,
  textStyle,
  mode = 'modal',
  onLanguageChange,
  showLoadingIndicator = true,
  compact = false,
}) => {
  const {
    currentLanguage,
    availableLanguages,
    setLanguage,
    isTranslating,
    currentLanguageInfo,
    SUPPORTED_LANGUAGES,
  } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  // Filter to only show supported languages
  const displayLanguages = useMemo(() => {
    const supportedCodes = Object.keys(SUPPORTED_LANGUAGES);
    return availableLanguages.filter(lang => 
      supportedCodes.includes(lang.code)
    );
  }, [availableLanguages, SUPPORTED_LANGUAGES]);

  const handleSelect = useCallback(
    (language: LanguageCode) => {
      setLanguage(language);
      setIsOpen(false);
      onLanguageChange?.(language);
    },
    [setLanguage, onLanguageChange]
  );

  const displayName = useMemo(() => {
    if (compact) {
      return currentLanguage.toUpperCase();
    }
    return showNativeNames
      ? currentLanguageInfo.nativeName
      : currentLanguageInfo.name;
  }, [compact, showNativeNames, currentLanguageInfo, currentLanguage]);

  const renderButton = () => (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={() => setIsOpen(!isOpen)}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {showLoadingIndicator && isTranslating ? '...' : displayName}
      </Text>
      <Text style={[styles.arrow, textStyle]}>
        {isOpen ? '▲' : '▼'}
      </Text>
    </TouchableOpacity>
  );

  const renderLanguageItem = ({ item }: { item: typeof displayLanguages[0] }) => {
    const isSelected = item.code === currentLanguage;
    const itemDisplayName = showNativeNames ? item.nativeName : item.name;

    return (
      <TouchableOpacity
        style={[
          styles.listItem,
          isSelected && styles.listItemSelected,
        ]}
        onPress={() => handleSelect(item.code as LanguageCode)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.listItemText,
            isSelected && styles.listItemTextSelected,
          ]}
        >
          {itemDisplayName}
        </Text>
        {isSelected && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </TouchableOpacity>
    );
  };

  // Modal mode - full screen overlay
  if (mode === 'modal') {
    return (
      <View>
        {renderButton()}
        <Modal
          visible={isOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsOpen(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsOpen(false)}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Language</Text>
                <TouchableOpacity onPress={() => setIsOpen(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={displayLanguages}
                renderItem={renderLanguageItem}
                keyExtractor={(item) => item.code}
                style={styles.list}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }

  // Dropdown mode - inline dropdown (web-friendly)
  return (
    <View style={styles.dropdownContainer}>
      {renderButton()}
      {isOpen && (
        <View style={styles.dropdown}>
          <FlatList
            data={displayLanguages}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.code}
            style={styles.dropdownList}
            showsVerticalScrollIndicator={true}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Theme.primary || '#1a1a2e',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.maize || '#f0c14b',
    gap: 8,
  },
  buttonText: {
    color: Theme.maize || '#f0c14b',
    fontSize: 14,
    fontWeight: '600',
  },
  arrow: {
    color: Theme.maize || '#f0c14b',
    fontSize: 10,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginTop: 4,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
      },
    }),
    maxHeight: 250,
    minWidth: 180,
    overflow: 'hidden',
  },
  dropdownList: {
    maxHeight: 250,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  closeButton: {
    fontSize: 20,
    color: '#666',
    padding: 4,
  },
  list: {
    paddingVertical: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  listItemSelected: {
    backgroundColor: 'rgba(240, 193, 75, 0.1)',
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
  },
  listItemTextSelected: {
    fontWeight: '600',
    color: Theme.primary || '#1a1a2e',
  },
  checkmark: {
    fontSize: 16,
    color: Theme.primary || '#1a1a2e',
    fontWeight: '600',
  },
});

export default LanguageSelector;

































