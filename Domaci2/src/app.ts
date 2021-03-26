import { cookBurger, cutLettuce, cutTomato, toastBun } from "./asyncfuncs";


export class App 
{
    private buttonClickable:boolean;
    constructor()
    {
        this.buttonClickable=true;
    }

    render()
    {
        const buttonContainer:HTMLDivElement = document.createElement("div");
        buttonContainer.className="buttonContainer";

        let button:HTMLButtonElement = document.createElement("button");
        button.textContent="Sequential process";
        button.onclick = () => 
        {
            if(this.buttonClickable) this.sequentialMake(burgerContainer);
        }
        buttonContainer.append(button);


        button=document.createElement("button");
        button.textContent="Parallel process";
        button.onclick =  () => 
        {
            if(this.buttonClickable) this.parallelMake(burgerContainer);          
        }
        buttonContainer.append(button);
       

        button=document.createElement("button");
        button.textContent="Wait for all";
        button.onclick = () =>
        {
            if(this.buttonClickable) this.waitForAll(burgerContainer);
        }
        buttonContainer.append(button);
        

        document.body.append(buttonContainer);

        const container:HTMLDivElement = document.createElement("div");
        container.className="container";
        document.body.append(container);

        const taskContainer:HTMLDivElement = document.createElement("div");
        taskContainer.className="taskContainer";
        container.append(taskContainer);

        let div:HTMLDivElement = document.createElement("div");
        div.className="tasks";
        taskContainer.append("To do:");      
        taskContainer.append(div);

        div = document.createElement("div");
        div.className="tasks";
        taskContainer.append("Doing:");      
        taskContainer.append(div);

        div = document.createElement("div");
        div.className="tasks";
        taskContainer.append("Done:");      
        taskContainer.append(div);

        const burgerContainer:HTMLDivElement = document.createElement("div");
        burgerContainer.className="burgerContainer";
        container.append(burgerContainer);
    }

    private async parallelMake(burgerContainer:HTMLElement)
    {
        this.buttonClickable=false;
        this.resetUI();      
        setTimeout(async () => 
        {
            const topBun = toastBun(true);
            this.moveToDoing("TopBun");
            const tomato = cutTomato();
            this.moveToDoing("Tomato");
            const patt = cookBurger();
            this.moveToDoing("Burger");
            const lettuce = cutLettuce();
            this.moveToDoing("Lettuce");
            const botBun = toastBun(false);
            this.moveToDoing("BotBun");
    
            burgerContainer.append(await botBun);
            burgerContainer.append(await lettuce);
            burgerContainer.append(await patt);
            burgerContainer.append(await tomato);
            burgerContainer.append(await topBun);   
            this.buttonClickable=true;   
        }, 1000);      
    }

    private async waitForAll(burgerContainer:HTMLElement)
    {
        this.buttonClickable=false;
        this.resetUI();
        setTimeout(() => 
        {
            this.moveToDoing("TopBun");
            this.moveToDoing("Tomato");
            this.moveToDoing("Burger");
            this.moveToDoing("Lettuce");
            this.moveToDoing("BotBun");

        Promise.all
        (
            [
                toastBun(false),
                cutLettuce(),
                cookBurger(),
                cutTomato(),
                toastBun(true)
            ]
        )
        .then(array => array.forEach(element => 
        {
            burgerContainer.append(element);
        }));
        this.buttonClickable=true;    
        }, 1000);        
    }

    private async sequentialMake(burgerContainer:HTMLElement)
    {
        this.buttonClickable=false;
        this.resetUI();
        setTimeout(async () => 
        {
            this.moveToDoing("BotBun");
            burgerContainer.append(await toastBun(false));
            this.moveToDoing("Lettuce");
            burgerContainer.append(await cutLettuce());
            this.moveToDoing("Burger");
            burgerContainer.append(await cookBurger());
            this.moveToDoing("Tomato");
            burgerContainer.append(await cutTomato());
            this.moveToDoing("TopBun");
            burgerContainer.append(await toastBun(true));

            this.buttonClickable=true;    
        }, 1000);
    }

    private resetUI ()
    {
        const toDoDiv:HTMLCollectionOf<Element> = document.getElementsByClassName("tasks");    

        let paragraph:HTMLParagraphElement = document.createElement("p");
        paragraph.textContent="Toast bot bun";  
        paragraph.id="BotBun"; 
        toDoDiv[0].append(paragraph);

        paragraph = document.createElement("p");
        paragraph.textContent="Cut lettuce";   
        paragraph.id="Lettuce";
        toDoDiv[0].append(paragraph);

        paragraph = document.createElement("p");
        paragraph.textContent="Cook burger";   
        paragraph.id="Burger";
        toDoDiv[0].append(paragraph);
        
        paragraph = document.createElement("p");
        paragraph.textContent="Cut tomato";   
        paragraph.id="Tomato";
        toDoDiv[0].append(paragraph);
        
        paragraph = document.createElement("p");
        paragraph.textContent="Toast top bun";   
        paragraph.id = "TopBun";
        toDoDiv[0].append(paragraph);

        document.getElementsByClassName("tasks")[2].innerHTML=null; 
        document.getElementsByClassName("burgerContainer")[0].innerHTML=null;
    }

    private moveToDoing (id:string)
    {
        document.getElementsByClassName("tasks")[1].append(document.getElementById(id));
    }
    
}