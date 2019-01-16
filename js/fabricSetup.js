var fabricCanvas;
var grid;

document.addEventListener("DOMContentLoaded", function () {
    setup();
});

function setup() {
    fabricCanvas = new fabric.Canvas('stage-canvas');
    fabric.Object.prototype.hasControls = false;  //objects on canvas can't be resized/rotated
    fabric.IText.prototype.keysMap[13]  = 'exitEditing';
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
    for (var i = 0; i < (1920 / grid); i++) {
        var xy = i * grid;
        fabricCanvas.add(new fabric.Line([xy, 0, xy, 1080], {stroke: '#eeeeee', selectable: false, hoverCursor: 'default'}));
    }
    for (var i = 0; i < (1080 / grid); i++) {
        var xy = i * grid;
        fabricCanvas.add(new fabric.Line([0, xy, 1920, xy], {stroke: '#eeeeee', selectable: false, hoverCursor: 'default'}));
    }
}