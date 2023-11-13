import { Link } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  return (
    <>
      <div
        className="w-full bg-indigo-900 text-white
                flex justify-center py-4"
      >
        <div className="container flex justify-between text-lg">
          Blog Pessoal
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
                <Link to="/login">Sair</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
