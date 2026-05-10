import { Tabs } from "expo-router";
import { Calendar, Home, User } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "#00875F", headerShown: false }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="agenda"
        options={{
          title: "Agenda",
          tabBarIcon: ({ color }) => <Calendar color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="emprestimos"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="reservas"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="renovacoes"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="userArea"
        options={{
          title: "Usuário",
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />

      <Tabs.Screen
        name="item"
        options={{
          href: null, // Esconde o ícone da barra de abas
        }}
      />
      <Tabs.Screen
        name="resultadoBusca"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
