import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  nomeTema: string

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public auth: AuthService,
    private alertas: AlertasService
    ) { }

  ngOnInit() {
    window.scroll(0,0)
    
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.auth.refreshToken();

    this.getAllTema()
    this.getAllPostagens()
  }

  getAllTema(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getTemaById(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUsuario(){
    this.auth.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.usuario.id = this.idUsuario;
    this.postagem.usuario = this.usuario;

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

    findByTituloPostagem(){
      
      if(this.tituloPost == ''){
        this.getAllPostagens()
      } else {
        this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]
          ) => {
            this.listaPostagens = resp
        })
      }

    }

    findByNomeTema(){
      
      if(this.nomeTema == ''){
        this.getAllTema()
      } else {
        this.temaService.getNomeByTema(this.nomeTema).subscribe((resp: Tema[]
          ) => {
            this.listaTemas = resp
        })
      }

    }

  }
