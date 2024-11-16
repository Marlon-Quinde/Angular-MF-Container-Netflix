import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { SharedModule } from '../../shared/shared.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


@NgModule({
  declarations: [
    LayoutComponent,
    ToolbarComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

    SharedModule,
  ]
})
export class HomeModule { }
