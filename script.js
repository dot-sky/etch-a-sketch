const container = document.querySelector(".container");
for (let i = 0; i < 16*16; i++) {
    const element = document.createElement("div");
    element.className = "square";
    container.appendChild(element);
}