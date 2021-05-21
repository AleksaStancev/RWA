import { PlayerClubDob } from './PlayerClubDob';
import { Position } from './Position';
import { Statistics } from './Statistics';

export interface Player {
  name: string;
  surname: string;
  playerClubDob: PlayerClubDob
  avatarSrc: string;
  imageSrc: string;
  position: Position;
 
  statistics: Statistics;
}
