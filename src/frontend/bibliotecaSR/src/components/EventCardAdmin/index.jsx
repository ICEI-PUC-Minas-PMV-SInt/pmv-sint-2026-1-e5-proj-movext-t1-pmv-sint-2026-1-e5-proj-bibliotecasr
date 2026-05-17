import {
  Calendar as CalendarIcon,
  Clock,
  Pencil,
  Trash2,
} from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";

export default function EventCard({ event, handleDelete }) {
  if (event.categoria === 0) {
    return (
      <View style={styles.readingCard}>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() => Alert.alert("Editar")}
            style={styles.actionButton}
          >
            <Pencil size={16} color="#004D36" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(event)}
            style={styles.actionButton}
          >
            <Trash2 size={16} color="#853030" />
          </TouchableOpacity>
        </View>

        <View style={styles.readingInfo}>
          <Text style={styles.readingTag}>{event.titulo}</Text>
          <Text style={styles.bookTitle}>{event.livroDoMes}</Text>
          <Text style={styles.bookAuthor}>{event.autor}</Text>
          <View style={styles.dateTimeRow}>
            <CalendarIcon size={14} color="#666" />
            <Text style={styles.dateTimeText}>
              {event.data} às {event.hora}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.clubCard, { borderLeftColor: "#004D36" }]}>
      <View style={[styles.dayBadge]}>
        <Text style={styles.dayText}>{event.nomeDia}</Text>
      </View>

      <View style={styles.clubInfo}>
        <Text style={styles.clubTitle}>{event.titulo}</Text>
        <View style={styles.timeRow}>
          <Clock size={14} color="#666" />
          <Text style={styles.timeText}>{event.hora}</Text>
        </View>

        <View style={[styles.actionContainer, styles.actionContainerClub]}>
          <TouchableOpacity
            onPress={() => Alert.alert("Editar")}
            style={styles.actionButton}
          >
            <Pencil size={16} color="#004D36" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(event)}
            style={styles.actionButton}
          >
            <Trash2 size={16} color="#853030" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  readingCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    elevation: 2,
    position: "relative",
  },
  readingInfo: {
    paddingRight: 60,
  },
  readingTag: {
    color: "#853030",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 4,
  },
  bookTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  bookAuthor: { fontSize: 14, color: "#666", marginBottom: 8 },
  dateTimeRow: { flexDirection: "row", alignItems: "center" },
  dateTimeText: { marginLeft: 6, fontSize: 13, color: "#666" },
  clubCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 12,
    overflow: "hidden",
    borderLeftWidth: 6,
    elevation: 1,
  },
  dayBadge: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
  },
  dayText: {
    backgroundColor: "#004D36",
    padding: 8,
    borderRadius: 8,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  clubInfo: { flex: 1, paddingVertical: 12, justifyContent: "center" },
  clubTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  timeRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  timeText: { marginLeft: 4, fontSize: 13, color: "#666" },
  actionContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 12,
    right: 12,
    gap: 8,
    zIndex: 10,
  },
  actionContainerClub: {
    top: "50%",
    marginTop: -16,
  },
  actionButton: {
    padding: 8,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
});
