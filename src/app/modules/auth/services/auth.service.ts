import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../env/environments';
import { AuthFormI, UsuarioI } from '../interfaces/auth.interface';
import { ResponseI } from '../../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environments.baseUrl;
  constructor(private _http: HttpClient) { }

  signIn(payload: AuthFormI){
    const url: string = `${this._baseUrl}/Auth/Sign-In`;
    return this._http.post<ResponseI<UsuarioI>>(url, payload)
  }

  signUp(payload: UsuarioI){
    const url: string  = `${this._baseUrl}/Usuarios`
    return this._http.post<ResponseI<string>>(url, payload)
  }


}
