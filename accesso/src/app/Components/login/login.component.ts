import { Component } from '@angular/core';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData , AuthService } from 'src/app/Shared/auth.service';
import { UserCredential } from 'firebase/auth';
import { PostsService } from 'src/app/Shared/posts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error = '';
  tokenId : Promise<string>;
  logInForm : FormGroup ;
  firebaseErrorMessage: string ;

  constructor( private router: Router , private authService: AuthService, private postService: PostsService) { 
    this.logInForm = new FormGroup ({
      'email': new FormControl('', [Validators.required , Validators.email]),
      'password': new FormControl('' , Validators.required)
    });
     this.firebaseErrorMessage = '' ;
  }
   
    onSubmit(form: NgForm) {
      if (!form.valid) {
        return;
      }
      const email = form.value.email;
      const password = form.value.password;
  
      let authObsLogin: Observable<AuthResponseData>;

        authObsLogin = this.authService.login(email, password);
      
      authObsLogin.subscribe(
        resData => {
          console.log(resData);
          this.router.navigate(['']);
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;         
        }
      );
      form.reset();
    }
  
    onHandleError() {
      this.error = '';
    }


    logInUser(){
      if(this.logInForm.invalid)
      return;
  
      this.authService.logInUser(this.logInForm.value.email, this.logInForm.value.password)
      .then(
        (result) => {
          console.log(result);
          if(result != null) {
            this.postService.tokenId = (result as UserCredential).user.getIdToken().then((token) => token);
            this.router.navigate(['/header']);
          } 
          else if (result.isValid == false) {
            console.log('login error' , result)
            this.firebaseErrorMessage = result.message;
          }
      });
    }


}
