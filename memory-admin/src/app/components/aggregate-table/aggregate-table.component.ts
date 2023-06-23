import { Component, Input } from '@angular/core';
import { AggregateGamesInterface } from 'src/app/interfaces/AggregateGamesInterface';
import { AggregatePlayersInterface } from 'src/app/interfaces/AggregatePlayersInterface';
import { AmountGamesPlayersInterface } from 'src/app/interfaces/AmountGamesPlayersInterface';

const displayAggregateColumns: Array<string> = ['aantal_spellen', 'aantal_spelers'];

@Component({
  selector: 'app-aggregate-table',
  templateUrl: './aggregate-table.component.html',
  styleUrls: ['./aggregate-table.component.css']
})
export class AggregateTableComponent {
  @Input() aggregate: Array<AggregatePlayersInterface | AggregateGamesInterface | AmountGamesPlayersInterface>  = new Array;
  displayedColumns: Array<string> = new Array;
  
  constructor(){}
  
  ngOnInit(): void {
    if(this.aggregate.length != 0){
      this.displayedColumns = displayAggregateColumns;
      this.aggregate = [Object.assign(this.aggregate[0], this.aggregate[1])];
    }
  }
}
