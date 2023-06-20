import { Component } from '@angular/core';
import { InvalidTokenInterface } from 'src/app/interfaces/InvalidTokenInterface';

@Component({
  selector: 'app-valid-account-check',
  templateUrl: './valid-account-check.component.html',
  styleUrls: ['./valid-account-check.component.css']
})
export class ValidAccountCheckComponent {
  token: InvalidTokenInterface;
  constructor() {
    this.token = new Object as InvalidTokenInterface;
    this.token.isValid = true;

  }

  showInvalidTokenComponent(token: InvalidTokenInterface) {
    if(this.token.isValid){
      this.token = token;
    }
  }
}
