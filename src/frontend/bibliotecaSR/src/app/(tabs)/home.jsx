import {
  AlertCircle,
  CheckCircle2,
  Search
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import ItemCard from "../../components/ItemCard";
import api from "../../services/api";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewItems();
  }, []);

  const getNewItems = async () => {
    try {
      setLoading(false);

      const response = await api.get("/Itens/recentes");

      setItems(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os livros.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
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

        <View style={styles.searchBar}>
          <Search color="#999" size={20} />
          <TextInput
            placeholder="Busca por título"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* NOTIFICAÇÕES */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Notificações</Text>

        <View
          style={[
            styles.alertCard,
            { backgroundColor: "#FFF5F5", borderColor: "#FEB2B2" },
          ]}
        >
          <AlertCircle color="#C53030" size={20} />
          <Text style={styles.alertText}>
            Devolução atrasada: "Cem Anos de Solidão".
          </Text>
        </View>

        <View
          style={[
            styles.alertCard,
            { backgroundColor: "#F0FFF4", borderColor: "#9AE6B4" },
          ]}
        >
          <CheckCircle2 color="#2F855A" size={20} />
          <Text style={styles.alertText}>Reserva pronta: "O Alquimista".</Text>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Novidades do Acervo</Text>
        </View>

        {/* LIVROS RECENTES */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#00875F"
            style={{ marginTop: 20 }}
          />
        ) : (
          items.map((item) => <ItemCard key={item.id} item={item} />)
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFC" },
  headerContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    paddingBottom: 15,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF2F7",
  },
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

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 45,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15 },

  content: { padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 12,
  },
  seeAll: { color: "#00875F", fontWeight: "600" },

  alertCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  alertText: { marginLeft: 10, fontSize: 14, color: "#2D3748", flex: 1 },
});
