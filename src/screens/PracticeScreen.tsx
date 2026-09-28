/**
 * Temporary practice screen for Cursor Cloud runtime testing.
 * Swap back to NewAppScreen in App.tsx to restore the original launch UI.
 *
 * @format
 */

import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type PracticeScreenProps = {
  onPressCard?: () => void;
};

function PracticeScreen({onPressCard}: PracticeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 24,
        },
      ]}>
      <Text style={styles.title} accessibilityRole="header">
        Practice Screen
      </Text>
      <Text style={styles.subtitle}>Cursor Cloud Test</Text>

      <Pressable
        accessibilityRole="button"
        onPress={onPressCard}
        style={({pressed}) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
        <Text style={styles.cardTitle}>Practice Card</Text>
        <Text style={styles.cardBody}>
          This temporary screen confirms the Cloud app startup flow is wired
          correctly.
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F766E',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#CCFBF1',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  cardPressed: {
    opacity: 0.9,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#134E4A',
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 15,
    lineHeight: 22,
    color: '#115E59',
  },
});

export default PracticeScreen;
