import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={[styles.box,styles.lightBlueBg]}>
        <Text>Light Blue Box</Text>
      </View>
      {/* <View>
        <Text> </Text>
      </View> */}
      <View style={[styles.box,styles.lightGreenBg]}>
        <Text>Light Green Box</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f",
    padding: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 100,
    height: 100,
    padding: 10,
  },
  lightBlueBg: {
    backgroundColor: "lightblue",
    margin: 10,
  },
  lightGreenBg: {
    backgroundColor: "lightgreen",
  },
});
