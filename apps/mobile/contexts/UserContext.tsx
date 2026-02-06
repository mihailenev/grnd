import { createContext, useState, ReactNode, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { isAxiosError } from "axios";
import { api } from "@/lib/axios";

interface User {
  id: String;
  email: String;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function login(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      const { user, token } = response.data;

      setUser(user);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await SecureStore.setItemAsync("auth_token", token);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }

  async function register(email: string, password: string) {
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
      });
      await login(email, password);
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Registration failed");
      }
      throw new Error("Unexpected error");
    }
  }

  async function logout() {
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
    await SecureStore.deleteItemAsync("auth_token");
  }

  async function restoreSession() {
    try {
      const token = await SecureStore.getItemAsync("auth_token");

      if (!token) return;

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const response = await api.get("/auth/me");
      setUser(response.data.user);
    } catch {
      setUser(null);
      delete api.defaults.headers.common.Authorization;
      await SecureStore.deleteItemAsync("auth_token");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}
