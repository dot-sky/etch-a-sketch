const container = document.querySelector(".container");
for (let i = 0; i < 16*16; i++) {
    const element = document.createElement("div");
    element.className = "square default";
    container.appendChild(element);
    element.addEventListener("mouseover",() => {
        element.classList.remove("default");
        element.classList.add("box-hover");
    });
    element.addEventListener("mouseout",() => {
        element.classList.remove("box-hover");
        element.classList.add("default");
    });
}