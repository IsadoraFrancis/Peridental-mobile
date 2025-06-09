import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Hello } from "./app/Hello";
import { Login } from "./app/Login";
import { Home } from "./app/Home";
import { AddCase } from "./app/AddCase";
import { AddEvidence } from "./app/AddEvidence";
import { Access } from "./app/Access";
import { Profile } from "./app/Access/Profile";
import { CaseDetails } from "./app/CaseDetails";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Hello: undefined;
  Login: undefined;
  Home: undefined;
  AddCase: undefined;
  AddEvidence: undefined;
  Access: undefined;
  Profile: { user: { id: string; name: string; role: string; avatar: string } };
};

export function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Hello" component={Hello} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddCase" component={AddCase} />
        <Stack.Screen name="AddEvidence" component={AddEvidence} />
        <Stack.Screen name="Access" component={Access} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="CaseDetails" component={CaseDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
