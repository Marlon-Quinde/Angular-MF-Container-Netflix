import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculasRoutingModule } from './peliculas-routing.module';
import { ListaPeliculasComponent } from './pages/lista-peliculas/lista-peliculas.component';
import { TarjetaPeliculaComponent } from './components/tarjeta-pelicula/tarjeta-pelicula.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PeliculasService } from './services/peliculas.service';
import { SharedModule } from '../../shared/shared.module';
import { DetallePeliculasComponent } from './pages/detalle-peliculas/detalle-peliculas.component';
import { ListaPeliculasFavoritasComponent } from './pages/lista-peliculas-favoritas/lista-peliculas-favoritas.component';


@NgModule({
  declarations: [
    ListaPeliculasComponent,
    DetallePeliculasComponent,
    ListaPeliculasFavoritasComponent,
    TarjetaPeliculaComponent
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,

    // HttpClientModule,

    // ? Modules
    SharedModule,


  ],
  providers: [
    PeliculasService,
    provideHttpClient(withInterceptorsFromDi()) // Nueva configuración
  ],
})
export class PeliculasModule { }
