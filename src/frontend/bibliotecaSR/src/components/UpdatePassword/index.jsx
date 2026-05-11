import { Unlock, Lock, ChevronUp, EyeOff, Eye } from "lucide-react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export default function UpdatePassword({
  setCurrentPassword,
  setNewPassword,
  showPass,
  setShowPass,
  handleUpdatePassword,
}) {
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  return (
    <View style={styles.cardOpen}>
      <TouchableOpacity
        style={styles.headerRow}
        onPress={() => setShowPass(!showPass)}
      >
        <View style={styles.leftInfo}>
          <Lock size={20} color={"#006b3f"} />
          <Text style={styles.headerTitle}>Alterar senha</Text>
        </View>
        <ChevronUp size={20} color={"#333"} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.inputLabel}>Senha atual</Text>
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

        <Text style={styles.inputLabel}>Nova senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua nova senha"
            secureTextEntry={!showNewPass}
            placeholderTextColor="#A0AEC0"
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)}>
            {showNewPass ? (
              <Eye size={20} color="#006b3f" />
            ) : (
              <EyeOff size={20} color="#A0AEC0" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setShowPass(false)}
          >
            <Text style={styles.cancelBtnText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleUpdatePassword}
          >
            <Text style={styles.saveBtnText}>Atualizar senha</Text>
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
