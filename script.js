function getRandomNumber(upperLimit){
    return Math.floor((Math.random() * (upperLimit+1))); 
}
function getRandomRGB(){
    const red = getRandomNumber(255);
    const green = getRandomNumber(255);
    const blue = getRandomNumber(255);
    return `rgb(${red},${green},${blue})`;
}
function createGrid(squaresPerSide){
    container.remove();
    container = document.createElement("div");
    container.className = "container";
    boxSize = Math.round(GRID_HEIGHT/squaresPerSide * 100)/100;
    for(let i=0; i<squaresPerSide; i++){
        const currentRow = document.createElement("div");
        currentRow.className = "row";
        for (let i = 0; i < squaresPerSide; i++) {
            const box = document.createElement("div");
            box.className = "square";
            box.style.backgroundColor = WHITE;
            box.style.width = boxSize + "px";
            box.style.height = boxSize + "px";
            currentRow.appendChild(box);
            box.addEventListener("mouseover",() => {
                box.classList.remove("default");
                if (rainbowEffect){
                    box.style.backgroundColor = getRandomRGB();
                }
                else{
                    box.style.backgroundColor = BLACK;
                }
            });
            box.addEventListener("mouseout",() => {
                box.classList.remove("box-hover");
            });
        }
        container.appendChild(currentRow);
    }
    main.appendChild(container);
}
const GRID_WIDTH = 600;
const GRID_HEIGHT = 600;
const WHITE = "rgb(255,255,255)";
const BLACK = "rgb(0,0,0)"
const resizeButton = document.querySelector("#resize");
const clearButton = document.querySelector("#clear");
const colorButton = document.querySelector("#color");
let container = document.querySelector(".container");
const main = document.querySelector("body");
let rainbowEffect = false;
let squares = 16;
createGrid(squares);
resizeButton.addEventListener("click", () => {
    let squaresPerSide = parseInt(prompt("Number of squares per side (Max.: 100):"));
    if (isNaN(squaresPerSide) || squaresPerSide > 100 || squaresPerSide <= 0){
        alert("Invalid number...");
    }else{
        squares = squaresPerSide;
        createGrid(squaresPerSide);
    }
});
clearButton.addEventListener("click", () => {
    createGrid(squares);
})
colorButton.addEventListener("click", () => {
    rainbowEffect = !rainbowEffect;
    if (rainbowEffect){
        colorButton.textContent = "Black";
    }
    else{
        colorButton.textContent = "Rainbow";
    }
})