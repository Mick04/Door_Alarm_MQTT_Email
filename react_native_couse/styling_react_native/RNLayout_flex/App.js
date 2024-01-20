import { StyleSheet, View } from "react-native";
import Box from "./components/Box";
export default function App() {
  return (
    <View style={styles.container}>
      <Box style={{ backgroundColor: "#8e9b00", alignSelf: "flex-start" }}>
        Box1
      </Box>
      <Box style={{ backgroundColor: "#b65d1f", alignSelf: "flex-end" }}>
        Box2
      </Box>
      <Box style={{ backgroundColor: "#1c4c56", alignSelf: "center" }}>
        Box3
      </Box>
      <Box style={{ backgroundColor: "#ab9156", alignSelf: "stretch" }}>
        Box4
      </Box>
      {/* if no alignSelf is used it inerits the property from the parent
       if there's no alignItem asigned to the parent then the defalt
       stretch is is used */}
      <Box style={{ backgroundColor: "#6b0803" }}>Box5</Box>
      <Box style={{ backgroundColor: "#1c4c56" }}>Box6</Box>
      <Box style={{ backgroundColor: "#b95f21" }}>Box7</Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 64,
    borderWidth: 20,
    borderColor: "green",
  },
});
