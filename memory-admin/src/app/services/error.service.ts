import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'
import { InvalidTokenInterface } from '../interfaces/InvalidTokenInterface';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  generate401ErrorObject(error: HttpErrorResponse): InvalidTokenInterface {
    let temp: InvalidTokenInterface = new Object as InvalidTokenInterface;
    temp.isValid = false;
    temp.apiErrorMessage = error.error;
    return temp;
  }
}
