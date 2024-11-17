import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthService } from './services/auth.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,

    SharedModule
  ],
  providers: [
    AuthService,
    provideHttpClient(withInterceptorsFromDi()) // Nueva configuración
  ],
})
export class AuthModule { }
