import { Component, Output, EventEmitter } from '@angular/core';
import { InvalidTokenInterface } from 'src/app/interfaces/InvalidTokenInterface';
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
  @Output() invalidToken = new EventEmitter<InvalidTokenInterface>();

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
        this.invalidToken.emit(this.errorService.generate401ErrorObject(error));
      }    
  });
  }
}
