import {
  SourceSans3_400Regular,
  SourceSans3_600SemiBold,
  useFonts,
} from '@expo-google-fonts/source-sans-3';
import 'expo-dev-client';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { AppRegistry } from 'react-native';
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { expo } from './app.json';
import { LanguageProvider } from './contexts/LanguageContext';
import { RootNavigation } from './navigation';
import { initStore } from './redux/init';

// Suppress Reanimated strict mode warning from bottom-sheet library
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

export default function App() {
  AppRegistry.registerComponent(expo.name, () => gestureHandlerRootHOC(App));

  const { store } = initStore();

  const [fontsLoaded] = useFonts({
    SourceSans3_400Regular,
    SourceSans3_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <Provider store={store}>
        <LanguageProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootNavigation />
            <StatusBar style="dark" />
          </GestureHandlerRootView>
        </LanguageProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
