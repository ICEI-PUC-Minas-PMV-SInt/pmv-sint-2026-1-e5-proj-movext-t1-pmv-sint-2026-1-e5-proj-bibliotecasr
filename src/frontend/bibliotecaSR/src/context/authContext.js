import { useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments(); // qual página o usuário está

  useEffect(() => {
    loadStorageData();
  }, []);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(tabs)";

    if (!user && inAuthGroup) {
      // Se não está logado e tenta entrar nos tabs, volta pro login
      router.replace("/");
    } else if (user && segments[0] !== "(tabs)") {
      // Se está logado e está na tela de login, vai pra home
      router.replace("/(tabs)/home");
    }
  }, [user, segments, loading]);

  async function loadStorageData() {
    try {
      const savedToken = await SecureStore.getItemAsync("token");

      if (savedToken) {
        const decoded = jwtDecode(savedToken);

        const userData = {
          token: savedToken,
          id: decoded.nameid,
        };

        setUser(userData);
      }
    } catch (error) {
      console.error("Erro ao carregar usuário", error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(token) {
    try {
      const decoded = jwtDecode(token);

      const userId = decoded.nameid;

      const userData = {
        token,
        id: userId,
      };

      await SecureStore.setItemAsync("token", token);
      setUser(userData);
    } catch (error) {
      console.error("Erro ao decodificar token", error);
    }
  }

  async function signOut() {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
