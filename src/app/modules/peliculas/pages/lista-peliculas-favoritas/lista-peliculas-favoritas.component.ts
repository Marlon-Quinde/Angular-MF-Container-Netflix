import { Component } from '@angular/core';
import { AgregarFavoritosI } from '../../interfaces/agregar-favorito.interface';
import { PeliculasService } from '../../services/peliculas.service';
import { PeliculasI } from '../../interfaces/peliculas.interface';
import { UsuarioI } from '../../../auth/interfaces/auth.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-peliculas-favoritas',
  templateUrl: './lista-peliculas-favoritas.component.html',
  styleUrl: './lista-peliculas-favoritas.component.scss',
})
export class ListaPeliculasFavoritasComponent {
  public listMovies: PeliculasI[] = [];

  /**
   *
   */
  constructor(
    private _peliculasService: PeliculasService,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getListFavorites(this.getUserInfo().id!);
  }

  getUserInfo(): UsuarioI {
    return JSON.parse(localStorage.getItem('signInUsuario')!);
  }

  getListFavorites(id: string) {
    this._peliculasService.getListFavorites(id).subscribe({
      next: (res) => {
        this.listMovies = res.data.map((movie) => {
          return {
            ...movie,
            id: movie.movieId,
          } as any as PeliculasI;
        });
      },
    });
  }

  removeMovie(evento: { id: string; idMovie: string }) {
    this._peliculasService
      .removeMovieFavorite(evento.id, evento.idMovie)
      .subscribe({
        next: (res) => {
          this._toastr.success(res.message, res.code.toString());
          this.getListFavorites(this.getUserInfo().id!);
        },
        error: (err) => {
          this._toastr.error(err.error.message, err.error.code);
        },
      });
  }
}
