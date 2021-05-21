import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { Position } from 'src/app/models/Position';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() player?: Player;
  constructor() {

  }

  ngOnInit(): void {}
}
