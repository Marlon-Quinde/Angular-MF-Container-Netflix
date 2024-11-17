import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPeliculasComponent } from './pages/lista-peliculas/lista-peliculas.component';
import { DetallePeliculasComponent } from './pages/detalle-peliculas/detalle-peliculas.component';
import { ListaPeliculasFavoritasComponent } from './pages/lista-peliculas-favoritas/lista-peliculas-favoritas.component';

const routes: Routes = [
  {
    path: 'lista',
    component: ListaPeliculasComponent
  },
  {
    path: 'detalle/:id',
    component: DetallePeliculasComponent
  },
  {
    path: 'favoritas',
    component: ListaPeliculasFavoritasComponent
  },
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
