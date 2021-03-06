import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {AppRoutingModule} from '../app-routing.module';



@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class LayoutModule { }
