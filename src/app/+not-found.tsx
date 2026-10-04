import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page introuvable' }} />
      <ThemedView style={styles.container}>
        <ThemedText variant="h2">Page introuvable</ThemedText>
        <ThemedText variant="caption" style={styles.description}>
          L'écran que vous recherchez n'existe pas ou a été déplacé.
        </ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText variant="link">Retourner à l'accueil</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  description: {
    textAlign: 'center',
  },
  link: {
    marginTop: 16,
    paddingVertical: 8,
  },
});
