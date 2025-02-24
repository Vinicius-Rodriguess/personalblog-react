import { createContext, ReactNode, useState } from 'react';
import UsuarioLogin from '../models/UsuarioLogin';
import { login } from '../services/Service';
import { ToastAlerta } from '../utils/ToastAlerta';

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    token: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);

    try {
      await login('/usuarios/logar', usuarioLogin, setUsuario);
      ToastAlerta('O Usuário foi autenticado com sucesso!', 'sucesso');
    } catch (error) {
      console.log(error);
      ToastAlerta('Os dados do Usuário estão inconsistentes!', 'erro');
    }

    setIsLoading(false);
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: '',
      usuario: '',
      senha: '',
      foto: '',
      token: '',
    });
  }

  return (
    <AuthContext.Provider
      value={{ usuario, isLoading, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
