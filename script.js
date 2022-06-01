const DEFAULT_GRID_SIZE = 16;

function createGrid(gridSize = DEFAULT_GRID_SIZE) {
    let gridContainer = document.querySelector('.grid-container');
    for (let i=0; i<gridSize**2; i++){
        let gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.id = i
        gridContainer.appendChild(gridItem);
    }
}

createGrid();

function toggleButton(e) {
    const targetBtn = document.querySelector(`#${e.target.id}`);
    buttons.forEach(button => {button.classList.remove('btn-active')});
    targetBtn.classList.add('btn-active');

}

const buttons = document.querySelectorAll('button');
console.log
buttons.forEach(button => { button.addEventListener('click', toggleButton)
});


const gridItems = document.querySelectorAll('.grid-item');

// gridItems.forEach(gridItem => {
    
// });
