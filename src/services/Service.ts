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
  setDados({ ...dados, token: "Bearer " + resposta.data.token });
};

export const cadastrarUsuario = async (
  url: string,
  dados: Usuario,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const buscar = async (
  url: string,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

export const deletar = async (url: string, header: Object) => {
  await api.delete(url, header);
};
