import { View,Text, Image } from "react-native";
const backgroundImage = require("./assets/background-image.png")
export default function App(){
 return <View style={{flex: 1, backgroundColor:"plum",padding:10
 }}>
<Image source={backgroundImage} style = {{flex: 1, padding:100}} />
 </View>
}