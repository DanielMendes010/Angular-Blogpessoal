import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// A partir daqui começa os meus componentes
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EntrarComponent } from './entrar/entrar.component';

const routes: Routes = [
  {path:'', redirectTo:'cadastrar', pathMatch:'full'},
  {path:'entrar', component: EntrarComponent},
  {path:'cadastrar', component: CadastrarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
