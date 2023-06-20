import { Component, Input } from '@angular/core';
import { InvalidTokenInterface } from 'src/app/interfaces/InvalidTokenInterface';

@Component({
  selector: 'app-invalid-token',
  templateUrl: './invalid-token.component.html',
  styleUrls: ['./invalid-token.component.css']
})
export class InvalidTokenComponent {
  @Input() token?: InvalidTokenInterface;
}
