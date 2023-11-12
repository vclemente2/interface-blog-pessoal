import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/cadastro" Component={Cadastro}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/home" Component={Home}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
