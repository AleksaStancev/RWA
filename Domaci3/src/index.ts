import { ChatApp } from "./chatapp";

const clientNames: string[] = ["Klijent 1", "Klijent 2", "Klijent 3"];

const chatApp = new ChatApp(clientNames);
chatApp.render();
