import { useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import User from "../../components/User";
import Emprestimos from "./emprestimos";
import Renovacoes from "./renovacoes";
import Reservas from "./reservas";

export default function UserArea() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Usuário");
  const scrollRef = useRef(null);

  const renderContent = (scrollRef) => {
    switch (activeTab) {
      case "Usuário":
        return <User scrollRef={scrollRef} />;
      case "Empréstimos":
        return <Emprestimos />;
      case "Reservas":
        return <Reservas />;
      case "Renovações":
        return <Renovacoes />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Área do Usuário</Text>

        <View style={styles.tabContainer}>
          {["Usuário", "Empréstimos", "Reservas", "Renovações"].map((tab) => (
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
                {tab === "Renovações" ? "Renovações" : tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Área de Renderização do Conteúdo */}
        <ScrollView
          ref={scrollRef}
          style={styles.renderArea}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {renderContent(scrollRef)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFC" },
  content: { flex: 1, paddingHorizontal: 10 },
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
    fontSize: 16,
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
    felx: 1,
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
