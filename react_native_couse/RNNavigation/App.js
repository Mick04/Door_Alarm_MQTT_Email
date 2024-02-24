import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import HeaterScreen from "./screens/HeaterScreen";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          initialParams={{ name: "guest" }}
        />
        <Stack.Screen
          name="Heater"
          component={HeaterScreen}
          initialParams={{ name: "Mick" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
