import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPeliculasComponent } from './pages/lista-peliculas/lista-peliculas.component';

const routes: Routes = [
  {
    path: 'listado',
    component: ListaPeliculasComponent
  },
  {
    path: '',
    redirectTo: 'listado',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
