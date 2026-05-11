import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function Header() {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.header}>
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <Image
            source={require("../../../assets/logo_bibilioteca.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>Biblioteca Arthur Riedel</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  row: { flexDirection: "row", alignItems: "center" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoText: { fontSize: 18, fontWeight: "bold", color: "#2D3748" },
  logo: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
});
