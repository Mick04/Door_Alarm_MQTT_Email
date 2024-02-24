import { View, Text, Button, StyleSheet } from "react-native";
// i should put more comments in
export default function AboutScreen({ navigation, route }) {
    const { name } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My name is  {name} </Text>
      <Button
         title="Go to Home"
         onPress={() => navigation.navigate("Home",{ name:"Mick" })}
       />
        <Text></Text>
       <Button 
        title="Update the name" onPress={() => navigation.setParams({name:"Kath"})}
       />
 <Text></Text>

       <Button
       title="Go back with new data"
       onPress={() => navigation.navigate ("Home",{result:"Data from about"}) }/>
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