import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  User as UserIcon,
  XCircle,
} from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/authContext";
import api from "../../services/api";

const statusConfig = {
  0: { label: "Em Análise", color: "#E29578", icon: Clock },
  1: { label: "Cancelada", color: "#E63946", icon: XCircle },
  2: { label: "Aprovada", color: "#006D77", icon: CheckCircle2 },
  3: { label: "Não Efetivada", color: "#8D99AE", icon: AlertTriangle },
  4: { label: "Concluída", color: "#2B2D42", icon: BookOpen },
};

export default function Renovaçoes() {
  const { user } = useAuth();
  const [ativas, setAtivas] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRenovacoes = async () => {
    try {
      const response = await api.get(`/usuarios/${user.id}/renovacoes`);
      const data = response.data;

      // abertas: em análise (0)
      setAtivas(data.filter((r) => r.status === 0));
      // histórico: o resto
      setHistorico(data.filter((r) => r.status !== 0));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as renovações.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRenovacoes();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRenovacoes();
  }, []);

  const handleCancelar = (id) => {
    Alert.alert(
      "Cancelar Renovação",
      "Deseja realmente cancelar esta solicitação?",
      [
        { text: "Voltar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: async () => {
            try {
              await api.put(`/renovacoes/${id}/cancelar`);
              fetchRenovacoes();
            } catch (error) {
              Alert.alert("Erro", error.response?.data || "Erro ao cancelar.");
            }
          },
        },
      ],
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const RenovaCard = ({ item }) => {
    const config = statusConfig[item.status];
    const Icon = config.icon;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: config.color + "15" },
            ]}
          >
            <Icon size={14} color={config.color} />
            <Text style={[styles.statusText, { color: config.color }]}>
              {config.label}
            </Text>
          </View>
          <Text style={styles.idText}>#{item.id}</Text>
        </View>

        <Text style={styles.bookTitle}>{item.titulo}</Text>

        <View style={styles.authorRow}>
          <UserIcon size={14} color="#666" />
          <Text style={styles.authorText}>{item.autor}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <View>
            <Text style={styles.dateLabel}>Solicitado em</Text>
            <Text style={styles.dateValue}>
              {formatDate(item.dataSolicitacao)}
            </Text>
          </View>

          {item.status === 0 && (
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => handleCancelar(item.id)}
            >
              <Text style={styles.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#006D77" />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.mainTitle}>Minhas Renovações</Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Em Aberto</Text>
          <View style={styles.limitBadge}>
            <Text style={styles.limitText}>{ativas.length} / 3</Text>
          </View>
        </View>

        {ativas.length > 0 ? (
          ativas.map((item) => <RenovaCard key={item.id} item={item} />)
        ) : (
          <Text style={styles.emptyText}>
            Nenhuma renovação ativa no momento.
          </Text>
        )}

        <Text
          style={[styles.sectionTitle, { marginTop: 30, marginBottom: 15 }]}
        >
          Histórico
        </Text>
        {historico.length > 0 ? (
          historico.map((item) => <RenovaCard key={item.id} item={item} />)
        ) : (
          <Text style={styles.emptyText}>Seu histórico está vazio.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  scrollContent: { padding: 20 },
  mainTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#4A5568" },
  limitBadge: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  limitText: { fontSize: 12, fontWeight: "bold", color: "#4A5568" },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: { fontSize: 11, fontWeight: "800", textTransform: "uppercase" },
  idText: { fontSize: 12, color: "#CBD5E0", fontWeight: "600" },
  bookTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 4,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 12,
  },
  authorText: { fontSize: 14, color: "#718096" },
  divider: { h: 1, backgroundColor: "#EDF2F7", marginVertical: 12 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 10,
    color: "#A0AEC0",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  dateValue: { fontSize: 13, color: "#4A5568", fontWeight: "600" },
  cancelBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E63946",
  },
  cancelBtnText: { color: "#E63946", fontSize: 12, fontWeight: "700" },
  emptyText: {
    textAlign: "center",
    color: "#A0AEC0",
    paddingVertical: 20,
    fontStyle: "italic",
  },
});
