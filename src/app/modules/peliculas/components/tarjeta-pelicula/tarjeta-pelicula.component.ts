import { Component, Input } from '@angular/core';
import { PeliculasI } from '../../interfaces/peliculas.interface';

@Component({
  selector: 'app-tarjeta-pelicula',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-pelicula.component.html',
  styleUrl: './tarjeta-pelicula.component.scss'
})
export class TarjetaPeliculaComponent {
  @Input({required: true}) movie!: PeliculasI
}
