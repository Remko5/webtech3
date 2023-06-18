import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { TokenInterface } from '../interfaces/TokenInterface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  async login(username: string, password: string) {
    const apiUrl: string = "http://localhost:8000/api/login_check";
    
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const body: Object = {"username": username, "password": password};

    let httpOptions = {
      headers: headers,
    }
    
    this.http.post(apiUrl, body, httpOptions)
    .subscribe(data => {
        this.cookieService.set('token', (data as TokenInterface).token);
        window.location.reload();
    });
  }
}
