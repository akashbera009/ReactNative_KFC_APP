import AppNavigation from './src/navigation/AppNavigation';
import 'react-native-reanimated';
import { AppProvider } from './src/context/AppProvider';

function App() {
  return (
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  );
}


export default App;
