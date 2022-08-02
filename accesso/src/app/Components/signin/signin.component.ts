import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent{

  error = '';
  confPassErr= false;

  
  constructor(private router: Router, private authService :AuthService) { }


 onSubmit(form: NgForm) {
  if (!form.valid) {
    return;
  }
  const email = form.value.email;
  const password = form.value.password;
  const confPass = form.value.confPass;

  let authObsSignin: Observable<AuthResponseData>;

    authObsSignin = this.authService.signup(email, password);
  
  authObsSignin.subscribe(
    resData => {
      console.log(resData);
    
      this.router.navigate(['/login']);
    },
    errorMessage => {
      console.log(errorMessage);
      if(confPass != password){
        this.confPassErr = true;
       }
      this.error = errorMessage;      
    }
  );
  form.reset();
}

  onHandleError() {
    this.error = '';
  }


}

