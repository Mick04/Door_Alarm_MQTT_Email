import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TextInput,
  Switch,
} from "react-native";
import { useState } from "react";
export default function App() {
  const [name, setName] = useState("");
  const [isDarkMode, setisDarkMode] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="mick03@gmail.com"
        value={name}
        onChangeText={setName}
        autoCorrect={false}
        autoCapitalize="none"
        // secureTextEntry
        // keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, styles.multilineText]}
        placeholder="Message"
        multiline
      />
      <Text style={styles.text}>My name is {name}</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.text}>Dark mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setisDarkMode((previousState) => !previousState)}
    
          trackColor={{ false: "green", true: "red" }}
          thumbColor= "orange"
          ios_backgroundColor="lightgreen" 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: StatusBar.currentHeight,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
  text: {
    fontSize: 30,
    padding: 10,
  },
  multilineText: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
