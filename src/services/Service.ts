import axios from "axios";
import UsuarioLogin from "../models/usuario/UsuarioLogin";
import Usuario from "../models/usuario/Usuario";

const api = axios.create({
  baseURL: "https://projeto-blog-pessoal-e8bd110fcd69.herokuapp.com/"
});

export const login = async (
  url: string,
  dados: UsuarioLogin,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const cadastrarUsuario = async (
  url: string,
  dados: Usuario,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};
