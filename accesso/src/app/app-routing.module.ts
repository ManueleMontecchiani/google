import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AreaPrivataComponent } from './Components/area-privata/area-privata.component';
import { HeaderComponent } from './Components/header/header.component';

import { LoginComponent } from './Components/login/login.component';
import { SigninComponent } from './Components/signin/signin.component';




const routes: Routes = [
  {path: '',  redirectTo: '/header', pathMatch: 'full' },
  {path: 'header',  component: HeaderComponent,},
  {path: 'signin', component: SigninComponent},
  {path: 'login', component: LoginComponent},
  {path: 'area-privata', component: AreaPrivataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }