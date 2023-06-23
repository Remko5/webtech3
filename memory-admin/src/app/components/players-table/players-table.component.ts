import { Component, Input } from '@angular/core';
import { PlayersInterface } from 'src/app/interfaces/PlayersInterface';

const displayPlayersColumns: Array<string> = ['username', 'email'];

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent {
  @Input() players: Array<PlayersInterface> = new Array;
  displayedColumns: Array<string> = displayPlayersColumns;
}