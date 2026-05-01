import { Tabs } from "expo-router";
import {
  Bookmark,
  BookOpen,
  Calendar,
  Home,
  RotateCw,
  User,
} from "lucide-react-native";

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
          title: "Empréstimos",
          tabBarIcon: ({ color }) => <BookOpen color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="reservas"
        options={{
          title: "Reservas",
          tabBarIcon: ({ color }) => <Bookmark color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="renovacoes"
        options={{
          title: "Renovações",
          tabBarIcon: ({ color }) => <RotateCw color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
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
