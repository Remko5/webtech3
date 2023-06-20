import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memory-admin';

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.autoLogIn();
  }

  autoLogIn() {
    let t: string | null = new URL(window.location.href).searchParams.get("t");
    if(t != null){
      this.cookieService.set('token', t);
      window.location.href = "http://localhost:4200";
    }
  }
  
  logout() {
    this.cookieService.delete('token'); 
    location.reload();
  }

  isLoggedIn(){
    return this.cookieService.check('token');
  }
}
