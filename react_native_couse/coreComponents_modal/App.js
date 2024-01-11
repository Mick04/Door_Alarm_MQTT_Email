import { useState } from "react";
import { View, Button, Text, Modal } from "react-native";

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
        <View style={{ flex: 1, backgroundColor: "lightblue", padding: 60 }}>
          <Text>modal content</Text>
          <Button
            title="Close"
            onPress={() => setIsModalVisible(false)}
            color="midnightblue"
          />
        </View>
      </Modal>
    </View>
  );
}
