import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  useWindowDimensions,
} from "react-native";

import CustomButton from "./components/CustomButton/CustomButton";

export default function App() {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={[styles.text, { fontSize: width > 500 ? 50 : 24 }]}>
            Welcome
          </Text>
          <CustomButton title="Press Me" onPress={() => alert("Pressed!")} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "plum",
    paddingTop: Platform.OS === "android" ? 45 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "plum",
  },
  box: {
    flex: 1,
    padding: 20,
  },
  text: {
    ...Platform.select({
      ios: {
        color: "purple",
        fontWeight: "bold",
      },
      android: {
        color: "blue",
        fontStyle: "italic",
        textAlign: "center",
      },
    }),

    textAlign: "center",
  },
});
