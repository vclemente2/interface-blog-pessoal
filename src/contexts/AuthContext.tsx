import { createContext, ReactNode, useState } from "react";

import UsuarioLogin from "../models/usuario/UsuarioLogin";
import { buscar, login } from "../services/Service";
import Usuario from "../models/usuario/Usuario";

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
  usuarioData: Usuario;
  buscarUsuarioLogadoPorEmail(email: string): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    email: "",
    password: "",
    token: ""
  });

  const [usuarioData, setUsuarioData] = useState<Usuario>({} as Usuario);

  const [isLoading, setIsLoading] = useState(false);

  async function buscarUsuarioLogadoPorEmail(email: string) {
    await buscar(`/usuarios/email/${email}`, setUsuarioData, {
      headers: {
        Authorization: usuario.token
      }
    });
  }

  async function handleLogin(userLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      await login(`/usuarios/logar`, userLogin, setUsuario);
      alert("Usuário logado com sucesso");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      alert("Dados do usuário inconsistentes");
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setUsuario({
      email: "",
      password: "",
      token: ""
    });
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        usuarioData,
        buscarUsuarioLogadoPorEmail,
        handleLogin,
        handleLogout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
