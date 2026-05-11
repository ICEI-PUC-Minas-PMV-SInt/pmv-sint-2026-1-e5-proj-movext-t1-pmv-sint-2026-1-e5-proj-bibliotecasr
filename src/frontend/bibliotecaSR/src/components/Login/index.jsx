import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { useAuth } from "../../context/authContext";
import { auth } from "../../services/auth";
import RegisterModal from "../RegisterModal";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { signIn } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert(
        "Por favor, preencha os campos com seu email e senha.",
      );
    }
    try {
      const data = await auth.login(email, password);
      await signIn(data.jwtToken);
    } catch (err) {
      if (err && (err.status === 401 || err.status === 400)) {
        Alert.alert("Erro de Login", "E-mail ou senha incorretos.");
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
        );
      }
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputField} 
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} 
        />
        <TouchableOpacity 
          style={styles.eyeIcon} 
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Eye size={22} color="#00875F" />
          ) : (
            <EyeOff size={22} color="#999" />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerLink}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.footerLinkText}>Como se cadastrar?</Text>
      </TouchableOpacity>

      <RegisterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  inputField: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  input: { 
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#00875F",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerLink: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  footerLinkText: {
    color: "#00875F",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});