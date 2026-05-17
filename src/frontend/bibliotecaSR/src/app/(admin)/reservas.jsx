import { useCallback, useEffect, useState } from "react";
import { Bookmark, CheckCircle2, XCircle } from "lucide-react-native";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import api from "../../services/api";
import ReservaCardPendente from "../../components/ReservaCardPendente";
import ReservaCardConfirmada from "../../components/ReservaCardConfirmada";

import Header from "../../components/Header";

export default function Reservas() {
  const [activeTab, setActiveTab] = useState("Em aberto");
  const [pendentes, setPendentes] = useState([]);
  const [confirmadas, setConfirmadas] = useState([]);
  const [expiradas, setExpiradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPendentes = async () => {
    try {
      const response = await api.get("/Reservas/pendentes");
      setPendentes(response.data);
    } catch (error) {
      console.error("Erro pendentes:", error);
    }
  };

  const fetchConfirmadas = async () => {
    try {
      const response = await api.get("/Reservas/confirmadas");
      setConfirmadas(response.data);
    } catch (error) {
      console.error("Erro confirmadas:", error);
    }
  };

  const fetchExpiradas = async () => {
    try {
      const response = await api.get("/Reservas/expiradas");
      setExpiradas(response.data);
    } catch (error) {
      console.error("Erro expiradas:", error);
    }
  };

  const carregarDadosPagina = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchPendentes(),
        fetchConfirmadas(),
        fetchExpiradas(),
      ]);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível carregar algumas informações de reservas.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    carregarDadosPagina();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    carregarDadosPagina();
  };

  const renderListaReservas = () => {
    let mensagemVazia = "";

    if (activeTab === "Em aberto") {
      if (pendentes.length === 0) {
        return <Text style={styles.emptyText}>Nenhuma solicitação de reserva em aberto.</Text>;
      }

      return pendentes.map((item) => (
        <ReservaCardPendente
          key={item.id}
          item={item}
          handleConfirmar={handleConfirmar}
          handleNaoEfetivar={handleNaoEfetivar}
        />
      ));
    } else if (activeTab === "Confirmadas") {
      if (confirmadas.length === 0) {
        return (
          <Text style={styles.emptyText}>Nenhuma reserva confirmada.</Text>
        );
      }
      return confirmadas.map((item) => (
        <ReservaCardConfirmada key={item.id} item={item} />
      ));
    } else {
      if (expiradas.length === 0) {
        return <Text style={styles.emptyText}>Nenhuma reserva expirada.</Text>;
      }
      return expiradas.map((item) => (
        <ReservaCardConfirmada key={item.id} item={item} isExpired={true} />
      ));
    }
  };

  function handleConfirmar(item) {
    Alert.alert(
      "Confirmar Reserva",
      `Tem certeza que deseja confirmar a reserva "${item.item.titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await api.put(`/Reservas/${item.id}/confirmar`);

              Alert.alert("Sucesso!", "A reserva foi confirmada com sucesso.");

              onRefresh();
            } catch (error) {
              if (error.response) {
                const mensagem = error.response.data;
                Alert.alert("Atenção", mensagem);
              } else {
                console.error("Erro crítico:", error);
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
              }
            }
          },
        },
      ],
    );
  }

  function handleNaoEfetivar(item) {
    Alert.alert(
      "Não Efetivar Reserva",
      `Tem certeza que deseja não efetivar a reserva "${item.item.titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await api.put(
                `/Reservas/${item.id}/nao-efetivada`,
              );

              Alert.alert(
                "Sucesso!",
                "A reserva foi marcada como não efetivada com sucesso.",
              );

              onRefresh();
            } catch (error) {
              if (error.response) {
                const mensagem = error.response.data;
                Alert.alert("Atenção", mensagem);
              } else {
                console.error("Erro crítico:", error);
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
              }
            }
          },
        },
      ],
    );
  }

  if (loading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#006D77" />
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Reservas</Text>

        <View style={styles.tabContainer}>
          {["Em aberto", "Confirmadas", "Expiradas"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabItem, activeTab === tab && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab === "Em aberto" && `${tab} (${pendentes.length})`}
                {tab === "Confirmadas" && `${tab} (${confirmadas.length})`}
                {tab === "Expiradas" && `${tab} (${expiradas.length})`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          style={styles.renderArea}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {renderListaReservas()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginVertical: 20,
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginBottom: 20,
  },
  tabItem: {
    paddingBottom: 10,
    alignItems: "center",
    flex: 1,
  },
  tabText: {
    color: "#64748b",
    fontSize: 14,
    textAlign: "center",
  },
  activeTab: {
    borderBottomColor: "#166534",
    borderBottomWidth: 2,
  },
  activeTabText: {
    color: "#166534",
    fontWeight: "bold",
  },
  renderArea: {
    flex: 1,
    marginTop: 10,
    minHeight: 200,
    paddingHorizontal: 5,
  },
  placeholderText: {
    textAlign: "center",
    color: "#64748b",
    marginTop: 40,
    fontSize: 16,
  },
});
