import { useState } from "react";
import { View, Button, Text, Modal,Alert } from "react-native";

export default function App() {
  const [IsModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: "plum", padding: 60 }}>
      <Button
        title="Press"
        onPress={() => setIsModalVisible(true)}
        color="midnightblue"
      />
      <Modal
        visible={IsModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={{ flex: 1, backgroundColor: "fuchsia", padding: 60 }}>
          <Text>modal content</Text>
          <Button
            title="Close"
            onPress={() => setIsModalVisible(false) & alerts()
            }
            color="black"
          />
        </View>
      </Modal>
    </View>
  );
}
function alerts(){
  return(
  Alert.alert("This is how you add two actions"," to a onpress",[
    {
      text:'Cancel',
      onPress: ()=> Alert.alert("Canceled clicked"),
    },
    {
      text:'Ok',
      onPress: ()=> Alert.alert("OK clicked"),
    },
    {
      text:'Submit',
      onPress: ()=> Alert.alert("Submit clicked"),
    },
  ])
  )
};
