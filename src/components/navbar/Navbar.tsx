import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { ReactNode, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toastAlerta } from "../../utils/toastAlerta";

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    toastAlerta("Usuário deslogado com sucesso", "info");
    navigate("/login");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div
        className="w-full bg-indigo-900 text-white
            flex justify-center py-4"
      >
        <div className="container flex justify-between text-lg">
          <Link to="/home">Blog Pessoal</Link>

          <div className="flex gap-4">
            <ul className="flex gap-4">
              <li className="menuLink">
                <Link to="/postagens">Postagens</Link>
              </li>
              <li className="menuLink">
                <Link to="/temas">Temas</Link>
              </li>
              <li className="menuLink">
                <Link to="/cadastrar-tema">Cadastrar Tema</Link>
              </li>
              <li className="menuLink">
                <Link to="/perfil">Perfil</Link>
              </li>
              <li className="menuLink">
                <Link to="" onClick={logout} className="hover:underline">
                  Sair
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

export default Navbar;
