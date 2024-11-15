import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('usuario/UsuarioModule').then(m => m.UsuarioModule)
  },

];
