import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../../features/home/screens/HomeScreen";
import { ProdutoScreen } from "../../features/produtos/screens/ProdutoScreen";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CalculadoraScreen } from "../../features/calculadora/screens/CalculadoraScreen";
const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "#2341f0",
              headerTitleStyle: {
                fontWeight: "bold",
                color: "#2341f0",
              },
            }}
          >
            <Stack.Screen name=" " component={HomeScreen} />
            <Stack.Screen name="cadastro" component={ProdutoScreen} />
            <Stack.Screen name="calculadora" component={CalculadoraScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </>
  );
}
