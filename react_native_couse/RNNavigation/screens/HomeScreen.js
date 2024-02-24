import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Text style={styles.text}>{route.params?.result}</Text>
      <Button
         title="Go to About"
         onPress={() => navigation.navigate("About")}
       />
        <Text></Text>
      <Button
         title="Go to Heater"
         onPress={() => navigation.navigate("Heater")}
       />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color:"red",
    // margin: 10,
  },

});







// import React from "react";
// import { View, Text, Button, StyleSheet } from "react-native";

// export default function HomeScreen({ navigation, route }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Home Screen</Text>
//       <Button
//         title="Go to About"
//         onPress={() => navigation.navigate("About", { name: "Vishwas" })}
//       />
//       <Text style={styles.text}>Result: {route.params?.result}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
// });