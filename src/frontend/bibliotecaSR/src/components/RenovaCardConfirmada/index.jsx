
import {
  StyleSheet,
  Text,
  View
} from "react-native";

export default function RenovaCardConfirmada({ item, naoEfetivada = false }) {
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
      </View>

      <View style={styles.loanDetailsContainer}>
        <View style={styles.loanDetailColumn}>
          <Text style={styles.loanDetailLabel}>
            {naoEfetivada ? "Solicitado em:" : "Retirado em:"}
          </Text>
          <Text style={styles.loanDetailValue}>
            {naoEfetivada
              ? formatDate(item.dataSolicitacao || item.dataRetirada)
              : formatDate(item.dataRetirada)}
          </Text>
        </View>

        <View style={styles.loanDetailColumn}>
          <Text
            style={[
              styles.loanDetailLabel,
              naoEfetivada && { color: "#94a3b8" },
            ]}
          >
            {naoEfetivada ? "Não efetivado em:" : "Renovado em:"}
          </Text>
          <Text
            style={[
              styles.loanDetailValue,
              naoEfetivada && { color: "#ef4444", fontWeight: "600" },
            ]}
          >
            {formatDate(item.dataAtualizacao)}
          </Text>
        </View>
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
