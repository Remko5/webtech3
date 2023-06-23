import { Component, Input } from '@angular/core';
import { DateInterface } from 'src/app/interfaces/DatesInterface';

const displayDatesColumns: Array<string> = ['date', 'amountPlayed'];

@Component({
  selector: 'app-dates-table',
  templateUrl: './dates-table.component.html',
  styleUrls: ['./dates-table.component.css']
})
export class DatesTableComponent {
  @Input() dates: Array<DateInterface>  = new Array;
  displayedColumns: Array<string> = displayDatesColumns;
}
