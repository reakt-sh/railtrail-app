import { RootNavigation } from './navigation';
import { StatusBar } from 'expo-status-bar';
import { initStore } from './redux/init';
import { Provider } from 'react-redux';
import { GestureHandlerRootView, gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppRegistry } from 'react-native';
import { expo } from './app.json';
import { Color } from './values';

export default function App() {
  AppRegistry.registerComponent(expo.name, () => gestureHandlerRootHOC(App));

  const { store } = initStore();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.backgroundLight }}>
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootNavigation />
            <StatusBar style="dark" />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
