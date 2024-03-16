import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
    return (
      <View style={styles.container}>
        <Text>Hello SCREEN 3!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'hotpink',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });