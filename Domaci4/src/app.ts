import {
  combineLatest,
  concat,
  from,
  fromEvent,
  interval,
  merge,
  Observable,
} from "rxjs";
import {
  bufferCount,
  delay,
  filter,
  map,
  mergeMap,
  switchMap,
  take,
} from "rxjs/operators";
import { Data } from "./dataInterface";

export class App {
  intervalDivTextArea: HTMLTextAreaElement;
  inputDivTextArea: HTMLTextAreaElement;
  dbDivTextArea: HTMLTextAreaElement;

  mergeDivTextArea: HTMLTextAreaElement;
  concatDivTextArea: HTMLTextAreaElement;
  combinedDivTextArea: HTMLTextAreaElement;

  input: HTMLInputElement;

  intervalObservable: Observable<string>;
  inputObservable: Observable<string>;
  databaseObservable: Observable<string>;

  mergeObservable: Observable<string>;
  combineLatestObservable: Observable<string>;
  concatObservable: Observable<string>;
  constructor() {
    this.uiInit(document.body);
    this.createObservables(500, 10, 5, 800);
  }
  run(): void {
    this.intervalObservable.subscribe((value) =>
      this.appendTextTo(value, this.intervalDivTextArea)
    );
    this.inputObservable.subscribe((value) =>
      this.appendTextTo(value, this.inputDivTextArea)
    );
    this.databaseObservable.subscribe((value) =>
      this.appendTextTo(value, this.dbDivTextArea)
    );

    this.databaseObservable.subscribe((value) =>
      this.appendTextTo(value, this.dbDivTextArea)
    );

    this.mergeObservable.subscribe((value) =>
      this.appendTextTo(value, this.mergeDivTextArea)
    );

    this.concatObservable.subscribe((value) =>
      this.appendTextTo(value, this.concatDivTextArea)
    );

    this.combineLatestObservable.subscribe((value) =>
      this.appendTextTo(value, this.combinedDivTextArea)
    );
  }
  private appendTextTo(text: string, textArea: HTMLTextAreaElement): void {
    textArea.value += `${text}\n`;
  }
  private createObservables(
    intervalTime: number,
    takeNumber: number,
    bufferLength: number,
    dataMergeInterval: number
  ) {
    this.intervalObservable = interval(intervalTime).pipe(
      take(takeNumber),
      map((value) => value.toString())
    );
    this.inputObservable = fromEvent(this.input, "input").pipe(
      map(() => this.input.value.substr(-1)),
      filter((val) => val != " "),
      bufferCount(bufferLength),
      delay(100),
      switchMap((buffer) => {
        const temp = from(buffer);
        this.input.value = "";
        return temp;
      })
    );

    this.databaseObservable = from(
      fetch("http://localhost:3000/strings").then((response) => response.json())
    ).pipe(
      switchMap((jsondata) => jsondata),
      map((data: Data) => data.data),
      mergeMap((val) =>
        interval(dataMergeInterval).pipe(
          take(val.length),
          map((value) => val[value])
        )
      )
    );

    this.mergeObservable = merge(
      this.intervalObservable.pipe(map((val) => `Interval obser: ${val}`)),
      this.inputObservable.pipe(map((val) => `Input obser: ${val}`)),
      this.databaseObservable.pipe(map((val) => `Database obser: ${val}`))
    );

    this.concatObservable = concat(
      this.intervalObservable.pipe(map((val) => `Interval obser: ${val}`)),
      this.databaseObservable.pipe(map((val) => `Database obser: ${val}`))
    );

    this.combineLatestObservable = combineLatest(
      this.intervalObservable.pipe(map((val) => `Interval o: ${val}`)),
      this.inputObservable.pipe(map((val) => `Input o: ${val}`))
    ).pipe(map((value) => `${value[0]},${value[1]}`));
  }

  private uiInit(container: HTMLElement): void {
    const topContainer: HTMLDivElement = document.createElement("div");
    topContainer.className = "container";
    const botContainer: HTMLDivElement = document.createElement("div");
    botContainer.className = "container";

    this.input = null;
    this.intervalDivTextArea = this.createDiv(
      topContainer,
      "Interval observable",
      "obserDiv"
    );
    this.inputDivTextArea = this.createDiv(
      topContainer,
      "Input observable",
      "obserDiv",
      this.input
    );
    this.dbDivTextArea = this.createDiv(
      topContainer,
      "Database observable",
      "obserDiv"
    );

    this.mergeDivTextArea = this.createDiv(
      botContainer,
      "Merged observables",
      "obserDiv"
    );

    this.concatDivTextArea = this.createDiv(
      botContainer,
      "Concated observables 1 & 3",
      "obserDiv"
    );

    this.combinedDivTextArea = this.createDiv(
      botContainer,
      "Combined observables 1 & 2",
      "obserDiv"
    );

    container.appendChild(topContainer);
    container.appendChild(botContainer);
  }
  private createDiv(
    container: HTMLDivElement,
    title: string,
    className: string,
    input?: HTMLInputElement
  ): HTMLTextAreaElement {
    const textArea: HTMLTextAreaElement = document.createElement("textarea");
    textArea.readOnly = true;
    const div = document.createElement("div");
    div.className = className;
    div.innerText = title;
    if (input === null)
      div.appendChild((this.input = document.createElement("input")));
    div.appendChild(textArea);
    container.appendChild(div);
    return textArea;
  }
}
