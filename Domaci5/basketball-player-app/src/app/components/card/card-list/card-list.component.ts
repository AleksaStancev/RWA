import { Component, Input, OnInit } from '@angular/core';
import { PlayerClubDob } from 'src/app/models/PlayerClubDob';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  @Input() playerClubDob?: PlayerClubDob
  constructor() { }

  ngOnInit(): void {
  }

}
