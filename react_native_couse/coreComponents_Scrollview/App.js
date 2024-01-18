import { View, Text, Image, ScrollView,Button, Pressable } from "react-native";
const logoimg = require("./assets/play-button-icon.png");

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "plum", padding: 40 }}>
      <ScrollView>
      <Button
        title="Press"
        onPress={() => console.log("Pressed")}
        color="midnightblue"
      />
      <Pressable onPress={() => console.log("image Pressed")}>
        <Image source={logoimg} style={{ width: 100, height: 100 }} />
        </Pressable>
        <Pressable onLongPress={() => console.log("Text Pressed")}>
        <Text>
          {" "}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          fugit repellat laudantium, cum temporibus vero. Maxime magni unde
          sequi quam, facere incidunt eius aspernatur minima consequatur quae
          quod consectetur repellat corrupti mollitia alias modi ad quas.
          Deserunt est consequuntur doloribus saepe sunt ipsa enim quasi eum.
          Temporibus possimus natus aperiam sint dignissimos sit dicta culpa
          minus distinctio consequuntur quidem excepturi neque iusto animi
          debitis, expedita eveniet porro. Quia optio dolore dicta. Repudiandae
          ex, ipsum tempora nemo praesentium nulla voluptas fugiat aut! Natus
          blanditiis rem dignissimos quo asperiores, vitae consequatur sunt
          doloremque voluptatum, doloribus libero voluptatibus, architecto
          excepturi amet. Accusamus, fugit?
        </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
