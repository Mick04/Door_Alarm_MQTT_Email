import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [postList, setpostList] = useState([]);
  const [isLoading,setisLoading] = useState(true);
  const [refreshing,setRefreshing] = useState(false);

  const fetchData = async (limit = 10) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
    );
    const data = await response.json();
    setpostList(data);
    setisLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true)
    fetchData(20)
    setRefreshing(false)
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading){
    return(
      <SafeAreaView style={styles.LoadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading</Text>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={postList}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <Text style={styles.titleText}>{item.title} </Text>
                <Text style={styles.bodyeText}>{item.body} </Text>
              </View>
            )
          }}
          // keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          ListEmptyComponent={<Text>No Posts Found</Text>}
          ListHeaderComponent={<Text style={styles.headerText}>Post List</Text>}
          ListFooterComponent={
            <Text style={styles.footerText}>End of list</Text>
          }
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#666666",
    padding: StatusBar.currentHeight,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
  titleText: {
    fontSize: 24,
  },
  bodyeText: {
    fontSize: 14,
    color: "#666666",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12,
  },
  footerText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12,
  },
  LoadingContainer:{
    flex:1,
    backgroundColor:"#f5f5f5",
    padding:StatusBar.currentHeight,
    justifyContent:"center",
    alignItems:"center",
  }
});

