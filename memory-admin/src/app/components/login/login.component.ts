import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor(private authService: AuthService){}

  async login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const formValue = this.loginForm.value;

    let username: string = formValue.username!;
    let password: string = formValue.password!;

    this.authService.login(username, password);
  }
}
