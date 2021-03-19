import { Game } from "./game";

export class Matrix
{
    private imageRefs:string[];
    private host:HTMLElement
    private clickCount:number;
    private openedCards:HTMLElement[];
    private pairedCards:HTMLElement[];
    private delay:number;
    private game:Game;
    constructor(imageRefs:string[],host:HTMLElement,delay:number,game:Game)
    {
        if(imageRefs.length!=16)
        {
            throw new Error("Invalid array length!");
        }      
        this.imageRefs = imageRefs; 
        this.host=host;
        this.clickCount=0;
        this.openedCards=[];
        this.pairedCards=[];
        this.delay=delay;
        this.game=game;
    }

    draw()
    {
        let localHost = document.createElement("div");
        localHost.className="matrix";
        this.host.appendChild(localHost);

        this.imageRefs.forEach(element => 
            {
                let el = document.createElement("div");
                el.className = "card";
                let img = document.createElement("img")
                img.src = element;
                img.className="img";
                img.draggable=false;
                img.onclick = () =>
                {   
                    if(this.openedCards.length <= 1 && !this.openedCards.includes(img) && !this.pairedCards.includes(img))
                    {
                        this.clickCount++;
                        this.openedCards.push(img);
                        img.setAttribute("style","opacity:1;");
                        if(this.openedCards.length > 1)
                        {   
                            if(this.openedCards[0].getAttribute("src") === this.openedCards[1].getAttribute("src"))
                            {
                                this.pairedCards.push(this.openedCards[0]);
                                this.pairedCards.push(this.openedCards[1]);
                                if(this.pairedCards.length===16) this.game.restart();
                                this.openedCards=[];
                            }
                            else
                            {
                                setTimeout(() => 
                                {
                                    this.openedCards[0].setAttribute("style","opacity:0;");
                                    this.openedCards[1].setAttribute("style","opacity:0;");
                                    this.openedCards=[];
                                }, this.delay);
                            }
                        }               
                    }             
                }
                el.appendChild(img);
                localHost.appendChild(el);  
            });
    }
}