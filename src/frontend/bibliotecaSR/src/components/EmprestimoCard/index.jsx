import { Calendar, Clock, Info, RefreshCw } from "lucide-react-native";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EmprestimoCard({ emprestimo }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleRenova = () => {
    Alert.alert(
      "Confirmar Renovação",
      `Deseja solicitar a renovação de "${emprestimo.titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Renovar",
          onPress: async () => {
            try {
              const response = await api.post(`/renovacoes/${emprestimo.id}`);

              Alert.alert(
                "Sucesso!",
                "Sua renovação foi solicitada e está em análise.",
              );
            } catch (error) {
              if (error.response) {
                const mensagem = error.response.data;
                Alert.alert("Atenção", mensagem);
              } else {
                console.error("Erro crítico:", error);
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
              }
            }
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.card, emprestimo.estaAtrasado && styles.cardLate]}>
      <Text style={styles.title}>{emprestimo.titulo}</Text>
      <Text style={styles.author}>{emprestimo.autor}</Text>

      <View style={styles.datesContainer}>
        <View style={styles.dateBlock}>
          <Text style={styles.dateLabel}>RETIRADA</Text>
          <View style={styles.dateRow}>
            <Clock size={14} color="#666" />
            <Text style={styles.dateText}>
              {formatDate(emprestimo.dataRetirada)}
            </Text>
          </View>
        </View>

        <View style={styles.dateBlock}>
          <Text
            style={[
              styles.dateLabel,
              emprestimo.estaAtrasado && { color: "#C53030" },
            ]}
          >
            DEVOLUÇÃO
          </Text>
          <View style={styles.dateRow}>
            <Calendar
              size={14}
              color={emprestimo.estaAtrasado ? "#C53030" : "#666"}
            />
            <Text
              style={[
                styles.dateText,
                emprestimo.estaAtrasado && {
                  color: "#C53030",
                  fontWeight: "bold",
                },
              ]}
            >
              {formatDate(emprestimo.dataPrevistaDevolucao)}
            </Text>
          </View>
        </View>
      </View>

      {emprestimo.status === 0 ? (
        emprestimo.estaAtrasado ? (
          // Se está atrasado
          <View style={styles.lateBadge}>
            <Info size={16} color="#C53030" />
            <Text style={styles.lateText}>Atrasado</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.renewButton} onPress={handleRenova}>
            <RefreshCw size={16} color="#00875F" />
            <Text style={styles.renewText}>Renovar</Text>
          </TouchableOpacity>
        )
      ) : (
        // Se já foi devolvido
        <View style={styles.finishedBadge}>
          <Text style={styles.finishedText}>Devolvido</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  title: { fontSize: 20, fontWeight: "800", color: "#1A1A1A" },
  author: { fontSize: 16, color: "#666", marginBottom: 20 },
  datesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateBlock: {
    backgroundColor: "#F8F9FA",
    padding: 12,
    borderRadius: 8,
    width: "48%",
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ADB5BD",
    marginBottom: 4,
  },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  dateText: { fontSize: 13, color: "#444", fontWeight: "500" },
  renewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "#00875F",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    gap: 8,
  },
  renewText: { color: "#00875F", fontWeight: "bold", fontSize: 14 },
  finishedBadge: {
    alignSelf: "flex-end",
    backgroundColor: "#F1F3F5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  finishedText: {
    color: "#6C757D",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardLate: {
    borderColor: "#FEB2B2", // Borda levemente avermelhada
    backgroundColor: "#FFF5F5", // Fundo sutilmente rosado para destacar o erro
  },
  lateBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#FED7D7",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: "#FEB2B2",
  },
  lateText: {
    color: "#C53030",
    fontSize: 13,
    fontWeight: "bold",
  },
});
