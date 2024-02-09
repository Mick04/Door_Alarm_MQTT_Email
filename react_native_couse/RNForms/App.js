import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useState } from "react";
export default function App() {
  const [name, setName] = useState("");
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
      <Text style={styles.text}>My name is {name}</Text>
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
});
