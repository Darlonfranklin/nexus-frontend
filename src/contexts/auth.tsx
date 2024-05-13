import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import client from "../services/axios";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: React.ReactNode;
};

interface IAuthContext {
  logged: boolean;
  loading: boolean;
  signIn(username: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem("@nexus.application:logged");
    return !!isLogged;
  });

  const [loading, setLoading] = useState<boolean>(false);
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
      const response: AxiosResponse = await client.post("/login", {
        username,
        password,
      });

      const token = response.headers.authorization.split(" ")[1];

      if (token) {
        localStorage.setItem("@nexus.application:token", token);
        localStorage.setItem("@nexus.application:logged", "true");
        setLogged(true);
        toast.success("LOGADO COM SUCESSO!");
        navigate("dashboard");
      } else {
        toast.error("FALHA AO LOGAR! TOKEN NÃO ENCONTRADO!");
      }
    } catch (error: any) {
      toast.warning("USUÁRIO / SENHA INCORRETOS!");
    }
    setLoading(false);
  };

  const signOut = () => {
    localStorage.removeItem("@nexus.application:logged");
    localStorage.removeItem("@nexus.application:token");
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{ logged, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
