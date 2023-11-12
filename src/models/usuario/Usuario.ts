import Postagem from "../postagem/Postagem";

export default interface Usuario {
  id: number;
  name: string;
  email: string;
  image: string;
  posts?: Postagem[] | null;
}
