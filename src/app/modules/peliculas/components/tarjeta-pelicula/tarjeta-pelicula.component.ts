import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PeliculasI } from '../../interfaces/peliculas.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioI } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-tarjeta-pelicula',
  templateUrl: './tarjeta-pelicula.component.html',
  styleUrl: './tarjeta-pelicula.component.scss',
})
export class TarjetaPeliculaComponent {
  @Input({ required: true }) movie!: PeliculasI;
  @Input() isFavorite: boolean = false;

  @Output() idsMovie: EventEmitter<{ id: string; idMovie: string }> =
    new EventEmitter<{ id: string; idMovie: string }>();

  /**
   *
   */
  constructor(
    private _router: Router,
  ) {}

  getUserInfo(): UsuarioI {
    return JSON.parse(localStorage.getItem('signInUsuario')!);
  }

  navigateDetail() {
    this._router.navigateByUrl(`/home/peliculas/detalle/${this.movie.id}`);
  }

  removeMovie() {
    this.idsMovie.emit({
      id: this.getUserInfo().id!.toString(),
      idMovie: this.movie.id.toString()
    })
  }
}
