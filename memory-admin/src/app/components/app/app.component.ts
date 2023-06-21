import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memory-admin';

  constructor(private cookieService: CookieService, private authService: AuthService) {}

  ngOnInit(): void {
    this.autoLogIn();
  }

  autoLogIn() {
    let t: string | null = new URL(window.location.href).searchParams.get("t");
    if(t != null && this.authService.isAdmin(t)){
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
