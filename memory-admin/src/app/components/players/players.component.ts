import { Component, Output, EventEmitter } from '@angular/core';

import { ApiErrorInterface } from 'src/app/interfaces/ApiErrorInterface';
import { PlayersInterface } from 'src/app/interfaces/PlayersInterface';

import { ApiService } from 'src/app/services/api-service.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  players?: Array<PlayersInterface>;
  @Output() invalidToken = new EventEmitter<ApiErrorInterface>();

  constructor(private apiService: ApiService, private errorService: ErrorService) {}

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.apiService.apiRequest('players')
    .subscribe(resp => {
        this.players = resp as Array<PlayersInterface>;
    }, error => {
      if(error.status == 401){
        console.log("players");
        this.invalidToken.emit(this.errorService.generateErrorObject(error));
      }    
  });
  }
}
