import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { __values } from 'tslib';




export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  
}




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User ;
  userLoggedIn: boolean;
  error = new Subject<string>();

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router ,
    private http: HttpClient
    ) {     this.userLoggedIn = false;

      this.afAuth.onAuthStateChanged((user) => {
        if(user) {
          this.userLoggedIn = true;
        } else {
          this.userLoggedIn = false;
        }
      });}

    email:string ;
  password: string;
  registered: boolean = false;


  logInUser(email: string , password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email,password)
        .then((userCred) => {
          console.log('Auth Service: utente: collegato');
          return userCred;
        })
        .catch(error => {
          console.log('Auth Service: errore con il login...');
          console.log('error code' , error.code);
          console.log('error' , error);
          if (error.code)
            return { isValid: false , message: error.message };
        });
  }



login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA6xb3EDrhQ5nxOK6R57hWDXT2xm2J8cmg',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      )
      .pipe(
        catchError(this.handleError)
      );
  }
  
    //per la registrazione 

    signup(email: string, password: string) {
      return this.http.post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA6xb3EDrhQ5nxOK6R57hWDXT2xm2J8cmg',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
  
      ).pipe(
        catchError(this.handleError)
      );
    }


    private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred'
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
  
      switch (errorRes.error.error.message) {
        case 'INVALID_PASSWORD':
          errorMessage = 'Password wrong';
          break;
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Email Not Found';
          break;
          default: 
          errorMessage = 'La password inserita non corrisponde a quella di conferma'
  
      }
      return throwError(errorMessage);
    
    }


    logout(){
      this.afAuth.signOut().then(
        () => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }, err => {
          alert(err.message);
        }    
      )
    }


    //password dimenticata

    passwordDimenticata(email: string){
      this.afAuth.sendPasswordResetEmail(email).then(
        () => {
          this.router.navigate(['/verifica-email']);
        }, err => {
          alert('Qualcosa è andato storto');
        }
      )
    }


    //password dimenticata

    sendEmailForVerification(user: any) {
      user.sendEmailForVerification().then(
        (res: any) => {
          this.router.navigate(['/verifica-email']);
        }, (error: any) => {
          alert('Qualcosa è andato storto. Ti abbiamo mandato una email');
        }
      )
    }

 
}
