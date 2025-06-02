import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Hello } from "./app/Hello";
import { Login } from "./app/Login";
import { Home } from "./app/Home";
import { AddCase } from "./app/AddCase";

const Stack = createNativeStackNavigator();

export function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Hello" component={Hello} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddCase" component={AddCase} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
