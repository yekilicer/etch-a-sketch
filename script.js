const DEFAULT_GRID_SIZE = 16;
let currentColor = "black";
let currentBgColor = "white";
let currentMode = "color";
let gridLines = true;
let mouseDown = false;

const gridContainer = document.querySelector('.grid-container');

function createGrid(gridSize = DEFAULT_GRID_SIZE, backgroundColor = "white") {
    gridContainer.style.setProperty("grid-template-columns", `repeat(${gridSize}, 1fr)`);
    for (let i=0; i<gridSize**2; i++){
        let gridItem = document.createElement('div');
        gridItem.setAttribute("draggable", "false");
        gridItem.style.backgroundColor = backgroundColor;
        gridItem.classList.add('grid-item');
        gridItem.id = i
        gridContainer.appendChild(gridItem);
    }
    const gridItems = Array.from(document.querySelectorAll('.grid-item'));
    gridItems.forEach(gridItem => gridItem.addEventListener('mouseover', draw));
}

createGrid();

function toggleButton(e) {
    const targetBtn = document.querySelector(`#${e.target.id}`);
    let isActive = targetBtn.classList.contains("btn-active");

    Array.from(buttons)
        .filter(button => button.classList.contains("mode-btn"))
        .map(button => button.classList.remove("btn-active"));

    if (isActive) {
        targetBtn.classList.remove('btn-active');
        currentMode = "color" ;
    }
    else {
        targetBtn.classList.add("btn-active");
        currentMode = e.target.id;
    } 
}

function watchInput(e) {
    // console.log(e.target);
    if (e.target.type === "range") {
        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.lastChild);
        }
        document.querySelector(".grid-size").textContent = `Grid Size: ${e.target.value} x ${e.target.value}`;
        createGrid(e.target.value, currentBgColor);

    }

    if (e.target.id === "input-color") currentColor = e.target.value;
    if (e.target.id === "bg-color") {
        currentBgColor = e.target.value;
        const gridItems = Array.from(document.querySelectorAll('.grid-item'));
        gridItems.forEach(grid => {
            if (!grid.classList.contains("filled")) {
                grid.style.backgroundColor = currentBgColor;
            }   
        })
    }
}

function draw(e) {
    if (mouseDown) {
        if (currentMode === "eraser-btn"){
            e.target.classList.remove("filled");
            e.target.style.backgroundColor = currentBgColor;
        }
        
        else if (currentMode === "color"){
            // to keep track which grids colored to not be affected background fill
            e.target.classList.add("filled");

            e.target.style.backgroundColor = currentColor;
        }

        else if (currentMode === "rainbow-btn") {
            currentColor = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
            e.target.style.backgroundColor = currentColor;
            e.target.classList.add("filled");
        }

    }
}

// event listeners

const buttons = document.querySelectorAll('button');
console.log
buttons.forEach(button => { button.addEventListener('click', toggleButton)
});

const inputListener = document.querySelectorAll("input");
inputListener.forEach(input => input.addEventListener("change", watchInput));

document.body.addEventListener("mousedown", () => mouseDown = true);    
document.body.addEventListener("mouseup", () => mouseDown = false);    

