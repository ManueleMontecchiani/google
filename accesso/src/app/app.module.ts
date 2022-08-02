import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';

import { SigninComponent } from './Components/signin/signin.component';
import { BetterColorDirective } from './BetterColor/better-color.directive';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';

import { LoginComponent } from './Components/login/login.component'; 
import { AreaPrivataComponent } from './Components/area-privata/area-privata.component'; 
import { HeaderComponent } from './Components/header/header.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,  
    HeaderComponent,
    SigninComponent,
    BetterColorDirective,
    AreaPrivataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
