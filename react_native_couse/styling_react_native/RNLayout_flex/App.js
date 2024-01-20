import { StyleSheet, View } from "react-native";
import Box from "./components/Box";
export default function App() {
  return (
    <View style={styles.container}>
      <Box style={{ backgroundColor: "#8e9b00", paddingVertical: 200 }}>
        Box1
      </Box>
      <Box style={{ backgroundColor: "#b65d1f" }}>Box2</Box>
      <Box style={{ backgroundColor: "#1c4c56" }}>Box3</Box>
      {/* <Box style={{ backgroundColor: "#ab9156", flex: 4 }}>Box4</Box>
      <Box style={{ backgroundColor: "#6b0803", flex: 1 }}>Box5</Box>
      <Box style={{ backgroundColor: "#1c4c56", flex: 1 }}>Box6</Box>
      <Box style={{ backgroundColor: "#b95f21", flex: 1 }}>Box7</Box> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   // flex: 1,
    flexDirection: "row",
    // justifyContent: "flex-start",
    // justifyContent: "flex-end",
    // justifyContent: "center",
    // justifyContent: "space-between",
    // justifyContent: "space-around",
    // justifyContent: "space-evenly",
    // alignItems:"stretch",// defalt
    // alignItems:"flex-start",
    // alignItems:"flex-end",
    // alignItems:"center",
    alignItems: "baseline",
    marginTop: 64,
    borderWidth: 20,
    borderColor: "green",
  },
});
