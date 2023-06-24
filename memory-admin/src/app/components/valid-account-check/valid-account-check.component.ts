import { Component } from '@angular/core';
import { ApiErrorInterface } from 'src/app/interfaces/ApiErrorInterface';

@Component({
  selector: 'app-valid-account-check',
  templateUrl: './valid-account-check.component.html',
  styleUrls: ['./valid-account-check.component.css']
})
export class ValidAccountCheckComponent {
  token: ApiErrorInterface;
  customErrorMessage: string = "🤷 Oops, het lijkt erop dat je opnieuw moet inloggen. 🤷";

  constructor() {
    this.token = new Object as ApiErrorInterface;
    this.token.error = false;

  }

  showInvalidTokenComponent(token: ApiErrorInterface) {
    if(!this.token.error){
      this.token = token;
      this.token.apiErrorMessage.customMessage = this.customErrorMessage;
    }
  }
}
