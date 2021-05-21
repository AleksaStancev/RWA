import { Component, Input, OnInit } from '@angular/core';
import { Statistics } from 'src/app/models/Statistics';

@Component({
  selector: 'app-card-expansion-panel',
  templateUrl: './card-expansion-panel.component.html',
  styleUrls: ['./card-expansion-panel.component.css']
})
export class CardExpansionPanelComponent implements OnInit {
  @Input() statistics?:Statistics
  constructor() { }

  ngOnInit(): void {
  }

}
