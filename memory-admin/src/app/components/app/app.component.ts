import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { AggregateInterface } from 'src/app/interfaces/AggregateInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memory-admin';
  t: string | null = null;

  constructor(public cookieService: CookieService) {}

  ngOnInit(): void {
    this.t = new URL(window.location.href).searchParams.get("t");
    if(this.t != null){
      this.cookieService.set('token', this.t);
      window.location.href = "http://localhost:4200";
    }
  }

  logout() {
    this.cookieService.delete('token'); 
    location.reload();
  }
}
