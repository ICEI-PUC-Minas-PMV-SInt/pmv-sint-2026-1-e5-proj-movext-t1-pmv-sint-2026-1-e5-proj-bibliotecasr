import { Tabs } from "expo-router";
import { Calendar, Home, Bookmark, RefreshCw } from "lucide-react-native";

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
        name="reservas"
        options={{
          title: "Reservas",
          tabBarIcon: ({ color }) => <Bookmark color={color} size={24} />,
        }}
      />
                  <Tabs.Screen
        name="renovacoes"
        options={{
          title: "Renovacoes",
          tabBarIcon: ({ color }) => <RefreshCw color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
