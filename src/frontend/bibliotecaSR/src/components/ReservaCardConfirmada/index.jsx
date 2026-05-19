import { AlertTriangle, Check, Clock } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ReservaCardConfirmada({
  item,
  isExpired,
  isCancellation = false,
  handleConcluir={handleConcluir}
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const getLabelText = () => {
    if (isCancellation) return "Desistiu em:";
    return isExpired ? "Expirou em:" : "Expira em:";
  };

  const useExpiredStyle = isExpired || isCancellation;

  return (
    <View style={styles.cardContainer}>
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
        <Text style={styles.expireLabel}>{getLabelText()}</Text>

        <View
          style={[
            styles.badgeData,
            useExpiredStyle ? styles.badgeExpired : styles.badgeConfirmed,
          ]}
        >
          <Text
            style={[
              styles.dateText,
              useExpiredStyle ? styles.textExpired : styles.textConfirmed,
            ]}
          >
            {isCancellation
              ? formatDate(item.dataAtualizacao)
              : formatDate(item.dataLimiteRetirada)}
          </Text>
        </View>

        {!useExpiredStyle && (
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => handleConcluir(item)}
            activeOpacity={0.7}
          >
            <Check size={14} color="#FFF" />
            <Text style={styles.doneButtonText}>Concluir</Text>
          </TouchableOpacity>
        )}
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
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    flex: 1.8,
    paddingRight: 8,
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 2,
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
    flex: 1.2,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  expireLabel: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "500",
    marginBottom: 4,
  },

  dateText: {
    fontSize: 11,
    fontWeight: "700",
  },

  badgeExpired: {
    backgroundColor: "#f8fafc",
    borderColor: "#cbd5e1",
  },
  textExpired: {
    color: "#64748b",
  },
  doneButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderRadius: 8,
    marginTop: 8,
    gap: 4,
    width: "100%",
  },
  doneButtonText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "bold",
  },
});
