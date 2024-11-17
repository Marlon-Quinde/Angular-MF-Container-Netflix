import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthFormI } from '../../interfaces/auth.interface';
import { Router } from '@angular/router';
import { SharedService } from '../../../../shared/services/shared.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  public signInForm: FormGroup;

  /**
   *
   */
  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _router: Router,
    private _sharedService: SharedService,
    private _authService: AuthService
  ) {
    this.signInForm = this.createSignInForm();
  }

  getErrors(nameForUsers: string, nameControl: string){
    return this._sharedService.getErrors(nameForUsers, nameControl, this.signInForm)
  }

  createSignInForm() {
    return this._fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
    });
  }

  signIn() {
    if (this.signInForm.invalid) {
      this._toastr.error('Rellene todos los cambos', 'Formulario invalido');
      return;
    }
    const signInForm: AuthFormI = this.signInForm.value;

    this._authService.signIn(signInForm).subscribe({
      next: (res) => {
        this._toastr.success(res.message, res.code.toString());
        localStorage.setItem('signInUsuario', JSON.stringify(res.data));
        this._router.navigateByUrl('/home/peliculas/lista')
      },
      error: (err) => {
        this._toastr.error(err.error.message, err.error.code.toString())
      }
    });
  }
}
