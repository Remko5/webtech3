import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  apiRequest(endpoint: string): Observable<Object> {
    const apiUrl: string = "http://localhost:8000/api/admin/" + endpoint;
    const bearerToken: string = this.cookieService.get('token');

    const headers = new HttpHeaders({
      "Authorization": `Bearer ${bearerToken}`,
      "Accept": "application/json"
    });

    let httpOptions = {
      headers: headers,
    }
    
    return this.http.get(apiUrl, httpOptions);
  }
}
