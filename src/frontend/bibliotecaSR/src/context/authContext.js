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

    const currentGroup = segments[0];
    const isLoggingIn = currentGroup !== "(tabs)" && currentGroup !== "(admin)";

    // 1. Se NÃO está logado e tenta acessar áreas restritas -> Vai pro Login
    if (!user && (currentGroup === "(tabs)" || currentGroup === "(admin)")) {
      router.replace("/");
      return;
    }

    // 2. Se ESTÁ logado
    if (user) {
      if (user.role === "Funcionario") {
        // Admin tentando ir pro login ou pro fluxo do usuário comum -> Redireciona pro Admin
        if (isLoggingIn || currentGroup === "(tabs)") {
          router.replace("/(admin)/home");
        }
      } else {
        // Usuário comum tentando ir pro login ou pro fluxo de Admin -> Redireciona pro User
        if (isLoggingIn || currentGroup === "(admin)") {
          router.replace("/(tabs)/home");
        }
      }
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
          role: decoded.role,
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
        role: decoded.role,
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
