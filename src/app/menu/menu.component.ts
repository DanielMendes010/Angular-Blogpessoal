import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  nome: string = environment.nome;
  foto: string = environment.foto;
  id = environment.id

  constructor(
    private router: Router,
    public authService: AuthService
    ) { }

  ngOnInit(){

  }

  sair(){
    this.router.navigate(['/entrar'])
    environment.token = ''
    environment.id = 0
    environment.foto = ''
    environment.tipo = ''
  }

}
