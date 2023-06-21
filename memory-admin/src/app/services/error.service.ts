import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'
import { ApiErrorInterface } from '../interfaces/ApiErrorInterface';
import { ApiErrorMessageInterface } from '../interfaces/ApiErrorMessageInterface';
import { ApiErrorObjectInterface } from '../interfaces/ApiErrorObjectInterface';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  generate401ErrorObject(error: HttpErrorResponse): ApiErrorMessageInterface {
    let temp: ApiErrorMessageInterface = new Object as ApiErrorMessageInterface;
    let apiError: ApiErrorObjectInterface = error.error;
    temp.apiMessage = apiError.message;
    temp.code = apiError.code;
    return temp;
  }

  generateErrorObject(error: HttpErrorResponse): ApiErrorInterface {
    let temp: ApiErrorInterface = new Object as ApiErrorInterface;
    temp.apiErrorMessage = new Object as ApiErrorMessageInterface;
    let apiError: ApiErrorObjectInterface = error.error;
    temp.error = true;
    temp.apiErrorMessage.apiMessage = apiError.message;
    temp.apiErrorMessage.code = apiError.code;
    return temp;
  }

}
