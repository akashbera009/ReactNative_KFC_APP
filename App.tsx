import AppNavigation from './src/navigation/AppNavigation';
import 'react-native-reanimated';
import { AppProvider } from './src/context/AppProvider';
// redux 
import { store } from './src/store/store'
import { Provider } from 'react-redux';
// google sign in 
import { GoogleSignin} from '@react-native-google-signin/google-signin';
// persistor 
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react';
let persistor = persistStore(store)

function App() {    
  GoogleSignin.configure({
    iosClientId: "857311075920-em3gq4d9vhpjelvkq4plmgsv4e5oj617.apps.googleusercontent.com" ,
    webClientId : '857311075920-63nas97d4t9op4i0ctteq42v7g12rc5p.apps.googleusercontent.com' ,
  })  
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
