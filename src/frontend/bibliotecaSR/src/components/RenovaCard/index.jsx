import { User as UserIcon } from "lucide-react-native";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import { statusRenovacao } from "../../utils/statusRenovacao.js";

export default function RenovaCard({ item, onRefresh }) {
  const config = statusRenovacao[item.status];
  const Icon = config.icon;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleCancelar = (id) => {
    Alert.alert(
      "Cancelar Reserva",
      "Deseja realmente cancelar esta solicitação?",
      [
        { text: "Voltar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: async () => {
            try {
              await api.put(`/renovacoes/${id}/cancelar`);
              onRefresh();
            } catch (error) {
              Alert.alert("Erro", error.response?.data || "Erro ao cancelar.");
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View
          style={[styles.statusBadge, { backgroundColor: config.color + "15" }]}
        >
          <Icon size={14} color={config.color} />
          <Text style={[styles.statusText, { color: config.color }]}>
            {config.label}
          </Text>
        </View>
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

        {(item.status === 0 || item.status === 2) && (
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
});
