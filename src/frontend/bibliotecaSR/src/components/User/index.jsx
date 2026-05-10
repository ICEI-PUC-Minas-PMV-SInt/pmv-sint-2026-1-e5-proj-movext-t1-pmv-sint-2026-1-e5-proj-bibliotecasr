import {
  CheckCircle2,
  Lock,
  User as UserIcon
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useAuth } from "../../context/authContext";
import api from "../../services/api";
import UpdateEmail from "../UpdateEmail";
import UpdatePassword from "../UpdatePassword";

export default function User({ scrollRef }) {
  const { user } = useAuth();
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      setLoading(false);
      const response = await api.get(`/Usuarios/${user.id}`);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar o usuário.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateData = async (payload, successMsg, callback) => {
    if (!currentPassword || Object.values(payload).some((v) => !v)) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const authResponse = await api.post("/Usuarios/authenticate", {
        email: userData.email,
        senha: currentPassword,
      });

      if (authResponse.status === 200) {
        await api.put(`/Usuarios/${user.id}`, {
          email: payload.email || userData.email,
          senha: payload.senha || currentPassword,
        });

        Alert.alert("Sucesso", successMsg);
        setCurrentPassword("");
        if (callback) callback();
      }
    } catch (error) {
      const isAuthError = error.response?.status === 401;
      const msg = isAuthError
        ? "Senha atual incorreta."
        : `Não foi possível realizar a alteração.`;

      Alert.alert("Erro", msg);
    }
  };

  const handleUpdateEmail = () => {
    handleUpdateData({ email: newEmail }, "Seu email foi alterado!", () => {
      setNewEmail("");
      setShowEmail(false);
    });
  };

  const handleUpdatePassword = () => {
    handleUpdateData({ senha: newPassword }, "Sua senha foi alterada!", () => {
      setNewPassword("");
      setShowPass(false);
    });
  };

  const getSituacaoColor = (status) => {
    switch (status) {
      case 0:
        return "#00875F";
      case 1:
        return "#718096";
      case 2:
        return "#E53E3E";
      default:
        return "#718096";
    }
  };

  const handleFocus = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View style={styles.profileCard}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardHeader} />
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <UserIcon color="#64748b" size={40} />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.userName}>{userData.nome}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Status da Conta</Text>

          <View style={styles.statusRow}>
            <CheckCircle2 color="#22c55e" size={18} />
            <View style={[styles.badge]}>
              <Text
                style={[
                  styles.badgeText,
                  { color: getSituacaoColor(userData?.status) },
                ]}
              >
                {userData?.status === 0
                  ? "Ativo"
                  : userData?.status === 1
                    ? "Bloqueado"
                    : userData?.status === 2
                      ? "Inativo"
                      : "Indisponível"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.label}>Configurações</Text>

          {!showPass && (
            <TouchableOpacity
              style={styles.statusRow}
              onPress={() => setShowPass(!showPass)}
            >
              <Lock size={18} color={"#386a44"} />
              <Text style={[styles.badgeText]}>Alterar Senha</Text>
            </TouchableOpacity>
          )}

          {showPass && (
            <UpdatePassword
              handleFocus={handleFocus}
              setCurrentPassword={setCurrentPassword}
              setNewPassword={setNewPassword}
              showPass={showPass}
              setShowPass={setShowPass}
              handleUpdatePassword={handleUpdatePassword}
            />
          )}

          {!showEmail && (
            <TouchableOpacity
              style={styles.statusRow}
              onPress={() => setShowEmail(!showEmail)}
            >
              <Lock size={18} color={"#386a44"} />
              <Text style={[styles.badgeText]}>Alterar Email</Text>
            </TouchableOpacity>
          )}

          {showEmail && (
            <UpdateEmail
              handleFocus={handleFocus}
              setCurrentPassword={setCurrentPassword}
              setNewEmail={setNewEmail}
              setShowEmail={setShowEmail}
              handleUpdateEmail={handleUpdateEmail}
              showEmail={showEmail}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  row: { flexDirection: "row", alignItems: "center" },
  logoPlaceholder: { width: 32, height: 32, marginRight: 10 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoText: { fontSize: 18, fontWeight: "bold", color: "#2D3748" },
  logo: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#166534" },
  content: { padding: 20 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginBottom: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#166534",
    paddingBottom: 10,
    marginRight: 20,
  },
  activeTabText: { color: "#166534", fontWeight: "bold" },
  tabText: { color: "#64748b", marginRight: 20 },
  profileCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 60,
  },
  cardHeader: { height: 100, backgroundColor: "#386a44" },
  avatarContainer: { alignItems: "center", marginTop: -40 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  infoContainer: { padding: 20 },
  userName: { fontSize: 20, fontWeight: "bold", color: "#1e293b" },
  userEmail: { color: "#64748b" },
  divider: { height: 1, backgroundColor: "#f1f5f9", marginVertical: 15 },
  label: { fontSize: 14, color: "#64748b", marginTop: 10 },
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

  matriculaValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 5,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: { alignItems: "center", padding: 10 },
  navItemActive: { borderWidth: 2, borderColor: "#1e293b", borderRadius: 8 },
  navText: { fontSize: 12, color: "#64748b", marginTop: 4 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
