import { Injectable } from '@angular/core';
import { environments } from '../../../env/environments';
import { HttpClient } from '@angular/common/http';
import { PeliculaDetalleI, ResponseGenresI, ResponseTMDB } from '../interfaces/peliculas.interface';
import { AgregarFavoritosI } from '../interfaces/agregar-favorito.interface';
import { ResponseI } from '../../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private _baseUrl: string = environments.baseUrl;
  private _apiTMDB: string = environments.apiTMDB;

  constructor(private _http: HttpClient) { }

  getMovies(params?: any){
    const url: string = `${this._apiTMDB}/discover/movie
`
    return this._http.get<ResponseTMDB>(url, {
      params,
      headers: {
        "Authorization": `Bearer ${environments.tokenTMDB}`
      }
    })
  }

  getGenresTMDB(){
    const url: string = `${this._apiTMDB}/genre/movie/list`;
    return this._http.get<ResponseGenresI>(url, {
      params: {
        language: 'es'
      },
      headers: {
        "Authorization": `Bearer ${environments.tokenTMDB}`
      }
    })
  }

  findMovieById(id: string){
    const url: string = `${this._apiTMDB}/movie/${id}`
    return this._http.get<PeliculaDetalleI>(url, {
      params: {
        language: 'es-ES'
      },
      headers: {
        "Authorization": `Bearer ${environments.tokenTMDB}`
      }
    })
  }

  addFavoriteMovie(payload: AgregarFavoritosI){
    const url: string = `${this._baseUrl}/Pelicula_Favorita`;
    return this._http.post<ResponseI<string>>(url, payload)
  }


  getListFavorites(id: string){
    const url: string = `${this._baseUrl}/Pelicula_Favorita/${id}`;
    return this._http.get<ResponseI<AgregarFavoritosI[]>>(url)
  }

  removeMovieFavorite(id: string, idMovie: string){
    const url: string = `${this._baseUrl}/Pelicula_Favorita/${id}/${idMovie}`;
    return this._http.delete<ResponseI<string>>(url)
  }
}
