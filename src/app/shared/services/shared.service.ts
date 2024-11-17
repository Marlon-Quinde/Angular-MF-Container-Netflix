import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getErrors(nameForUser: string ,nameControl: string ,form: FormGroup): string | undefined{
    const errors = form.get(nameControl)?.errors

    if(!errors) return

    for (const error in errors) {
      switch (error) {
        case 'required':
          return `${nameForUser} es requerido.`
        case 'email':
          return `${nameForUser} no tiene un formato de correo valido.`
        default:
          return `Error? ${error}.`
      }
    }

    return
  }

}
