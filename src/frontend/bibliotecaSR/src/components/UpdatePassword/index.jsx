import {
    Unlock
} from "lucide-react-native";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
export default function UpdatePassword({
  handleFocus,
  setCurrentPassword,
  setNewPassword,
  showPass,
  setShowPass,
  handleUpdatePassword,
}) {
  return (
    <View style={styles.passwordSection}>
      <View style={[styles.statusRow, { marginBottom: 10 }]}>
        <Unlock size={18} color={"#386a44"} />
        <Text style={[styles.badgeText]}>Alterar Senha</Text>
      </View>

      <TextInput
        style={styles.inlineInput}
        placeholder="Senha atual"
        onFocus={handleFocus}
        secureTextEntry
        placeholderTextColor="#A0AEC0"
        onChangeText={setCurrentPassword}
      />

      <TextInput
        style={styles.inlineInput}
        placeholder="Nova senha"
        secureTextEntry
        placeholderTextColor="#A0AEC0"
        onChangeText={setNewPassword}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelBtnSecondary}
          onPress={() => setShowPass(!showPass)}
        >
          <Text style={styles.cancelBtnText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.savePasswordBtn}>
          <Text
            style={styles.savePasswordBtnText}
            onPress={handleUpdatePassword}
          >
            Atualizar Senha
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 5,
  },

  badgeText: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#386a44",
  },
  inlineInput: {
    backgroundColor: "#F7FAFC",
    borderWidth: 1,
    borderColor: "#EDF2F7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#2D3748",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
    width: "100%",
  },
  savePasswordBtn: {
    flex: 1,
    backgroundColor: "#00875F",
    borderRadius: 8,
    paddingVertical: 10,
    borderColor: "#00875F",
    borderWidth: 1,
    alignItems: "center",
  },
  savePasswordBtnText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "700",
  },
  cancelBtnSecondary: {
    flex: 1,
    backgroundColor: "transparent",
    borderColor: "#E63946",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },

  cancelBtnText: {
    color: "#E63946",
    fontSize: 13,
    fontWeight: "700",
  },
});
