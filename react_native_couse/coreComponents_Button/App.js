import { StatusBar } from "expo-status-bar";
import { View, Button } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "plum", padding: 60 }}>
      <Button
        title="Press"
        onPress={() => console.log("Pressed")}
        color="midnightblue"
      />
    </View>
  );
}
