import { Matrix } from "./matrix";

export class Game
{
    private imageRefs:string[];
    private delay:number;
    private matrixContainer:HTMLElement;
    private matrix:Matrix;
    constructor(imageRefs:string[],delay:number)
    {
        this.imageRefs=imageRefs;
        this.delay=delay;
        this.matrixContainer=null;
        this.matrix=null;
        let title = document.createElement("div");
        title.className="button-container";
        title.innerHTML="Memory game";
        title.setAttribute("style","font-size: 50px; font-family: 'Lobster', cursive;")
        document.body.appendChild(title);     
    }

    start()
    {
        let randomArray:string[]=[];
        this.imageRefs.forEach((element) =>
        {
            randomArray.push(element);
            randomArray.push(element);
        });
        this.shuffle(randomArray);
        this.matrixContainer = document.createElement("div");
        this.matrixContainer.className="center";
        document.body.appendChild(this.matrixContainer);
        this.matrix = new Matrix(randomArray,this.matrixContainer,this.delay,this);
        this.matrix.draw();
    }
     restart ()
    {
        let container = document.createElement("div");
        container.className="button-container";
        let button = document.createElement("a");
        button.href="#";
        button.className="button";
        button.onclick = () => 
        {
            this.matrixContainer.remove();
            this.start();           
            button.remove();
        }
        container.appendChild(button);
        document.body.appendChild(container);
    }
    private shuffle(array:string[]) 
    {
        let currentIndex:number = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) 
        {      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
    }
}