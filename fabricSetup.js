var fabricCanvas;
var grid;

document.addEventListener("DOMContentLoaded", function () {
    setup();
});

function setup() {
    fabricCanvas = new fabric.Canvas('stage-canvas');
    fabric.Object.prototype.hasControls = false;  //objects on canvas can't be resized/rotated
    grid = 33;
    addCanvasGrid();
    snapToGrid();
}

function snapToGrid(){
    fabricCanvas.on('object:moving', function (options) {
        options.target.set({
            left: Math.round(options.target.left / grid) * grid,
            top: Math.round(options.target.top / grid) * grid
        });
    });

}

function addCanvasGrid() {
    for (var i = 0; i < (2000 / grid); i++) {
        fabricCanvas.add(new fabric.Line([i * grid, 0, i * grid, 2000], {stroke: '#f7f7f7', selectable: false, hoverCursor: 'default'}));
        fabricCanvas.add(new fabric.Line([0, i * grid, 2000, i * grid], {stroke: '#f7f7f7', selectable: false, hoverCursor: 'default'}));
    }
}