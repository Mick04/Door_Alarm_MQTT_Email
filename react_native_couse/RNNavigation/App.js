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
        <Stack.Screen name="Home" component={HomeScreen}
         options={{
          title:"Home", // this is the header title
       headerStyle:{ backgroundColor: "red"},
       headerTintColor:"#fff",
       headerTitleStyle:{fontWeight:"bold"}
        }} />
        <Stack.Screen 
          name="About"
          component={AboutScreen}
          options={{
          title:"About", // this is the header title
       headerStyle:{ backgroundColor: "#6c54ba"},
       headerTintColor:"#fff",
       headerTitleStyle:{fontWeight:"bold"}
        }}
          initialParams={{ name: "guest" }}
        />
        <Stack.Screen
          name="Heater"
          component={HeaterScreen}   
          options={{
          title:"Tortoise Heater", // this is the header title
       headerStyle:{ backgroundColor: "#FcF4aa"},
       headerTintColor:"#fff",
       headerTitleStyle:{fontWeight:"bold",color:"black"}
        }}
          initialParams={{ name: "Mick" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
