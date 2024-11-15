import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { SharedModule } from '../../shared/shared.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';


@NgModule({
  declarations: [
    LayoutComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

    SharedModule,
  ]
})
export class HomeModule { }
