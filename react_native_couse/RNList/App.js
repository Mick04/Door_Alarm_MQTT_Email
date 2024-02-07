import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  SectionList,
} from "react-native";
import pokemonList from "./data.json";
import groupedPokemonList from "./grouped-data.json";
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* I
         <ScrollView style={styles.scrollView}>
          {pokemonList.map((pokemon) => {
            return (
              <View style={styles.card} key={pokemon.id}>
                <Text style={styles.cardText}>{pokemon.type} </Text>
                <Text style={styles.cardText}>{pokemon.name} </Text>
              </View>
            );
          })}
        </ScrollView> 
         */}

      {/**********************************************
       *     use this method for a static Header    *
       *       or use line 55 for a Header that     *
       *             moves with the list            *
       **********************************************/}

      {/* <View>
        <Text style={styles.headerText}> Pokemon List</Text>
      </View>  */}

      {/***************************************************/}
{/*
      <FlatList
        data={pokemonList} //comment out and uncomment out line below
        // data={[]}       //to demmonstrate the ListEmptyComponent prop
        renderItem={({ item }) => {
          return (
            <View style={styles.card} key={item.id}>
              <Text style={styles.cardText}>{item.type} </Text>
              <Text style={styles.cardText}>{item.name} </Text>
            </View>
          );
        }}
        // horizontal
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={<View style={{ height: 16 }} />}
        ListEmptyComponent={<Text style={styles.cardText}>No items found</Text>}
        /***********************************************
         *  use this method if you want the header to  *
         *             move with the list              *
         ***********************************************/}
{/*
        ListHeaderComponent={
          <Text style={styles.headerText}> Pokemon List</Text>
        }
        {/**********************************************
         ***********************************************/}
{/*
        ListFooterComponent={
          <Text style={styles.footerText}> End of list</Text>
        }
      />
      */}
      <SectionList
sections={groupedPokemonList}
  renderItem={({item}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardText}>{item} </Text> 
      </View>
    )
  }}
  renderSectionHeader={({
    section
  }) => (
    <Text style={styles.sectionHesderText}>{section.type}</Text>
  )}
  ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
  SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    // marginBottom: 16,
  },
  cardText: {
    fontSize: 30,
    textAlign: "center",
  },
  headerText: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 30,
  },
  footerText: {
    textAlign: "center",
    fontSize: 24,
    marginTop: 12,
  },
  sectionHesderText:{
    backgroundColor: "white",
    fontSize: 24,
    fontWeight:"bold",
  }
});
