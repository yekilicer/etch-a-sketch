const DEFAULT_GRID_SIZE = 16;
let currentColor = "black";
let currentBgColor = "rgb(255, 255, 255)";
let currentMode = "color";
let gridLines = true;
let mouseDown = false;

const gridContainer = document.querySelector('.grid-container');

function createGrid(gridSize = DEFAULT_GRID_SIZE, backgroundColor = "rgb(255, 255, 255)") {
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

        else if (currentMode === "shade-btn") {
            e.target.style.backgroundColor = adjustColor(e.target.style.backgroundColor);
        }

        else if (currentMode === "lighten-btn") {
            e.target.style.backgroundColor = adjustColor(e.target.style.backgroundColor);
        }

    }
}

function adjustColor(bgColorString) {
        let {h, s, l} = RGBToHSL(bgColorString);
        if (currentMode === "shade-btn") l = Math.max(0, l - 10);
        if (currentMode === "lighten-btn") l = Math.min(l + 10, 100);
        let color = `hsl(${h}, ${s}%, ${l}%)`;
        // console.log(color);
        return color;
    } 

function RGBToHSL(bgColorRGBString) {
    RGB = bgColorRGBString.substring(4, bgColorRGBString.length - 1).split(",");

    r = RGB[0];
    g = RGB[1];
    b = RGB[2];
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
  
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    // Calculate hue
    // No difference
    if (delta == 0)
      h = 0;
    // Red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
      
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
  
    // Calculate lightness
    l = (cmax + cmin) / 2;
  
    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return {h: h, s:s, l:l};
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

