function getRandomNumber(upperLimit){
    return Math.floor((Math.random() * (upperLimit+1))); 
}
function getRGBAValues(rgba){
    let colors = rgba.slice(rgba.indexOf("(")+1,rgba.indexOf(")"));
    return colors.split(",");
}
function buildRGBAString(rgba){
    return `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`;
}
function getRandomRGBA(){
    const red = getRandomNumber(255);
    const green = getRandomNumber(255);
    const blue = getRandomNumber(255);
    alpha = (fadeEffect)? "0.1": "1";
    return `rgba(${red},${green},${blue},${alpha})`;
}
function changeColor(box){
    const rgba = getRGBAValues(box.style.backgroundColor);
    if (rgba.length === 4){
        let alpha = parseFloat(rgba[3]);
        if (alpha < 1){
            alpha += 0.1;
        }
        rgba[3] = alpha;
        const newColor = buildRGBAString(rgba);
        box.style.backgroundColor = newColor;
    }
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
            box.style.backgroundColor = WHITE;
            box.style.width = boxSize + "px";
            box.style.height = boxSize + "px";
            currentRow.appendChild(box);
            box.addEventListener("dragstart",event=>{
                event.preventDefault(); // prevents dragging effect on div
            })
            box.addEventListener("mousedown",() => {
                draw = true;
            })
            box.addEventListener("mouseup",()=>{
                draw = false;
            })
            box.addEventListener("click",()=>{
                draw = false;
            })
            box.addEventListener("mouseover",() => {
                if (draw){
                    if(fadeEffect && box.classList.contains("box-hover")){
                        changeColor(box);
                    }
                    else{
                        if (rainbowEffect){
                            box.style.backgroundColor = getRandomRGBA();
                        }
                        else if (fadeEffect){
                            box.style.backgroundColor = BLACK_TRANSPARENT;
                        }
                        else{
                            box.style.backgroundColor = BLACK;
                        }
                        box.classList.add("box-hover")
                    }
                }
            });
        }
        container.appendChild(currentRow);
    }
    main.appendChild(container);
}
const GRID_WIDTH = 600;
const GRID_HEIGHT = 600;
const WHITE = "rgba(255,255,255,0)";
const BLACK_TRANSPARENT = "rgba(0,0,0,0.1)"
const BLACK = "rgba(0,0,0)";

const resizeButton = document.querySelector("#resize");
const clearButton = document.querySelector("#clear");
const colorButton = document.querySelector("#color");
const fadeButton = document.querySelector("#fade");
const main = document.querySelector("body");
let container = document.querySelector(".container");
let draw = false;
let fadeEffect = false;
let rainbowEffect = false;
let squares = 32;

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
fadeButton.addEventListener("click", () => {
    fadeEffect = !fadeEffect;
    if (fadeEffect){
        fadeButton.classList.remove("inactive");
        fadeButton.classList.add("active");
    }
    else{
        fadeButton.classList.remove("active");
        fadeButton.classList.add("inactive");
    }
})
container.addEventListener("mouseleave", () => {
    draw = false;
})

createGrid(squares);
