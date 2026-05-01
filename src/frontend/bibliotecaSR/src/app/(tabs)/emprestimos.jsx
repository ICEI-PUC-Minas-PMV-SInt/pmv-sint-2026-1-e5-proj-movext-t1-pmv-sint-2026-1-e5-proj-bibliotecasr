import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import EmprestimoCard from "../../components/EmprestimoCard";
import { useAuth } from "../../context/authContext";
import api from "../../services/api";

export default function Emprestimos() {
  const { user } = useAuth();
  const [ativos, setAtivos] = useState([]);
  const [finalizados, setFinalizados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmprestimos();
  }, []);

  const getEmprestimos = async () => {
    try {
      const response = await api.get(`/usuarios/${user.id}/emprestimos`);
      const emAberto = response.data.filter((e) => e.status === 0);
      const concluidos = response.data.filter(
        (e) => e.status === 1 || e.status === 2,
      );

      setAtivos(emAberto);
      setFinalizados(concluidos);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os emprestimos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitleHeader}>Meus Empréstimos</Text>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Em Aberto</Text>
          <View style={styles.limitBadge}>
            <Text style={styles.limitText}>{ativos.length} / 3 </Text>
          </View>
        </View>

        {ativos.length > 0 ? (
          ativos.map((item) => (
            <EmprestimoCard key={item.id} emprestimo={item} />
          ))
        ) : (
          <Text style={styles.emptyText}>
            Nenhum empréstimo ativo no momento.
          </Text>
        )}

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: "#666" }]}>
            Histórico
          </Text>
        </View>

        {finalizados.length > 0 ? (
          finalizados.map((item) => (
            <EmprestimoCard key={item.id} emprestimo={item} />
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhum histórico encontrado.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", paddingHorizontal: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  sectionTitleHeader: { fontSize: 24, fontWeight: "bold", color: "#1A1A1A" },

  sectionTitle: { fontSize: 22, fontWeight: "bold", color: "#1A1A1A" },
  limitBadge: {
    backgroundColor: "#F1F3F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  limitText: { color: "#666", fontSize: 14, fontWeight: "500" },
  listContent: { paddingBottom: 100 },
  emptyText: { textAlign: "center", marginTop: 50, color: "#999" },
});
