import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Submitted", username, password);
      setUsername("");
      setPassword("");
      setErrors({});
    }
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <View style={styles.formcontainer}>
        <Image
          source={require("./assets/adaptive-icon.png")}
          style={styles.image}
        />
        <Text style={styles.lable}>user Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your User Name"
          value={username}
          onChangeText={setUsername}
        />
        {errors.username ? 
          <Text style={styles.errorsText}>{errors.username}</Text>
         : null}
        <Text style={styles.lable}>Pass Word</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Pass Word"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {errors.password ? 
          <Text style={styles.errorsText}>{errors.password}</Text>
         : null}
        <Button title="Login" onPress = {handleSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "plum",
  },
  formcontainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 25,
    shadowColor: "black",
    shadowOffset: {
      width: 8,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadiouse: 4,
    elevation: 7,
  },

  lable: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: "center",
    marginBottom: 50,
  },
  errorsText: {
    color: "red",
    marginBottom: 10,
  },
});
