
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
        // canvasContainer.addEventListener('dragenter', handleDragEnter, false);
        // canvasContainer.addEventListener('dragover', handleDragOver, false);
        // canvasContainer.addEventListener('dragleave', handleDragLeave, false);
        canvasContainer.addEventListener('drop', handleDrop, false);
    } else {
        // Replace with a fallback to a library solution.
        alert("This browser doesn't support the HTML5 Drag and Drop API.");
    }
}

function handleDragStart(e) {
    // [].forEach.call(images, function (img) {
    //     img.classList.remove('img_dragging');
    // });
    this.classList.add('img_dragging');
}

function handleDragEnd(e) {
    // [].forEach.call(images, function (img) {
    //     img.classList.remove('img_dragging');
    // });
    this.classList.remove('img_dragging');
}

// function handleDragEnter(e) {
//     // this / e.target is the current hover target.
//     this.classList.add('over');
// }
//
// function handleDragOver(e) {
//     if (e.preventDefault) {
//         e.preventDefault(); // Necessary. Allows us to drop.
//     }
//
//     e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
//     // NOTE: comment above refers to the article (see top) -natchiketa
//
//     return false;
// }
//
// function handleDragLeave(e) {
//     this.classList.remove('over'); // this / e.target is previous target element.
// }

function handleDrop(e) {
    // this / e.target is current target element.

    // if (e.stopPropagation) {
    //     e.stopPropagation(); // stops the browser from redirecting.
    // }


    var group;
    var image = document.querySelector('#objects img.img_dragging');
    var canvasImage = new fabric.Image(image);

    if(image.classList.value !== 'stage-object n img_dragging') {
        var text = new fabric.IText('#', {fontFamily: 'Helvetica', fontSize: 32, fill: 'white', left: 7, top: 4});
        group = new fabric.Group([canvasImage, text], {left: Math.round((e.layerX-50) / grid) * grid, top: Math.round((e.layerY-50) / grid) * grid});
    } else {
        group = new fabric.Group([canvasImage], {left: e.layerX, top: e.layerY});
    }
    fabricCanvas.add(group);

    return false;
}

// text.enterEditing();
// text.selectAll();

