import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Mail, ChevronUp, EyeOff, Eye } from "lucide-react-native";

export default function UpdateEmail({
  setCurrentPassword,
  setNewEmail,
  setShowEmail,
  handleUpdateEmail,
  showEmail,
}) {
  const [showCurrentPass, setShowCurrentPass] = useState(false);

  return (
    <View style={styles.cardOpen}>
      <TouchableOpacity
        style={styles.headerRow}
        onPress={() => setShowEmail(!showEmail)}
      >
        <View style={styles.leftInfo}>
          <Mail size={20} color={"#006b3f"} />
          <Text style={styles.headerTitle}>Alterar e-mail</Text>
        </View>
        <ChevronUp size={20} color={"#333"} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.inputLabel}>Novo e-mail</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu novo e-mail"
            placeholderTextColor="#A0AEC0"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setNewEmail}
          />
        </View>

        <Text style={styles.inputLabel}>Confirme sua senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha atual"
            secureTextEntry={!showCurrentPass}
            placeholderTextColor="#A0AEC0"
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity
            onPress={() => setShowCurrentPass(!showCurrentPass)}
          >
            {showCurrentPass ? (
              <Eye size={20} color="#006b3f" />
            ) : (
              <EyeOff size={20} color="#A0AEC0" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setShowEmail(false)}
          >
            <Text style={styles.cancelBtnText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={handleUpdateEmail}>
            <Text style={styles.saveBtnText}>Atualizar e-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardOpen: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 12,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#F8FAFC",
  },
  leftInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#006b3f",
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  inputLabel: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
    marginTop: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 15,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    marginBottom: 8,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#00875F",
    borderRadius: 8,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtnText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#E63946",
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtnText: {
    color: "#E63946",
    fontSize: 15,
    fontWeight: "600",
  },
});
