import { View, Text, StyleSheet } from "react-native";

export default function box({children, style}) {
  return (
    <View style={[styles.box, style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {

    backgroundColor: "#fff",
    padding: 30,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});
