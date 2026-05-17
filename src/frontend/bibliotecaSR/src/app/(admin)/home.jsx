import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Bookmark,
  Calendar,
  LogOut,
  RefreshCw,
} from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import { useAuth } from "../../context/authContext";
import api from "../../services/api";

export default function HomeAdmin() {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState();
  const [reservas, setReservas] = useState();
  const [renovacoes, setRenovacoes] = useState();

  const router = useRouter();

  const handlePress = (page) => {
    router.push({
      pathname: `/${page}`,
    });
  };

  useFocusEffect(
    useCallback(() => {
      const carregarDadosHome = async () => {
        try {
          setLoading(true);

          const [resEventos, resReservas, resRenovacoes] = await Promise.all([
            api.get("/Eventos"),
            api.get("/Reservas/pendentes"),
            api.get("/Renovacoes/pendentes"),
          ]);

          setEvents(resEventos.data.length);
          setReservas(resReservas.data.length);
          setRenovacoes(resRenovacoes.data.length);
        } catch (error) {
          console.error(error);
          Alert.alert("Erro", "Não foi possível atualizar os dados da Home.");
        } finally {
          setLoading(false);
        }
      };

      carregarDadosHome();
    }, []),
  );

  const handleSignOut = () => {
    Alert.alert("Sair do App", "Tem certeza que deseja encerrar sua sessão?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", onPress: () => signOut(), style: "destructive" },
    ]);
  };

  function Card({
    title,
    count,
    subtitle,
    icon: Icon,
    color,
    onPress,
    btnLabel,
  }) {
    return (
      <View style={[styles.card, { borderColor: color + "30" }]}>
        <View style={styles.cardHeaderRow}>
          <View style={[styles.iconBadge, { backgroundColor: color + "15" }]}>
            <Icon size={20} color={color} />
          </View>
          <Text style={[styles.cardCount, { color: color }]}>{count}</Text>
        </View>

        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>

        <TouchableOpacity
          style={[styles.cardButton, { backgroundColor: color }]}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text style={styles.cardButtonText}>{btnLabel}</Text>
          <ArrowRight size={14} color="#FFF" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.welcomeRow}>
          <View>
            <Text style={styles.helloText}>Olá, Funcionário!</Text>
            <Text style={styles.subHelloText}>
              Painel de gerenciamento geral
            </Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleSignOut}
            activeOpacity={0.6}
          >
            <LogOut size={16} color="#ef4444" />
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          <Card
            title="Eventos"
            count={events}
            icon={Calendar}
            color="#6366f1"
            btnLabel="Gerenciar"
            onPress={() => handlePress("agenda")}
          />

          <Card
            title="Reservas"
            count={reservas}
            subtitle="Em aberto"
            icon={Bookmark}
            color="#2563eb"
            btnLabel="Ver reservas"
            onPress={() => handlePress("reservas")}
          />

          <Card
            title="Renovações"
            count={renovacoes}
            subtitle="Pedidos pendentes"
            icon={RefreshCw}
            color="#166534"
            btnLabel="Ver renovações"
            onPress={() => handlePress("renovacoes")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  welcomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  helloText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
  },
  subHelloText: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  logoutText: {
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "700",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFF",
    width: "48%",
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardCount: {
    fontSize: 22,
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1e293b",
  },
  cardSubtitle: {
    fontSize: 11,
    color: "#94a3b8",
    marginBottom: 14,
    marginTop: 1,
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    borderRadius: 10,
  },
  cardButtonText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  quickSectionCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1e293b",
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563eb",
  },
  divider: {
    height: 1,
    backgroundColor: "#f1f5f9",
    marginBottom: 12,
  },
  infoFeedback: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 18,
  },
});
