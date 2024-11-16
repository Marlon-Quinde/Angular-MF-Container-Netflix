import { Injectable } from '@angular/core';
import { environments } from '../../../env/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private _baseUrl: string = environments.apiTMDB

  constructor(private _http: HttpClient) { }

  getMoviesPopular(){
    const url: string = `${this._baseUrl}/now_playing`
    return this._http.get(url, {
      headers: {
        "Authorization": `Bearer ${environments.tokenTMDB}`
      }
    })
  }
}
