import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import API, {
  registerAuthCallbacks,
  setInMemoryToken,
} from "../services/apiClient";

type UserRole = "admin" | "customer";

export interface User {
  id: number;
  name: string;
  email: string;
  address: string | null;
  businessName: string | null;
  phoneNumber: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (user: User, accessToken: string) => void;
  logout: () => Promise<void>;
  setAccessToken: (token: string | null) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAccessToken = useCallback((token: string | null) => {
    setAccessTokenState(token);
    setInMemoryToken(token);
  }, []);

  const clearSession = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
  }, [setAccessToken]);

  const login = useCallback(
    (userData: User, token: string) => {
      setUser(userData);
      setAccessToken(token);
      localStorage.setItem("user", JSON.stringify(userData));
    },
    [setAccessToken]
  );

  const logout = useCallback(async () => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.error("Logout request failed", error);
    } finally {
      clearSession();
      navigate("/login");
    }
  }, [clearSession, navigate]);

  const restoreUser = useCallback(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const response = await API.post("/auth/refresh");
      const token =
        response.data?.data?.accessToken ||
        response.data?.accessToken;

      if (!token) {
        throw new Error("Access token missing");
      }

      setAccessToken(token);
    } catch (error) {
      clearSession();
      console.warn("Session refresh failed", error);
    } finally {
      setIsLoading(false);
    }
  }, [clearSession, setAccessToken]);

  useEffect(() => {
    registerAuthCallbacks(
      (token) => {
        setAccessToken(token);
      },
      () => {
        clearSession();
        navigate("/login");
      }
    );

    restoreUser();
    refreshSession();
  }, [
    clearSession,
    navigate,
    setAccessToken,
    restoreUser,
    refreshSession,
  ]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        login,
        logout,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};