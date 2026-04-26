import {
  BookOpen,
  Gamepad2
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import api from "../../services/api";

import EventCard from "../../components/EventCard";

const diasDaSemana = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

export default function Agenda() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewEvents();
  }, []);

  const getNewEvents = async () => {
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

  return (
    <ScrollView style={styles.container}>
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
            <EventCard key={event.id} event={event} />
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
            <EventCard key={event.id} event={event} />
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
  section: { padding: 20 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },
});
