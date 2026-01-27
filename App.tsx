import { RootNavigation } from './navigation';
import { StatusBar } from 'expo-status-bar';
import { initStore } from './redux/init';
import { Provider } from 'react-redux';
import { GestureHandlerRootView, gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppRegistry, Text, TextInput } from 'react-native';
import { expo } from './app.json';
import {
  useFonts,
  SourceSans3_400Regular,
  SourceSans3_600SemiBold,
} from '@expo-google-fonts/source-sans-3';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

// Set default font for all Text components
const originalTextRender = (Text as any).render;
(Text as any).render = function (props: any, ref: any) {
  return originalTextRender.call(this, { ...props, style: [{ fontFamily: 'SourceSans3_400Regular' }, props.style] }, ref);
};

// Set default font for all TextInput components
const originalTextInputRender = (TextInput as any).render;
(TextInput as any).render = function (props: any, ref: any) {
  return originalTextInputRender.call(this, { ...props, style: [{ fontFamily: 'SourceSans3_400Regular' }, props.style] }, ref);
};

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
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigation />
          <StatusBar style="dark" />
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
}
