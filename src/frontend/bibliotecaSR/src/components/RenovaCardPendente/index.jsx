import { Bookmark, CheckCircle2, XCircle, Calendar } from "lucide-react-native";
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
import api from "../../services/api.js";

export default function RenovaCardPendente({
  item,
  handleConfirmar,
  handleNaoEfetivar,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.mainRow}>
        <View style={styles.infoContainer}>
          <Text style={styles.loanBadgeText}>
            Código Empréstimo: {item.emprestimo}
          </Text>

          <Text style={styles.userName} numberOfLines={1}>
            {item.nome}
          </Text>

          <Text style={styles.bookTitle}>{item.titulo}</Text>
          <Text style={styles.bookAuthor} numberOfLines={1}>
            {item.autor}
          </Text>
        </View>

        <View style={styles.dateTimeContainer}>
          <Calendar size={12} color="#64748b" />
          <Text style={styles.dateText}>
            {formatDate(item.dataSolicitacao)}
          </Text>
        </View>
      </View>

      <View style={styles.loanDetailsContainer}>
        <View style={styles.loanDetailColumn}>
          <Text style={styles.loanDetailLabel}>Retirado em:</Text>
          <Text style={styles.loanDetailValue}>
            {formatDate(item.dataRetirada)}
          </Text>
        </View>

        <View style={styles.loanDetailColumn}>
          <Text style={styles.loanDetailLabel}>Devolução Prevista</Text>
          <Text style={styles.loanDetailValue}>
            {formatDate(item.dataPrevistaDevolucao)}
          </Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.btnReject]}
          onPress={() => handleNaoEfetivar(item)}
          activeOpacity={0.7}
        >
          <XCircle size={15} color="#ef4444" />
          <Text style={[styles.btnText, { color: "#ef4444" }]}>
            Não efetivar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.btnConfirm]}
          onPress={() => handleConfirmar(item)}
          activeOpacity={0.7}
        >
          <CheckCircle2 size={15} color="#166534" />
          <Text style={[styles.btnText, { color: "#166534" }]}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  loanBadge: {
    backgroundColor: "#eff6ff",
    borderColor: "#bfdbfe",
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  loanBadgeText: {
    fontSize: 14,
    color: "#1e40af",
    fontWeight: "700",
  },
  infoContainer: {
    flex: 1,
    paddingRight: 4,
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1e293b",
    maxWidth: "70%",
  },
  bookTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#475569",
  },
  bookAuthor: {
    fontSize: 12,
    color: "#94a3b8",
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#f1f5f9",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  dateText: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "600",
  },
  loanDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  loanDetailColumn: {
    flex: 1,
  },
  loanDetailLabel: {
    fontSize: 10,
    color: "#64748b",
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: 2,
  },
  loanDetailValue: {
    fontSize: 12,
    color: "#334155",
    fontWeight: "500",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 9,
  },
  btnConfirm: {
    borderColor: "#bbf7d0",
    backgroundColor: "#f0fdf4",
  },
  btnReject: {
    borderColor: "#fecaca",
    backgroundColor: "#fef2f2",
  },
  btnText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
