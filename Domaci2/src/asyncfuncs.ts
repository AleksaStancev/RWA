export async function toastBun(isTop:boolean) 
{
    return new Promise<HTMLDivElement> ((resolve) =>
    {
        setTimeout(() => 
        {
            const bun:HTMLDivElement = document.createElement("div");
            bun.className="bun";
            if(isTop) bun.style.borderRadius = "100px 100px 5px 5px";
            resolve(bun); 
            isTop ? moveToDone("TopBun") : moveToDone("BotBun");   
        }, 1500);
    });
}

export async function cookBurger() 
{
    return new Promise<HTMLDivElement> ((resolve) => 
    {
        setTimeout(() => 
        {
            const patty: HTMLDivElement = document.createElement("div");
            patty.className = "patty";
            resolve(patty);   
            moveToDone("Burger");  
        }, 2500);
    });   
}

export async function cutTomato() 
{
    return new Promise<HTMLDivElement> ((resolve) => 
    {
        setTimeout(() => 
        {
            const patty: HTMLDivElement = document.createElement("div");
            patty.className = "tomato";
            resolve(patty);  
            moveToDone("Tomato");   
        }, 1000);
    });   
}

export async function cutLettuce() 
{
    return new Promise<HTMLDivElement> ((resolve) => 
    {
        setTimeout(() => 
        {
            const patty: HTMLDivElement = document.createElement("div");
            patty.className = "lettuce";
            resolve(patty);   
            moveToDone("Lettuce");  
        }, 1250);
    });   
}

function moveToDone (id:string)
    {
        document.getElementsByClassName("tasks")[2].append(document.getElementById(id));
    }


