import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignUpFormI, UsuarioI } from '../../interfaces/auth.interface';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../../shared/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  public signUpForm: FormGroup;

  /**
   *
   */
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _toastr: ToastrService,
    private _sharedService: SharedService,
    private _router: Router
  ) {
    this.signUpForm = this.createSignUpForm();
  }

  createSignUpForm() {
    return this._fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
      terminosYCondiciones: [false, [Validators.required]]
    });
  }

  signUp() {
    if (this.signUpForm.invalid) {
      this._toastr.error('Debe llenar todos los campos', 'Formulario invalido');
      return;
    }

    const usuario: SignUpFormI = this.signUpForm.value;
    const {terminosYCondiciones, ...rest} = usuario

    if(!terminosYCondiciones){
      this._toastr.error('Debe aceptar los terminos y condiciones');
      return;
    }
    if (usuario.password !== usuario.repeatPassword) {
      this._toastr.error('Las contraseñas no coinciden');
      return;
    }

    this._authService.signUp(rest).subscribe({
      next: (res) => {
        this._toastr.success(res.message, res.code.toString());
        this._router.navigateByUrl('/auth/sign-in')
      },
      error: (err) => {
        this._toastr.error(err.error.message, err.error.code.toString());
      },
    });
  }

  getErrors(nameForUsers: string, nameControl: string) {
    return this._sharedService.getErrors(
      nameForUsers,
      nameControl,
      this.signUpForm
    );
  }
}
