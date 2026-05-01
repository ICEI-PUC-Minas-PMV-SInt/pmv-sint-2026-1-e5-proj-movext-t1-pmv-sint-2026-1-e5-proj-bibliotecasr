import { useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "../components/Login";
import Agenda from "./(tabs)/agenda";

export default function Index() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.headerBackground}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo_bibilioteca.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.card}>
          {/* Abas de Navegação */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "login" && styles.activeTab]}
              onPress={() => setActiveTab("login")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "login" && styles.activeTabText,
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === "agenda" && styles.activeTab]}
              onPress={() => setActiveTab("agenda")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "agenda" && styles.activeTabText,
                ]}
              >
                Agenda
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {activeTab === "login" ? (
              <LoginForm />
            ) : (
              <View style={{ height: 400 }}>
                <Agenda />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerBackground: {
    backgroundColor: "#006B4D",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    backgroundColor: "#FFF",
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logo: {
    width: 150,
    height: 150,
  },
  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 25,
    marginTop: -50,
    borderRadius: 15,
    paddingBottom: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#00875F",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "#00875F",
  },
});
