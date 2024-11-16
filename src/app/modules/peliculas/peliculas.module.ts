import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculasRoutingModule } from './peliculas-routing.module';
import { ListaPeliculasComponent } from './pages/lista-peliculas/lista-peliculas.component';
import { TarjetaPeliculaComponent } from './components/tarjeta-pelicula/tarjeta-pelicula.component';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PeliculasService } from './services/peliculas.service';


@NgModule({
  declarations: [
    ListaPeliculasComponent
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    // HttpClientModule,

    TarjetaPeliculaComponent,
  ],
  providers: [
    PeliculasService,
    provideHttpClient(withInterceptorsFromDi()) // Nueva configuración
  ],
})
export class PeliculasModule { }
