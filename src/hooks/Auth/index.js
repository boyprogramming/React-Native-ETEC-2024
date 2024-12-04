import { createContext, useContext, useEffect, useState } from "react";
import { useUsersDatabase } from "../../database/useUsersDatabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Text, View } from "react-native";

const AuthContext = createContext({});

export const Role = {
  SUPER: "SUPER",
  ADM: "ADM",
  USER: "USER"
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    authenticated: false,
    user: null,
    role: null,
  });

  const { authUser } = useUsersDatabase();

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@payment:user");

      if (storageUser) {
        setUser({
          authenticated: true,
          user: JSON.parse(storageUser),
          role: JSON.parse(storageUser).role,
        });
      } else {
        setUser({
          authenticated: false,
          user: null,
          role: null,
        });
      }
    };

    loadStorageData();
  }, []);

  const signIn = async ({ email, password }) => {
    const response = await authUser({ email, password });
    if (!response) {
      setUser({
        authenticated: false,
        user: null,
        role: null,
      });
      throw new Error("Usuário ou senha inválidos");
    }

    await AsyncStorage.setItem("@payment:user", JSON.stringify(response));

    setUser({
      authenticated: true,
      user: response,
      role: response.role,
    });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("@payment:user");
      setUser({
        authenticated: false,
        user: null,
        role: null,
      });
  };

  if (user?.authenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 28, marginTop: 15 }}>
          Carregando dados do usuário
        </Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}