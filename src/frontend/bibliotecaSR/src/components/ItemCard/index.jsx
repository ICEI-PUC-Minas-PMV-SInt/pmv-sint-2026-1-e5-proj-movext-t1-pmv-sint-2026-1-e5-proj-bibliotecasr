import { useRouter } from "expo-router";
import { ArrowRight, Book } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ItemCard({ item }) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/item",
      params: { id: item.id },
    });
  };
  return (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.itemIconContainer}>
        <Book color="#00875F" size={24} />
      </View>

      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.titulo}</Text>
        <Text style={styles.itemAuthor} numberOfLines={1}>
          {item.autor}
        </Text>
        <Text style={styles.itemAuthor} numberOfLines={1}>
          {item.editora}
        </Text>
      </View>

      <ArrowRight color="#CCC" size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  itemIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#F0FFF4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: "bold", color: "#2D3748" },
  itemAuthor: { fontSize: 13, color: "#718096", marginTop: 2 },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 6,
  },
  statusText: { fontSize: 11, fontWeight: "bold" },
});
