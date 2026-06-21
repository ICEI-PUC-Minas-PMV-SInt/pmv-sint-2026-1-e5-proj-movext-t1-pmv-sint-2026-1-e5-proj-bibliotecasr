import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  AlignLeft,
  BookOpen,
  Calendar,
  CalendarDays,
  Clock,
  FileText,
  Tag,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import api from "../../services/api";

const CATEGORIAS = [
  { label: "Clube do Livro", value: 0 },
  { label: "Clube de Jogos", value: 1 },
  { label: "Campeonato", value: 2 },
  { label: "Outros", value: 3 },
];

const DIAS_SEMANA = [
  { label: "Selecione o dia...", value: "" },
  { label: "Segunda-feira", value: 0 },
  { label: "Terça-feira", value: 1 },
  { label: "Quarta-feira", value: 2 },
  { label: "Quinta-feira", value: 3 },
  { label: "Sexta-feira", value: 4 },
  { label: "Sábado", value: 5 },
  { label: "Domingo", value: 6 },
];

export default function EditarEvento() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const eventString = params.eventString;

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState(0);
  const [diaSemana, setDiaSemana] = useState("");
  const [horaTexto, setHoraTexto] = useState("");
  const [dataTexto, setDataTexto] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [livroDoMes, setLivroDoMes] = useState("");
  const [autor, setAutor] = useState("");
  const [idEvento, setIdEvento] = useState(null);

  useEffect(() => {
    // Só roda o preenchimento se existir uma string de evento válida na rota
    if (eventString) {
      try {
        const evento = JSON.parse(eventString);

        setIdEvento(evento.id); // Guarda o ID no estado
        setTitulo(evento.titulo || "");
        setDescricao(evento.descricao || "");
        setCategoria(evento.categoria ?? 0);
        setDiaSemana(
          evento.diaSemana !== null && evento.diaSemana !== undefined
            ? String(evento.diaSemana)
            : "",
        );

        if (evento.dataHora) {
          const [dataParte, horaParte] = evento.dataHora.split("T");
          const [ano, mes, dia] = dataParte.split("-");
          const [hora, minuto] = horaParte.split(":");

          setDataTexto(`${dia}/${mes}/${ano}`);
          setHoraInicio(`${hora}:${minuto}`);
        }

        if (evento.categoria === 1) {
          setHoraTexto(evento.hora || "");
        } else if (!evento.dataHora && evento.hora) {
          setHoraInicio(evento.hora);
        }

        setLivroDoMes(evento.livroDoMes || "");
        setAutor(evento.autor || "");
      } catch (e) {
        console.error("Erro ao dar parse no evento", e);
      }
    } else {
      Alert.alert("Erro", "Dados do evento não foram encontrados.", [
        { text: "Voltar", onPress: () => router.back() },
      ]);
    }
  }, [eventString]);

  const mascaraData = (txt) => {
    const limpo = txt.replace(/\D/g, "");
    return limpo
      .replace(/^(\d{2})(\d)/, "$1/$2")
      .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
      .substring(0, 10);
  };

  const mascaraHora = (txt) => {
    const limpo = txt.replace(/\D/g, "");

    if (limpo.length > 2) {
      return `${limpo.substring(0, 2)}:${limpo.substring(2, 4)}`;
    }

    return limpo.substring(0, 2);
  };

  const handleSalvar = () => {
    if (!titulo.trim() || !descricao.trim()) {
      Alert.alert("Atenção", "Por favor, preencha o Título e a Descrição.");
      return;
    }

    if ((categoria === 0 || categoria === 2) && (!dataTexto || !horaInicio)) {
      Alert.alert(
        "Atenção",
        "Por favor, preencha a Data e o Horário de Início.",
      );
      return;
    }

    if (categoria === 1 && diaSemana === "") {
      Alert.alert("Atenção", "Por favor, selecione o Dia da Semana.");
      return;
    }

    Alert.alert(
      "Confirmar Edição",
      `Deseja realmente salvar as alterações do evento "${titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Alterar",
          onPress: async () => {
            try {
              let dataHoraISO = null;

              if (
                (categoria === 0 || categoria === 2) &&
                dataTexto &&
                horaInicio
              ) {
                const [dia, mes, ano] = dataTexto.split("/");

                let horaFormatada = horaInicio;
                if (!horaFormatada.includes(":")) {
                  horaFormatada = `${horaFormatada.padStart(2, "0")}:00`;
                } else {
                  const partes = horaFormatada.split(":");
                  const horaParte = partes[0].padStart(2, "0");
                  const minutoParte = partes[1].padEnd(2, "0");
                  horaFormatada = `${horaParte}:${minutoParte}`;
                }

                const [hora, minuto] = horaFormatada.split(":");
                dataHoraISO = `${ano}-${mes}-${dia}T${hora}:${minuto}:00`;
              }

              const eventoAtualizado = {
                id: idEvento,
                titulo: titulo.trim(),
                descricao: descricao.trim(),
                categoria: Number(categoria),
                dataHora: dataHoraISO,
                diaSemana:
                  categoria === 1 && diaSemana !== ""
                    ? Number(diaSemana)
                    : null,
                hora:
                  categoria === 1
                    ? horaTexto
                    : horaInicio
                      ? `${horaInicio}`
                      : null,
                livroDoMes: categoria === 0 ? livroDoMes.trim() : null,
                autor: categoria === 0 ? autor.trim() : null,
              };

              const response = await api.put(
                `/eventos/${idEvento}`,
                eventoAtualizado,
              );

              Alert.alert("Sucesso!", "O evento foi atualizado com sucesso.", [
                {
                  text: "OK",
                  onPress: () => router.back(),
                },
              ]);
            } catch (error) {
              if (error.response) {
                const mensagem = error.response.data;
                Alert.alert(
                  "Atenção",
                  typeof mensagem === "string"
                    ? mensagem
                    : "Erro ao validar dados no servidor.",
                );
              } else {
                console.error("Erro crítico:", error);
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
              }
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Editar Evento</Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>Título do Evento *</Text>
          <View style={styles.inputContainer}>
            <FileText color="#64748b" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ex: Reunião Mensal de Clássicos"
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>

          <Text style={styles.label}>Descrição *</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <AlignLeft
              color="#64748b"
              size={20}
              style={[styles.inputIcon, { marginTop: 12 }]}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva os detalhes do evento..."
              multiline
              numberOfLines={4}
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>

          <Text style={styles.label}>Categoria</Text>
          <View style={styles.pickerContainer}>
            <Tag color="#64748b" size={20} style={styles.inputIcon} />
            <Picker
              selectedValue={categoria}
              onValueChange={(itemValue) => setCategoria(itemValue)}
              style={styles.picker}
            >
              {CATEGORIAS.map((cat) => (
                <Picker.Item
                  key={cat.value}
                  label={cat.label}
                  value={cat.value}
                />
              ))}
            </Picker>
          </View>

          {(categoria === 0 || categoria === 2 || categoria === 3) && (
            <View style={styles.dynamicSection}>
              <Text style={styles.label}>Data do Evento *</Text>
              <View style={styles.inputContainer}>
                <CalendarDays
                  color="#64748b"
                  size={20}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/AAAA"
                  keyboardType="numeric"
                  value={dataTexto}
                  onChangeText={(t) => setDataTexto(mascaraData(t))}
                />
              </View>

              <View style={styles.rowHorarios}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.label}>Horário *</Text>
                  <View style={styles.inputContainer}>
                    <Clock color="#64748b" size={20} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="14:00"
                      value={horaInicio}
                      onChangeText={(t) => setHoraInicio(mascaraHora(t))}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}

          {categoria === 0 && (
            <View
              style={[styles.dynamicSection, { backgroundColor: "#f0fdf4" }]}
            >
              <Text style={styles.label}>Livro do Mês</Text>
              <View style={styles.inputContainer}>
                <BookOpen color="#64748b" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nome do livro"
                  value={livroDoMes}
                  onChangeText={setLivroDoMes}
                />
              </View>

              <Text style={styles.label}>Autor</Text>
              <View style={styles.inputContainer}>
                <BookOpen color="#64748b" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Autor do livro"
                  value={autor}
                  onChangeText={setAutor}
                />
              </View>
            </View>
          )}

          {categoria === 1 && (
            <View style={styles.dynamicSection}>
              <Text style={styles.label}>Dia da Semana (Recorrente)</Text>
              <View style={styles.pickerContainer}>
                <Calendar color="#64748b" size={20} style={styles.inputIcon} />
                <Picker
                  selectedValue={diaSemana}
                  onValueChange={(itemValue) => setDiaSemana(itemValue)}
                  style={styles.picker}
                >
                  {DIAS_SEMANA.map((dia) => (
                    <Picker.Item
                      key={dia.value}
                      label={dia.label}
                      value={dia.value}
                    />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Horário</Text>
              <View style={styles.inputContainer}>
                <Clock color="#64748b" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 14h as 16h"
                  value={horaTexto}
                  onChangeText={setHoraTexto}
                />
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
            <Text style={styles.btnSalvarText}>Alterar Evento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: {
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#166534" },
  scrollContent: { padding: 20, paddingBottom: 120 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 20,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginTop: 15,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    backgroundColor: "#f8fafc",
  },
  textAreaContainer: { alignItems: "flex-start" },
  inputIcon: { marginLeft: 12 },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 15,
    color: "#1e293b",
  },
  textArea: { height: 80, textAlignVertical: "top" },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    backgroundColor: "#f8fafc",
  },
  picker: { flex: 1, color: "#1e293b" },
  dynamicSection: {
    marginTop: 10,
    borderRadius: 8,
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#166534",
    borderRadius: 8,
    backgroundColor: "#f0fdf4",
  },
  datePickerButtonText: {
    marginLeft: 10,
    color: "#166534",
    fontWeight: "bold",
    fontSize: 15,
  },
  btnSalvar: {
    backgroundColor: "#166534",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 30,
  },
  btnSalvarText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
