import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioI } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() openDrawer: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   *
   */
  constructor(private _toastr: ToastrService, private _router: Router) {
  }

  emitOpenDrawer(){
    this.openDrawer.emit(true)
  }

  getUserSesion(){
    return !!localStorage.getItem('signInUsuario')
  }

  getUserInfo(): UsuarioI{
    return JSON.parse(localStorage.getItem('signInUsuario')!)
  }

  logout(){
    localStorage.clear();
    this._toastr.info('Sessión cerrada')
    this._router.navigateByUrl('/home/peliculas/lista')

  }

  signIn(){
    this._router.navigateByUrl('/auth/sign-in')
  }
}
