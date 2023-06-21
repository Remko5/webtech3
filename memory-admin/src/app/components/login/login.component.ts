import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { ApiErrorInterface } from 'src/app/interfaces/ApiErrorInterface';
import { ApiErrorMessageInterface } from 'src/app/interfaces/ApiErrorMessageInterface';
import { TokenInterface } from 'src/app/interfaces/TokenInterface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  apiError: ApiErrorInterface;
  adminError: ApiErrorInterface;
  apiErrorMessage: string = "Combinatie gebruikersnaam en wachtwoord niet geldig."
  adminErrorMessage: string = "Alleen accounts met rol admin kunnen hier inloggen."

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor(private authService: AuthService, private cookieService: CookieService, private errorService: ErrorService){
    this.apiError = new Object as ApiErrorInterface;
    this.adminError = new Object as ApiErrorInterface;
    this.apiError.apiErrorMessage = new Object as ApiErrorMessageInterface;
    this.adminError.apiErrorMessage = new Object as ApiErrorMessageInterface;
  }

  async login(): Promise<void> {
    this.apiError.error = false;
    this.adminError.error = false;
    
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const formValue = this.loginForm.value;

    let username: string = formValue.username!;
    let password: string = formValue.password!;

    this.authService.login(username, password).subscribe(data => {
      let token: string = (data as TokenInterface).token
      if(this.authService.isAdmin(token)){
        this.cookieService.set('token', token);
        window.location.reload();
      } else{
        this.adminError.apiErrorMessage.customMessage = this.adminErrorMessage;
        this.adminError.error = true;
      }
    }, error => {
      if(error.status == 401){
        this.apiError.apiErrorMessage = this.errorService.generate401ErrorObject(error);
        this.apiError.apiErrorMessage.customMessage = this.apiErrorMessage;
        this.apiError.error = true;
      }      
    });
  }

  noAdmin(): boolean {
    return this.adminError.error;
  }

  hasApiError(): boolean {
    return this.apiError.error;
  }
}
