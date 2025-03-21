import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";

type TAuthProviderProps = {
  children: ReactNode;
};

interface IAuthContext {
  logged: boolean;
  loading: boolean;
  username: string | null;
  signIn(username: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<TAuthProviderProps> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem("@nexus.application:logged");
    return !!isLogged;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem("@nexus.application:username");
  });

  useEffect(() => {
    const isLogged = localStorage.getItem("@nexus.application:logged");
    if (!isLogged) {
      setLogged(false);
    }
  }, []);

  const navigate = useNavigate();
  const signIn = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response: AxiosResponse = await api.post("/login", { username, password });

      const token = response.headers.authorization.split(" ")[1];

      if (token) {
        localStorage.setItem("@nexus.application:token", token);
        localStorage.setItem("@nexus.application:logged", "true");
        setLogged(true);
        setUsername(username);
        localStorage.setItem("@nexus.application:username", username);
        toast.success("LOGADO COM SUCESSO!");
        navigate("dashboard");
      } else {
        toast.error("FALHA AO LOGAR! TOKEN NÃO ENCONTRADO!");
      }
    } catch (error: any) {
      const statusCode = error.response?.status;
      if (statusCode) {
        toast.warning("USUÁRIO / SENHA INCORRETOS!");
      } else {
        toast.error("Erro de conexão. Verifique sua rede e tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("@nexus.application:logged");
    localStorage.removeItem("@nexus.application:token");
    localStorage.removeItem("@nexus.application:username");
    navigate("/login");
    setLogged(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{ logged, loading, username, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
