import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css'],
})
export class CardCollectionComponent implements OnInit {
  players: Player[] = [];
  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService
      .getPlayers()
      .subscribe((players) => {this.players = players; console.log(this.players)});
  }
}
