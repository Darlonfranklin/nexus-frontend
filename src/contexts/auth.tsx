import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import client from "../services/axios";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: React.ReactNode;
};

interface IAuthContext {
  logged: boolean;
  signIn(username: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem("@nexus.application:logged");
    return !!isLogged;
  });

  const navigate = useNavigate();
  const signIn = async (username: string, password: string) => {
    try {
      const response: AxiosResponse = await client.post("/login", {
        username,
        password,
      });

      const token = response.headers.authorization.split(" ")[1];

      if (token) {
        localStorage.setItem("@nexus.application:token", token);
        setLogged(true);
        toast.success("LOGADO COM SUCESSO!");
      } else {
        toast.error("FALHA AO LOGAR! TOKEN NÃO ENCONTRADO!");
      }
    } catch (error: any) {
      toast.error("ERRO AO FAZER LOGIN! " + error.message);
    }
  };

  const signOut = () => {
    setLogged(false);
    navigate("");
  };

  return (
    <AuthContext.Provider value={{ logged, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
