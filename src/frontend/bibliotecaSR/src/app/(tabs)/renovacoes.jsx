import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RenovaCard from "../../components/RenovaCard/index.jsx";
import { useAuth } from "../../context/authContext";
import api from "../../services/api";

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

  if (loading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#006D77" />
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Em Aberto</Text>
        <View style={styles.limitBadge}>
          <Text style={styles.limitText}>{ativas.length} / 3</Text>
        </View>
      </View>

      {ativas.length > 0 ? (
        ativas.map((item) => (
          <RenovaCard key={item.id} item={item} onRefresh={onRefresh} />
        ))
      ) : (
        <Text style={styles.emptyText}>
          Nenhuma solicitação de renovação ativa no momento.
        </Text>
      )}

      <Text style={[styles.sectionTitle, { marginTop: 30, marginBottom: 15 }]}>
        Histórico
      </Text>
      {historico.length > 0 ? (
        historico.map((item) => (
          <RenovaCard key={item.id} item={item} onRefresh={onRefresh} />
        ))
      ) : (
        <Text style={styles.emptyText}>Seu histórico está vazio.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 22, fontWeight: "bold", color: "#1A1A1A" },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  limitBadge: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  limitText: { fontSize: 12, fontWeight: "bold", color: "#4A5568" },
  emptyText: {
    textAlign: "center",
    color: "#A0AEC0",
    paddingVertical: 20,
    fontStyle: "italic",
  },
});
