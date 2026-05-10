import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { AlertTriangle, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import NotificationCard from "../../components/NotificationCard";
import { useAuth } from "../../context/authContext";
import api from "../../services/api";

export default function Home() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [statusEmprestimo, setStatusEmprestimo] = useState({
    temAtraso: false,
    venceHoje: false,
    venceLogo: false,
  });
  const navigation = useNavigation();

  const router = useRouter();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    router.push({
      pathname: "/resultadoBusca",
      params: { query: searchQuery },
    });

    setSearchQuery("");
  };

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      setLoading(true);
      try {
        await Promise.all([
          getNewItems(),
          getNotifications(),
          verificarStatusEmprestimos(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    carregarDadosIniciais();
  }, []);

  const verificarStatusEmprestimos = async () => {
    try {
      const response = await api.get(`/Usuarios/atrasos/${user.id}`);
      setStatusEmprestimo(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os atrasos.");
    } finally {
    }
  };

  const getNewItems = async () => {
    try {
      setLoading(false);

      const response = await api.get("/Itens/recentes");

      setItems(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os livros.");
    } finally {
      setLoading(false);
    }
  };

  const getNotifications = async () => {
    try {
      const response = await api.get(`/usuarios/${user.id}/notificacoes`);
      const notificacoesNaoLidas = response.data.filter(
        (n) => n.lida === false,
      );
      setNotifications(notificacoesNaoLidas);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar as notificações");
    } finally {
    }
  };

  const BannerAlerta = ({ titulo, mensagem, cor }) => (
    <View
      style={[
        styles.containerAtraso,
        { backgroundColor: cor, marginBottom: 8 },
      ]}
    >
      <View style={styles.contentAtraso}>
        <AlertTriangle color="#FFF" size={24} />
        <View style={styles.textContainer}>
          <Text style={styles.tituloAtraso}>{titulo}</Text>
          <Text style={styles.mensagemAtraso}>{mensagem}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Header />
        <View style={styles.searchBar}>
          <Search color="#999" size={20} />
          <TextInput
            placeholder="Busca por título"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
            autoCapitalize="none"
          />
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
          {statusEmprestimo.temAtraso && (
            <BannerAlerta
              titulo="Atenção: Empréstimo em Atraso!"
              mensagem="Compareça à biblioteca e regularize sua situação."
              cor="#C53030"
            />
          )}

          {statusEmprestimo.venceHoje && (
            <BannerAlerta
              titulo="Atenção: Empréstimo vence hoje"
              mensagem="Não esqueça de devolver ou renovar ainda hoje."
              cor="#DD6B20"
            />
          )}

          {statusEmprestimo.venceLogo && (
            <BannerAlerta
              titulo="Lembrete: Devolução Próxima"
              mensagem="Você possui empréstimos que vencem nos próximos dias."
              cor="#44c1fc"
            />
          )}
        </View>

        <View style={styles.content}>
          {/* NOTIFICAÇÕES */}
          {notifications.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Notificações</Text>
              {notifications.map((notif) => (
                <NotificationCard
                  key={notif.id}
                  id={notif.id}
                  tipo={notif.tipo}
                  mensagem={notif.mensagem}
                  setNotifications={setNotifications}
                />
              ))}
            </>
          )}

          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Novidades do Acervo</Text>
          </View>

          {/* LIVROS RECENTES */}
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#00875F"
              style={{ marginTop: 20 }}
            />
          ) : (
            items.map((item) => <ItemCard key={item.id} item={item} />)
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFC" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 45,
    marginTop: 10,
    marginHorizontal: 20,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15 },
  content: { padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  seeAll: { color: "#00875F", fontWeight: "600" },
  containerAtraso: {
    backgroundColor: "#C53030",
    marginTop: 14,

    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  contentAtraso: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  tituloAtraso: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  mensagemAtraso: {
    color: "#FEE2E2",
    fontSize: 13,
    marginTop: 2,
  },
});
