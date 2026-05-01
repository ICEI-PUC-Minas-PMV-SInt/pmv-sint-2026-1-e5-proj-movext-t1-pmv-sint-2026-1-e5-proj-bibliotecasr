import api from "./api";

export const auth = {
  login: async (email, senha) => {
    try {
      const response = await api.post("/Usuarios/authenticate", {
        email,
        senha,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Erro na conexão";
    }
  },
};
