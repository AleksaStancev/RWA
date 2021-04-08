import { Subject, Subscription } from "rxjs";
import { filter, repeatWhen, takeUntil } from "rxjs/operators";

export class ChatClient {
  private clientUsername: string;
  private inChat: boolean;

  private messagesTextArea: HTMLTextAreaElement;
  private input: HTMLTextAreaElement;
  private sendButton: HTMLButtonElement;
  private joineLeaveButton: HTMLButtonElement;

  private messageSenderReceiver: Subject<string>;
  private chatEnableDisable: Subject<boolean>;
  private onJoin: Subject<(string | boolean)[]>;

  private chatSubscriptions: Subscription;

  constructor(
    clientUsername: string,
    messageSenderReceiver: Subject<string>,
    chatEnableDisable: Subject<boolean>,
    onJoin: Subject<(string | boolean)[]>
  ) {
    this.clientUsername = clientUsername;
    this.inChat = false;

    this.messagesTextArea = document.createElement("textarea");
    this.input = document.createElement("textarea");
    this.sendButton = document.createElement("button");
    this.joineLeaveButton = document.createElement("button");

    this.messageSenderReceiver = messageSenderReceiver;
    this.chatEnableDisable = chatEnableDisable;
    this.onJoin = onJoin;

    this.chatSubscriptions = null;
  }

  render(chatClientContainer: HTMLDivElement): void {
    const container: HTMLDivElement = document.createElement("div");
    const background: HTMLDivElement = document.createElement("div");
    background.className = "chatClientBackground";
    const chatContainer: HTMLDivElement = document.createElement("div");
    chatContainer.className = "chatClientChatContainer";

    const clientName: HTMLElement = document.createElement("h4");
    clientName.innerText = this.clientUsername;
    background.appendChild(clientName);

    this.joineLeaveButton.innerHTML = "Join chat";
    this.joineLeaveButton.onclick = () => this.joineLeaveButtonHandler();
    background.appendChild(this.joineLeaveButton);

    this.messagesTextArea.readOnly = true;
    this.messagesTextArea.cols = 40;
    this.messagesTextArea.rows = 10;
    this.messagesTextArea.className = "textArea";
    this.messagesTextArea.disabled = true;

    this.sendButton.innerText = "Send";
    this.sendButton.disabled = true;
    this.sendButton.onclick = () => this.sendButtonHandler();

    this.input.className = "inputTextArea";
    this.input.placeholder = "Join chat";
    this.input.disabled = true;
    this.input.oninput = () =>
      this.input.value === ""
        ? (this.sendButton.disabled = true)
        : (this.sendButton.disabled = false);

    chatContainer.appendChild(this.messagesTextArea);
    chatContainer.appendChild(this.input);
    chatContainer.appendChild(this.sendButton);

    background.appendChild(chatContainer);

    container.appendChild(background);

    chatClientContainer.appendChild(container);
  }
  private messageSenderReceiverSubscriptionMethod(message: string): void {
    this.messagesTextArea.textContent += message + "\r";
  }
  private chatEnableDisableSubscriptionMethod(isEnabled: boolean): void {
    if (isEnabled) {
      this.input.disabled = false;
      this.input.placeholder = "Message content";
    } else {
      this.input.disabled = true;
      this.input.value = "";
      this.input.placeholder = "Chat is disabled";
    }
    this.sendButton.disabled = true;
  }
  private sendButtonHandler(): void {
    if (this.input.value !== "") {
      this.messageSenderReceiver.next(
        `${this.clientUsername}: ${this.input.value}`.trim()
      );
      this.sendButton.disabled = true;
      this.input.value = "";
    }
  }
  private joineLeaveButtonHandler(): void {
    if (this.inChat) {
      this.chatSubscriptions.unsubscribe();
      this.joineLeaveButton.innerText = "Join chat";
      this.input.placeholder = "Join chat";
      this.input.disabled = true;
    } else {
      this.joineLeaveButton.innerText = "Leave chat";
      this.input.placeholder = "Message content";
      const startChat = this.chatEnableDisable.pipe(
        filter((isEnabled) => isEnabled)
      );
      const endChat = this.chatEnableDisable.pipe(
        filter((isEnabled) => !isEnabled)
      );
      this.chatSubscriptions = this.messageSenderReceiver
        .pipe(
          takeUntil(endChat),
          repeatWhen(() => startChat)
        )
        .subscribe((message) =>
          this.messageSenderReceiverSubscriptionMethod(message)
        );
      this.chatSubscriptions.add(
        this.onJoin
          .pipe(
            filter(
              (chatClientNameAndIsEnabled) =>
                chatClientNameAndIsEnabled.length === 2 &&
                chatClientNameAndIsEnabled[0] === this.clientUsername
            )
          )
          .subscribe((chatClientNameAndIsEnabled) =>
            this.chatEnableDisableSubscriptionMethod(
              Boolean(chatClientNameAndIsEnabled[1])
            )
          )
      );
      this.chatSubscriptions.add(
        this.chatEnableDisable.subscribe((isEnabled) =>
          this.chatEnableDisableSubscriptionMethod(isEnabled)
        )
      );
      this.onJoin.next([this.clientUsername]);
    }
    this.inChat = !this.inChat;
    this.messagesTextArea.disabled = !this.messagesTextArea.disabled;
  }
}
