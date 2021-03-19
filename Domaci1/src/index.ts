import { Game } from './game';

const images:string[] =["./images/drum.png","./images/guitar.png","./images/electric-guitar.png", "./images/trumpet.png","./images/ukulele.png","./images/saxophone.png","./images/bass-guitar.png", "./images/french-horn.png"];

const game = new Game(images,500);

game.start();