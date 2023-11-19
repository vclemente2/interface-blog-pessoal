import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import ListaTemas from "./components/temas/listaTemas/ListaTemas";
import FormularioTema from "./components/temas/formularioTema/FormularioTema";
import DeletarTema from "./components/temas/deletarTema/DeletarTema";
import ListaPostagens from "./components/postagens/listaPostagens/ListaPostagens";
import FormularioPostagem from "./components/postagens/formularioPostagem/FormularioPostagem";
import DeletarPostagem from "./components/postagens/deletarPostagem/DeletarPostagem";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/temas" element={<ListaTemas />} />
          <Route path="/cadastrar-tema" element={<FormularioTema />} />
          <Route path="/editar-tema/:id" element={<FormularioTema />} />
          <Route path="/deletar-tema/:id" element={<DeletarTema />} />

          <Route path="/postagens" element={<ListaPostagens />} />
          <Route path="/cadastroPostagem" element={<FormularioPostagem />} />
          <Route path="/editarPostagem/:id" element={<FormularioPostagem />} />
          <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
