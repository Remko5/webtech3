import { Component, Input } from '@angular/core';
import { ApiErrorMessageInterface } from 'src/app/interfaces/ApiErrorMessageInterface';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  @Input() error?: ApiErrorMessageInterface;
}
