import AppNavigation from './src/navigation/AppNavigation';
import 'react-native-reanimated';
import { AppProvider } from './src/context/AppProvider';
// redux 
import { store } from './src/store/store'
import { Provider } from 'react-redux';
// persistor 
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react';
let persistor = persistStore(store)

function App() {      
  return (
    <AppProvider>
      <Provider store={store}>
        <PersistGate persistor ={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    </AppProvider>
  );
}


export default App;
