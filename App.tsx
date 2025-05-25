import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useInitializeStore } from './src/viewmodels/useCategoryStore';
import { useColorScheme, View, StyleSheet } from 'react-native';
import { DarkTheme as CustomDarkTheme, LightTheme as CustomLightTheme } from './src/theme/theme';
import { ThemeProvider } from './src/theme/ThemeContext';

export default function App() {
  useInitializeStore();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  return (
    <SafeAreaProvider>
      <ThemeProvider value={theme}>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <AppNavigator />
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
