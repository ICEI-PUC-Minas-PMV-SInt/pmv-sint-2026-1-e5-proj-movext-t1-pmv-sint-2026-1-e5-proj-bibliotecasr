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

export default function ReservaCardPendente({
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
          <Text style={styles.userName} numberOfLines={1}>
            {item.usuario?.nome}
          </Text>
          <Text style={styles.bookTitle}>{item.item?.titulo}</Text>
          <Text style={styles.bookAuthor} numberOfLines={1}>
            {item.item?.autor}
          </Text>
        </View>

        <View style={styles.dateTimeContainer}>
          <Calendar size={12} color="#64748b" />
          <Text style={styles.dateText}>
            {formatDate(item.dataSolicitacao)}
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
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#dbeafe",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 13,
  },
  infoContainer: {
    flex: 1,
    paddingRight: 4,
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 1,
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
