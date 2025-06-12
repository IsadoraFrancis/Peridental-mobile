import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Hello } from "./app/Hello";
import { Login } from "./app/Login";
import { Home } from "./app/Home";
import { AddCase } from "./app/AddCase";
import { AddEvidence } from "./app/AddEvidence";
import { Access } from "./app/Access";
import { Profile } from "./app/Access/Profile";
import { RegisterUser } from "./app/Access/RegisterUser";
import { CaseDetails } from "./app/CaseDetails";
import { AuthProvider } from "./contexts/AuthContext";
import { AddPatient } from "./app/AddPatient";
import { Patient } from "./app/Patient";
import { Patient as PatientType } from "@/types/patient"; // Adicionar esta importação
import { AllPatients } from "./app/Patient/AllPatients";
import { Dashboard } from "./app/Dashboard";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Hello: undefined;
  Login: undefined;
  Home: undefined;
  AddCase: undefined;
  AddEvidence: undefined;
  Access: undefined;
  RegisterUser: undefined;
  Profile: {
    user: {
      id: string;
      name: string;
      role: string;
      email: string;
      isActive: boolean;
      avatar?: string;
    };
  };
  CaseDetails: undefined;
  Patient: undefined;
  AddPatient: {
    caseId?: string;
  };
  AllPatients: undefined;
  Dashboard: undefined;
  PatientDetails: { patient: PatientType };
};

export function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Hello" component={Hello} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddCase" component={AddCase} />
          <Stack.Screen name="AddEvidence" component={AddEvidence} />
          <Stack.Screen name="Access" component={Access} />
          <Stack.Screen name="RegisterUser" component={RegisterUser} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="CaseDetails" component={CaseDetails} />
          <Stack.Screen name="Patient" component={Patient} />
          <Stack.Screen name="AddPatient" component={AddPatient} />
          <Stack.Screen name="AllPatients" component={AllPatients} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
