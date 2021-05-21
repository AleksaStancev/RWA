import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/Player';
import { Position } from '../models/Position';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playersUrl = 'http://localhost:3000/players';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl);
  }
}
