import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import {CookieService} from "ngx-cookie-service";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoginComponent } from './components/login/login.component';
import { ApiServiceService } from './services/api-service.service';
import { AuthService } from './services/auth.service';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CookieService, 
              HttpClientModule,
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
              ApiServiceService,
              AuthService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
