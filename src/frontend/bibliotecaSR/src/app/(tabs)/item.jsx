import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Item() {
  const { id } = useLocalSearchParams();
  console.log("Clicou no livro:", id);

  return (
    <View style={styles.container} >
      <Text style={styles.text}>🎉 pagina do livro {id}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, fontWeight: "bold" },
});
