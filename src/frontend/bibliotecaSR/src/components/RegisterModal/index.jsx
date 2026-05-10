import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Linking,
} from "react-native";
import {
  X,
  MapPin,
  IdCard,
  Phone,
  Clock,
  ExternalLink,
} from "lucide-react-native";

export default function RegisterModal({ visible, onClose }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Cadastro</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Text style={styles.modalDesc}>
              Para se cadastrar, leve à biblioteca:
            </Text>

            <View style={styles.requirementItem}>
              <IdCard size={20} color="#004D36" />
              <Text style={styles.requirementText}>
                Documento com foto (RG/CNH)
              </Text>
            </View>

            <View style={styles.requirementItem}>
              <MapPin size={20} color="#004D36" />
              <Text style={styles.requirementText}>
                Comprovante de residência
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <MapPin size={20} color="#004D36" />
              <View style={{ flex: 1 }}>
                <Text style={styles.infoText}>
                  Av. Araçaí, 250 – Centro (Brasital)
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Clock size={20} color="#004D36" />
              <Text style={styles.infoText}>
                Segunda à sexta: 08:00 às 16:30
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Phone size={20} color="#004D36" />
              <Text style={styles.infoText}>(11) 4712-5620</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Entendi</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 25,
    width: "90%",
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#004D36",
  },
  modalDesc: {
    fontSize: 15,
    color: "#444",
    marginBottom: 15,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F7F4",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  requirementText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#333",
    lineHeight: 20,
    flex: 1,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
    marginTop: 4,
  },
  mapLink: {
    fontSize: 13,
    color: "#004D36",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 15,
  },
  closeButton: {
    backgroundColor: "#004D36",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
