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
import { ValidAccountCheckComponent } from './components/valid-account-check/valid-account-check.component';
import { ErrorComponent } from './components/error/error.component';
import { NgChartsModule } from 'ng2-charts';
import { TableComponent } from './components/table/table.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AggregateComponent,
    DatesComponent,
    PlayersComponent,
    ValidAccountCheckComponent,
    ErrorComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule,
    MatTableModule
  ],
  providers: [HttpClientModule, 
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
