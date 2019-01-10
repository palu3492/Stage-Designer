var fabricCanvas;

document.addEventListener("DOMContentLoaded", function () {
    setup();
});

function setup() {
    fabricCanvas = new fabric.Canvas('stage-canvas');
    fabric.Object.prototype.hasControls = false;  //objects on canvas can't be resized/rotated
    addCanvasGrid();
}

function addCanvasGrid() {
    var grid = 35;
    for (var i = 0; i < (2000 / grid); i++) {
        fabricCanvas.add(new fabric.Line([i * grid, 0, i * grid, 2000], {stroke: '#f7f7f7', selectable: false}));
        fabricCanvas.add(new fabric.Line([0, i * grid, 2000, i * grid], {stroke: '#f7f7f7', selectable: false}))
    }
}