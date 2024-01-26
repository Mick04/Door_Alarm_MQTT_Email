import { StyleSheet, View, Text, useWindowDimensions,SafeAreaView } from "react-native";

export default function App() {
  const windowWidth = useWindowDimensions().width;
  const windowHight = useWindowDimensions().height;

  return (
    <SafeAreaView style={styles.safeContainer}>
    <View style={styles.container}>
      <View
        style={[
          styles.box,
          {
            width: windowWidth > 500 ? "70%" : "90%",
            height: windowHight > 600 ? "60%" : "90%",
          },
        ]}
      >
        <Text style={{fontSize: windowWidth > 500 ? 50 : 24,}}>Wellcome!</Text>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "plum",
  },
  container: {
    flex: 1,
    backgroundColor: "plum",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    // width: windowWidth > 500 ? "70%" : "90%",
    // height: windowHight > 600 ? "60%" : "90%",
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
});
