import { Tema } from "./Tema";
import { Usuario } from "./Usuario";

export class Postagem{
    public data: Date;
    public tema: Tema;
    public id: number;
    public texto: string;
    public titulo: string;
    public usuario: Usuario;
}