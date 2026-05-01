import { Info, LogOut, Mail, User as UserIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/authContext";
import api from "../../services/api";

export default function User() {
  const { user, signOut } = useAuth();

  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);

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

  const handleSignOut = () => {
    Alert.alert("Sair do App", "Tem certeza que deseja encerrar sua sessão?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", onPress: () => signOut(), style: "destructive" },
    ]);
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <UserIcon color="#FFF" size={40} />
        </View>
        <Text style={styles.userName}>{userData?.nome || "Usuário"}</Text>
        <Text style={styles.userEmail}>
          {userData?.email || "email@exemplo.com"}
        </Text>
      </View>

      {/* Informações */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Minha Conta</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <Mail color="#666" size={20} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.label}>E-mail</Text>
              <Text style={styles.value}>{userData?.email}</Text>
            </View>
          </View>

          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <View style={styles.iconBox}>
              <Info color="#666" size={20} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.label}>Situação</Text>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: getSituacaoColor(userData?.status) + "20",
                  },
                ]}
              >
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
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <LogOut color="#E53E3E" size={20} />
          <Text style={styles.logoutText}>Sair do Aplicativo</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Versão 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFC" },
  header: {
    backgroundColor: "#00875F",
    padding: 40,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  userName: { fontSize: 22, fontWeight: "bold", color: "#FFF" },
  userEmail: { fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 5 },

  content: { padding: 20, marginTop: 10 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A5568",
    marginBottom: 15,
    marginLeft: 5,
  },

  infoCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F4F8",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F7FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  infoTextContainer: { flex: 1 },
  label: {
    fontSize: 12,
    color: "#A0AEC0",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  value: { fontSize: 15, color: "#2D3748", fontWeight: "500", marginTop: 2 },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 4,
  },
  badgeText: { fontSize: 12, fontWeight: "bold", textTransform: "capitalize" },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    marginTop: 30,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#FED7D7",
  },
  logoutText: {
    color: "#E53E3E",
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
  },
  versionText: {
    textAlign: "center",
    color: "#A0AEC0",
    fontSize: 12,
    marginTop: 20,
  },
});
