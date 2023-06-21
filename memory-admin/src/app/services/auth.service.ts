import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { JwtTokenPayload } from '../interfaces/JwtTokenPayload';
import jwtDecode from "jwt-decode";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private admin: string = "ROLE_ADMIN";

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<Object> {
    const apiUrl: string = "http://localhost:8000/api/login_check";
    
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const body: Object = {"username": username, "password": password};

    let httpOptions = {
      headers: headers,
    }
    
    return this.http.post(apiUrl, body, httpOptions);
  }

  isAdmin(token: string): boolean {
    let decodedToken: JwtTokenPayload;
    try {
      decodedToken = jwtDecode<JwtTokenPayload>(token);
    } catch (error) {
      return false;
    }
    return decodedToken.roles.includes(this.admin);
  }
}
