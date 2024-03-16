import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
    return (
      <View style={styles.container}>
        <Text>Hello SCREEN 4!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'palegreen',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });