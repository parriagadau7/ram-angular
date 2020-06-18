import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CharacterComponent} from './character/character.component';


const routesLazy: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'character',
    loadChildren: () => import('./character/character.module').then(m => m.CharacterModule),
  },
  {
    path: '**',
    redirectTo: '',
  }
];

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'character', component: CharacterComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routesLazy)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
