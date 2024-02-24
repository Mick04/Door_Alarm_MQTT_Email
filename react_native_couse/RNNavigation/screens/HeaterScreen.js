import { View, Text, Button, StyleSheet } from "react-native";

export default function AboutScreen({ navigation, route }) {
    const { name } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}> My name is {name} </Text>
      <Button
         title="Go to Home"
         onPress={() => navigation.navigate("Home")}
       />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color:"red",
  },
});