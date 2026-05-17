import { useRouter } from "expo-router";
import { BookOpen, Gamepad2, Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EventCardAdmin from "../../components/EventCardAdmin";
import Header from "../../components/Header";
import api from "../../services/api";
import { diasDaSemana } from "../../utils/diasDaSemana.js";

export default function Agenda() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      setLoading(false);

      const response = await api.get("/Eventos");

      setEvents(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os eventos.");
    } finally {
      setLoading(false);
    }
  };

  const bookClub = events
    .filter((e) => e.categoria === 0)
    .map((e) => {
      const dataObj = new Date(e.dataHora);

      return {
        ...e,
        data: dataObj.toLocaleDateString("pt-BR"),
        hora: dataObj.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    });

  const gamesClub = events
    .filter((e) => e.categoria === 1)
    .map((e) => {
      return {
        ...e,
        nomeDia: diasDaSemana[e.diaSemana] || "Dia inválido",
      };
    });

  function handleDelete(event) {
    Alert.alert(
      "Excluir Evento",
      `Tem certeza que deseja deletar o evento "${event.titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await api.delete(`/Eventos/${event.id}`);

              Alert.alert("Sucesso!", "O evento foi excluido com sucesso.");

              setEvents((events) => events.filter((e) => e.id !== event.id));
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

  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.welcomeContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Eventos</Text>
        </View>

        <TouchableOpacity
          style={styles.createButton}
          activeOpacity={0.7}
          onPress={() => Alert.alert("criar-evento")}
        >
          <Plus size={18} color="#FFF" />
          <Text style={styles.createButtonText}>Criar Evento</Text>
        </TouchableOpacity>
      </View>

      {/* CLUBE DO LIVRO */}
      {bookClub.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BookOpen size={22} color="#853030" />
            <Text style={[styles.sectionTitle, { color: "#853030" }]}>
              Clube de Leitura
            </Text>
          </View>

          {bookClub.map((event) => (
            <EventCardAdmin
              key={event.id}
              event={event}
              handleDelete={handleDelete}
            />
          ))}
        </View>
      )}

      {/* CLUBE DE JOGOS */}
      {gamesClub.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Gamepad2 size={22} color="#00875F" />
            <Text style={[styles.sectionTitle, { color: "#00875F" }]}>
              Clube de Jogos
            </Text>
          </View>

          {gamesClub.map((event) => (
            <EventCardAdmin
              key={event.id}
              event={event}
              handleDelete={handleDelete}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  welcomeContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
  },
  section: { padding: 20 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#004D36",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  createButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});
