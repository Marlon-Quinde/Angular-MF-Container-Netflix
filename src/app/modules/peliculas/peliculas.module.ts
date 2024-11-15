import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculasRoutingModule } from './peliculas-routing.module';
import { ListaPeliculasComponent } from './pages/lista-peliculas/lista-peliculas.component';


@NgModule({
  declarations: [
    ListaPeliculasComponent
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule
  ]
})
export class PeliculasModule { }
