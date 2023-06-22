import { Component, Input } from '@angular/core';
import { AggregateGamesInterface } from 'src/app/interfaces/AggregateGamesInterface';
import { AggregatePlayersInterface } from 'src/app/interfaces/AggregatePlayersInterface';
import { AmountGamesPlayersInterface } from 'src/app/interfaces/AmountGamesPlayersInterface';
import { DateInterface } from 'src/app/interfaces/DatesInterface';
import { PlayersInterface } from 'src/app/interfaces/PlayersInterface';

const displayAggregateColumns: Array<string> = ['aantal_spellen', 'aantal_spelers'];
const displayDatesColumns: Array<string> = ['date', 'amountPlayed'];
const displayPlayersColumns: Array<string> = ['username', 'email'];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  @Input() aggregate: Array<AggregatePlayersInterface | AggregateGamesInterface | AmountGamesPlayersInterface>  = new Array;
  @Input() dates: Array<DateInterface>  = new Array;
  @Input() players: Array<PlayersInterface> = new Array;
  displayedColumns: Array<string> = new Array;
  
  constructor(){}
  
  ngOnInit(): void {
    if(this.aggregate.length != 0){
      this.displayedColumns = displayAggregateColumns;
      this.aggregate = [Object.assign(this.aggregate[0], this.aggregate[1])];
    }
    if(this.dates.length != 0){
      this.displayedColumns = displayDatesColumns;    
    }
    if(this.players.length != 0){
      this.displayedColumns = displayPlayersColumns
    }
  }
}
