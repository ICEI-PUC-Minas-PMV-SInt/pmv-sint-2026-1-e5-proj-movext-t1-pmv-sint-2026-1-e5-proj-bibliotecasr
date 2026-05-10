import { LogOut } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAuth } from "../../context/authContext";

export default function Header() {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleSignOut = () => {
    Alert.alert("Sair do App", "Tem certeza que deseja encerrar sua sessão?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", onPress: () => signOut(), style: "destructive" },
    ]);
  };

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
        <LogOut color="#64748b" size={24} onPress={handleSignOut} />
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
