import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { ChevronLeft, Search, ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ItemCard from "../../components/ItemCard";
import api from "../../services/api";

export default function ResultadoBusca() {
  const { query } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/Itens?titulo=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.replace("/");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft color="#004D36" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resultados da busca</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subTitle}>
          Buscando por: <Text style={{ fontWeight: "bold" }}>"{query}"</Text>
        </Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#00875F"
            style={{ marginTop: 50 }}
          />
        ) : results.length > 0 ? (
          results.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <View style={styles.emptyContainer}>
            <Search color="#CCC" size={50} />
            <Text style={styles.emptyText}>
              Nenhum item encontrado com esse tÃ­tulo.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  backButton: { padding: 8, marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#004D36" },
  scrollContent: { padding: 20 },
  subTitle: { fontSize: 16, color: "#666", marginBottom: 20 },
  emptyContainer: { alignItems: "center", marginTop: 100 },
  emptyText: {
    color: "#999",
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
  },
});
