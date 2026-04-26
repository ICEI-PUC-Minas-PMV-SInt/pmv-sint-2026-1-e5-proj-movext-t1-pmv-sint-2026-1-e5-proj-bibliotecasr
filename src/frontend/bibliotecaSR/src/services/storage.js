import * as SecureStore from 'expo-secure-store';

export const TokenStorage = {
  saveToken: async (token) => {
    await SecureStore.setItemAsync('token', token);
  },
  getToken: async () => {
    return await SecureStore.getItemAsync('token');
  },
  deleteToken: async () => {
    await SecureStore.deleteItemAsync('token');
  }
};