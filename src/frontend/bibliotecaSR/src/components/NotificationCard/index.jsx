import { AlertCircle, CheckCircle2, Info, X } from "lucide-react-native";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../../services/api";


export default function NotificacaoCard({ id, tipo, mensagem, setNotifications }) {
  const handleFecharNotificacao = async (id) => {
    try {
      const response = await api.put(`/Notificacoes/marcar-lida/${id}`);

      if (response.status === 204 || response.status === 200) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      } else {
        Alert.alert("Erro", "Não foi possível remover a notificação.");
      }
    } catch (error) {
      console.error("Erro ao fechar notificação:", error);
      Alert.alert("Erro", "Verifique sua conexão.");
    }
  };

  const configs = {
    0: {
      bg: "#F0FFF4",
      border: "#9AE6B4",
      color: "#2F855A",
      Icon: CheckCircle2,
    },
    1: {
      bg: "#FFF5F5",
      border: "#FEB2B2",
      color: "#C53030",
      Icon: AlertCircle,
    },
    2: {
      bg: "#EBF8FF",
      border: "#90CDF4",
      color: "#2B6CB0",
      Icon: Info,
    },
  };

  const { bg, border, color, Icon } = configs[tipo] || configs.informativo;

  return (
    <View
      style={[styles.alertCard, { backgroundColor: bg, borderColor: border }]}
    >
      <Icon color={color} size={20} />
      <Text style={[styles.alertText, { color: color }]}>{mensagem}</Text>
      <TouchableOpacity
        onPress={() => handleFecharNotificacao(id)}
        style={styles.closeButton}
        activeOpacity={0.7}
      >
        <X color={color} size={18} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  alertCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  alertText: { marginLeft: 10, fontSize: 14, color: "#2D3748", flex: 1 },
  closeButton: {
    padding: 4,
  },
});
