import 'react-native-reanimated';
import { AppProvider } from './src/context/AppProvider';
// redux 
import { store } from './src/store/store'
import { Provider } from 'react-redux';
// persistor 
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react';
import AppRoot from './ AppRoot';
let persistor = persistStore(store)
function App() {
  return (
    <AppProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppRoot />
        </PersistGate>
      </Provider>
    </AppProvider>
  );
}
export default App;
