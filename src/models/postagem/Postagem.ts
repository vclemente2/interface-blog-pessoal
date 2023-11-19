import Tema from "../tema/Tema";
import Usuario from "../usuario/Usuario";

export default interface Postagem {
  id: number;
  title: string;
  content: string;
  date: Date;
  theme: Tema | null;
  user: Usuario | null;
}
