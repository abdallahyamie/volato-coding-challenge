import { SafeAreaProvider } from 'react-native-safe-area-context';
import CalculatorScreen from './screens/Calculator.screen';

export default function App() {
  return (
    <SafeAreaProvider>
      <CalculatorScreen />
    </SafeAreaProvider>
  );
}
