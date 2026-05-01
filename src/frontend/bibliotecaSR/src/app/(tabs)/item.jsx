import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  CheckCircle2,
  Hash,
  Info,
  User,
  XCircle,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../services/api";

const categorias = {
  0: "Romance",
  1: "Fantasia",
  2: "Ficção Científica",
  3: "Mistério",
  4: "Terror",
  5: "Distopia",
  6: "Aventura",
  7: "Poesia",
  8: "Biografia",
  9: "História",
  10: "Filosofia",
  11: "Ciências",
  12: "Tecnologia",
  13: "Educação",
  14: "Auto Ajuda",
  15: "Religião",
  16: "Infantil",
  17: "Juvenil",
  18: "Didático",
};

const tipo = {
  0: "Livro",
  1: "Quadrinho",
  2: "Romance Gráfico",
  3: "Mangá",
};

export default function Item() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getItem();
  }, [id]);

  const handleBack = () => {
    // Verificamos se existe histórico para voltar
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Caso o usuário abra o app direto num link, ele vai pra Home
      router.replace("/");
    }
  };

  const getItem = async () => {
    try {
      const response = await api.get(/Itens/${id});
      setItem(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar o item.");
    } finally {
      setLoading(false);
    }
  };

  const handleReserva = () => {
    Alert.alert("Reserva", Botão clicado para reservar "${item.titulo}");
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#004D36" />
        <Text style={{ textAlign: "center", marginTop: 10, color: "#666" }}>
          Carregando detalhes...
        </Text>
      </View>
    );
  }

  if (!item) {
    return (
      <View
        style={[styles.container, { justifyContent: "center", padding: 20 }]}
      >
        <Text style={{ textAlign: "center", color: "#666" }}>
          Item não encontrado.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 20, alignSelf: "center" }}
        >
          <Text style={{ color: "#004D36", fontWeight: "bold" }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft color="#004D36" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Item</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoSection}>
          <Text style={styles.title}>{item.titulo}</Text>
          <View style={styles.authorRow}>
            <User size={20} color="#004D36" />
            <Text style={styles.authorText}>{item.autor}</Text>
          </View>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{tipo[item.tipo] || "Item"}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: "#E0EAE5" }]}>
              <Text style={[styles.badgeText, { color: "#004D36" }]}>
                {categorias[item.categoria]}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.detailItem}>
            <Bookmark size={16} color="#666" />
            <Text style={styles.detailLabel}>Editora:</Text>
            <Text style={styles.detailValue}>{item.editora}</Text>
          </View>
          <View style={styles.detailItem}>
            <Hash size={16} color="#666" />
            <Text style={styles.detailLabel}>ISBN:</Text>
            <Text style={styles.detailValue}>{item.isbn}</Text>
          </View>
          <View style={styles.detailItem}>
            <Calendar size={16} color="#666" />
            <Text style={styles.detailLabel}>Cadastrado em:</Text>
            <Text style={styles.detailValue}>
              {new Date(item.dataCadastro).toLocaleDateString("pt-BR")}
            </Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Disponibilidade no Acervo</Text>

          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Total</Text>
              <Text style={styles.statusValue}>{item.totalExemplares}</Text>
            </View>
            <View style={styles.dividerV} />
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Disponíveis</Text>
              <Text
                style={[
                  styles.statusValue,
                  { color: item.disponiveis > 0 ? "#00875F" : "#853030" },
                ]}
              >
                {item.disponiveis}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.noteBox}>
          <Info size={20} color="#666" />
          <Text style={styles.noteText}>
            A reserva garante a retirada do item por até 48 horas após a
            confirmação.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.reserveButton,
            item.disponiveis === 0 && styles.disabledButton,
          ]}
          onPress={handleReserva}
          disabled={item.disponiveis === 0}
        >
          {item.disponiveis > 0 ? (
            <CheckCircle2 color="#FFF" size={20} style={{ marginRight: 8 }} />
          ) : (
            <XCircle color="#FFF" size={20} style={{ marginRight: 8 }} />
          )}
          <Text style={styles.reserveButtonText}>
            {item.disponiveis > 0 ? "Solicitar Reserva" : "Indisponível"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
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

  infoSection: { marginBottom: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 10,
  },
  authorRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  authorText: { fontSize: 18, color: "#444", marginLeft: 8, fontWeight: "500" },

  badgeRow: { flexDirection: "row", gap: 10 },
  badge: {
    backgroundColor: "#004D36",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: { color: "#FFF", fontSize: 13, fontWeight: "bold" },

  detailsCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  detailItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  detailLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginLeft: 8,
    marginRight: 5,
  },
  detailValue: { fontSize: 14, color: "#333" },

  statusCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  statusTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#888",
    marginBottom: 15,
    textTransform: "uppercase",
    textAlign: "center",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statusItem: { alignItems: "center" },
  statusLabel: { fontSize: 13, color: "#666", marginBottom: 5 },
  statusValue: { fontSize: 24, fontWeight: "bold", color: "#333" },
  dividerV: { width: 1, height: 40, backgroundColor: "#EEE" },

  noteBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#E9ECEF",
    borderRadius: 10,
  },
  noteText: {
    marginLeft: 10,
    fontSize: 13,
    color: "#555",
    flex: 1,
    lineHeight: 18,
  },

  footer: {
    padding: 20,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  reserveButton: {
    backgroundColor: "#004D36",
    padding: 18,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: { backgroundColor: "#A0A0A0" },
  reserveButtonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});