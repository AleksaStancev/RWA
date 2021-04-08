import { from, Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { ChatClient } from "./chatclient";

export class ChatApp {
  private messageSenderReceiver: Subject<string>;
  private chatEnableDisable: Subject<boolean>;
  private onJoin: Subject<(string | boolean)[]>;

  private isRunning: boolean;
  private chatClients: ChatClient[];

  private enableDisableChatButton: HTMLButtonElement;

  constructor(chatClientNames: string[]) {
    this.enableDisableChatButton = document.createElement("button");

    this.messageSenderReceiver = new Subject<string>();
    this.chatEnableDisable = new Subject<boolean>();
    this.onJoin = new Subject<(string | boolean)[]>();
    this.onJoin
      .pipe(filter((val) => val.length === 1))
      .subscribe((chatClientName) =>
        this.onJoin.next([chatClientName[0], this.isRunning])
      );

    this.isRunning = false;
    this.chatClients = [];
    from(chatClientNames).subscribe((chatClientName) =>
      this.chatClients.push(
        new ChatClient(
          chatClientName,
          this.messageSenderReceiver,
          this.chatEnableDisable,
          this.onJoin
        )
      )
    );
  }
  render(): void {
    const chatClientContainer: HTMLDivElement = document.createElement("div");
    chatClientContainer.className = "chatClientContainer";
    this.enableDisableChatButton.className = "enableDisableChatButton";
    this.enableDisableChatButton.onclick = () =>
      this.enableDisableChatButtonHandle();
    this.enableDisableChatButton.innerText = "Enable chat";
    document.body.appendChild(this.enableDisableChatButton);
    document.body.appendChild(chatClientContainer);
    from(this.chatClients).subscribe((chatClient) =>
      chatClient.render(chatClientContainer)
    );
  }
  private enableDisableChatButtonHandle(): void {
    this.isRunning
      ? (this.enableDisableChatButton.innerText = "Enable chat")
      : (this.enableDisableChatButton.innerText = "Disable chat");
    this.isRunning = !this.isRunning;
    this.chatEnableDisable.next(this.isRunning);
  }
}
