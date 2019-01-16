
document.addEventListener("DOMContentLoaded", function () {
    bindDraggingFunctions();
});

function bindDraggingFunctions() {
    // If browser supports HTML5 DnD.
    if (window.FileReader) {
        // Bind the event listeners for the image elements
        images = document.querySelectorAll('#objects img');
        // Loop through the images
        [].forEach.call(images, function (img) {
            img.addEventListener('dragstart', handleDragStart, false);
            img.addEventListener('dragend', handleDragEnd, false);
        });
        // Bind the event listeners for the canvas
        var canvasContainer = document.getElementById('canvas-container');
        canvasContainer.addEventListener('drop', handleDrop, false);
    } else {
        // Replace with a fallback to a library solution.
        alert("This browser doesn't support the HTML5 Drag and Drop API.");
    }
}

function handleDragStart(e) {
    this.classList.add('img_dragging');
}

function handleDragEnd(e) {
    this.classList.remove('img_dragging');
}


function handleDrop(e) {

    var image = document.querySelector('#objects img.img_dragging');
    var canvasImage = new fabric.Image(image, {selectable: false, evented: false});

    if(image.classList.value === 'stage-object img_dragging') {
        var text = new fabric.IText('#', {fontFamily: 'Helvetica', fontSize: 32, fill: 'white', left: 4, top: 4});
        var group = new fabric.Group([canvasImage, text], {left: Math.round((e.layerX-50) / grid) * grid, top: Math.round((e.layerY-50) / grid) * grid});
        fabricCanvas.add(group);
        fabricCanvas.setActiveObject(group);
        editText();
    } else {
        canvasImage.left = Math.round((e.layerX-50) / grid) * grid;
        canvasImage.top = Math.round((e.layerY-50) / grid) * grid;
        canvasImage.selectable = true;
        canvasImage.evented = true;
        fabricCanvas.add(canvasImage);
        fabricCanvas.setActiveObject(canvasImage);
    }

    return false;
}