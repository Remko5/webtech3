import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AggregateComponent } from './components/aggregate/aggregate.component';
import { DatesComponent } from './components/dates/dates.component';
import { PlayersComponent } from './components/players/players.component';
import { InvalidTokenComponent } from './components/invalid-token/invalid-token.component';
import { ValidAccountCheckComponent } from './components/valid-account-check/valid-account-check.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AggregateComponent,
    DatesComponent,
    PlayersComponent,
    InvalidTokenComponent,
    ValidAccountCheckComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [HttpClientModule, 
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
