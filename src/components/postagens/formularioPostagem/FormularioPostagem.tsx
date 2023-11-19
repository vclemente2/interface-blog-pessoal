import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

import Tema from "../../../models/tema/Tema";
import Postagem from "../../../models/postagem/Postagem";
import CreatePostagem from "../../../models/postagem/CreatePostagem";
import { toastAlerta } from "../../../utils/toastAlerta";

function FormularioPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({ id: 0, name: "" });
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);
  const [createPostagem, setCreatePostagem] = useState<CreatePostagem>(
    {} as CreatePostagem
  );

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout, usuarioData, buscarUsuarioLogadoPorEmail } =
    useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagemPorId(id: string) {
    await buscar(`/postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token
      }
    });
  }

  async function buscarTemaPorId(id: string) {
    await buscar(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token
      }
    });
  }

  async function buscarTemas() {
    await buscar("/temas", setTemas, {
      headers: {
        Authorization: token
      }
    });
  }

  useEffect(() => {
    buscarUsuarioLogadoPorEmail(usuario.email);
  }, []);

  useEffect(() => {
    if (token === "") {
      toastAlerta("Você precisa estar logado", "erro");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();

    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      theme: tema
    });
  }, [tema]);

  useEffect(() => {
    setCreatePostagem({
      id: postagem.id,
      title: postagem.title,
      content: postagem.content,
      themeId: postagem.theme?.id as number,
      userId: postagem.user?.id as number
    });
  }, [postagem]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      theme: tema,
      user: {
        id: usuarioData.id,
        name: usuarioData.name,
        email: usuarioData.email,
        image: usuarioData.image,
        password: ""
      }
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id != undefined) {
      try {
        await atualizar(`/postagens`, createPostagem, setPostagem, {
          headers: {
            Authorization: token
          }
        });
        toastAlerta("Postagem atualizada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlerta("O token expirou, favor logar novamente", "erro");
          handleLogout();
        } else {
          toastAlerta("Erro ao atualizar Postagem", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, createPostagem, setPostagem, {
          headers: {
            Authorization: token
          }
        });

        toastAlerta("Postagem cadastrada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlerta("O token expirou, favor logar novamente", "erro");
          handleLogout();
        } else {
          toastAlerta("Erro ao cadastrar Postagem", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoTema = tema.name === "";

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Título da Postagem</label>
          <input
            value={createPostagem.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Insira aqui o Título"
            name="title"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Texto da Postagem</label>

          <input
            value={postagem.content}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Adicione aqui o Texto da Postagem"
            name="content"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Tema da Postagem</p>
          <select
            name="tema"
            id="tema"
            className="border p-2 border-slate-800 rounded"
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione um Tema
            </option>
            {temas.map((tema) => (
              <>
                <option value={tema.id}>{tema.name}</option>
              </>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={carregandoTema}
          className="flex justify-center rounded disabled:bg-slate-200 bg-indigo-400 
                    hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2"
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>Confirmar</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormularioPostagem;
