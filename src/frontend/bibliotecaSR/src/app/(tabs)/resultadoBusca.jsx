import { useLocalSearchParams, useNavigation } from "expo-router";
import { ChevronLeft, Search } from "lucide-react-native";
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft color="#1A1A1A" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resultados</Text>
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
    paddingTop: 20, 
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#1A1A1A" },
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