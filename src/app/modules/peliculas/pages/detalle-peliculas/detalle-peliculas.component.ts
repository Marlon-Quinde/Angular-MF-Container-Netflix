import { Component } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';
import { PeliculaDetalleI } from '../../interfaces/peliculas.interface';
import { ToastrService } from 'ngx-toastr';
import { UsuarioI } from '../../../auth/interfaces/auth.interface';
import { AgregarFavoritosI } from '../../interfaces/agregar-favorito.interface';

@Component({
  selector: 'app-detalle-peliculas',
  templateUrl: './detalle-peliculas.component.html',
  styleUrl: './detalle-peliculas.component.scss',
})
export class DetallePeliculasComponent {
  public idMovie: string;
  public detallePelicula!: PeliculaDetalleI;
  public styles: any;
  constructor(
    private _peliculaService: PeliculasService,
    private _params: ActivatedRoute,
    private _toastr: ToastrService
  ) {
    this.idMovie = this._params.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getMovieById(this.idMovie);
  }

  getMovieById(id: string) {
    this._peliculaService.findMovieById(id).subscribe({
      next: (res) => {
        this.styles = {
          'background-image': `url(${
            'https://image.tmdb.org/t/p/original' + res.backdrop_path
          })`,
        };
        this.detallePelicula = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserSesion() {
    return !!localStorage.getItem('signInUsuario');
  }

  getUserInfo(): UsuarioI {
    return JSON.parse(localStorage.getItem('signInUsuario')!);
  }

  addFavoriteMovie() {
    const favorito: AgregarFavoritosI = {
      movieId: this.detallePelicula.id.toString(),
      overview: this.detallePelicula.overview,
      poster_path: this.detallePelicula.poster_path,
      usuarioId: Number(this.getUserInfo().id!),
      title: this.detallePelicula.title,
    };
    this._peliculaService.addFavoriteMovie(favorito).subscribe({
      next: (res) => {
        this._toastr.success(res.message, res.code.toFixed());
      },
      error: (err) => {
        this._toastr.error(err.error.message, err.error.code.toFixed());
      },
    });

  }
}
