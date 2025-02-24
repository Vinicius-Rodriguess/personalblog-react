import { ReactNode, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastAlerta } from '../../utils/ToastAlerta';

function Navbar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta('O Usuário foi desconectado com sucesso!', 'sucesso');
    navigate('/');
  }

  let component: ReactNode;

  if (usuario.token !== '') {
    component = (
      <div
        className="w-full bg-gray-900 text-white flex justify-center py-4"
      >
        <div className="container flex justify-between text-lg">
          <Link to="/home" className="text-2xl font-bold hover:scale-110 transition-all">
            Blog Pessoal
          </Link>

          <div className="flex gap-6">
            <Link to="/postagens" className="hover:underline hover:scale-110 transition-all">
              Postagens
            </Link>
            <Link to="/temas" className="hover:underline hover:scale-110 transition-all">
              Temas
            </Link>
            <Link to="/cadastrartema" className="hover:underline hover:scale-110 transition-all">
              Cadastrar Tema
            </Link>
            <Link to="/perfil" className="hover:underline hover:scale-110 transition-all">
              Perfil
            </Link>
            <Link to="" onClick={logout} className="hover:underline hover:scale-110 transition-all">
              Sair
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

export default Navbar;
