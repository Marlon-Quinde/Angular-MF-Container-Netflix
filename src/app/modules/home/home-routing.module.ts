import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { noAuthGuard } from '../../shared/guards/noAuth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'peliculas',
        loadChildren: () => import('../peliculas/peliculas.module').then( m => m.PeliculasModule)
      },
      {
        path: 'remote',
        canActivate: [noAuthGuard],
        loadChildren: () => import('usuario/UsuarioModule').then(m => m.UsuarioModule)
      },
      {
        path: '',
        redirectTo: 'peliculas',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
