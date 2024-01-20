function createGird(squaresPerSide){
    container.remove();
    container = document.createElement("div");
    container.className = "container";
    const boxSize = Math.floor(GRID_HEIGHT/squaresPerSide);
    console.log(boxSize);
    for(let i=0; i<squaresPerSide; i++){
        const currentRow = document.createElement("div");
        currentRow.className = "row";
        for (let i = 0; i < squaresPerSide; i++) {
            const box = document.createElement("div");
            box.className = "square default";
            box.style.width = boxSize + "px";
            box.style.height = boxSize + "px";
            currentRow.appendChild(box);
            box.addEventListener("mouseover",() => {
                box.classList.remove("default");
                box.classList.add("box-hover");
            });
            box.addEventListener("mouseout",() => {
                box.classList.remove("box-hover");
                box.classList.add("default");
            });
        }
        container.appendChild(currentRow);
    }
    main.appendChild(container);
}
const GRID_WIDTH = 600;
const GRID_HEIGHT = 600;
const resizeButton = document.querySelector(".button");
let container = document.querySelector(".container");
const main = document.querySelector("body");
createGird(16);
resizeButton.addEventListener("click", () => {
    const squaresPerSide = prompt("Number of squares per side: ");
    createGird(squaresPerSide);
});