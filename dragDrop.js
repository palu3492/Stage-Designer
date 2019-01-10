
document.addEventListener("DOMContentLoaded", function () {
    bindDraggingFunctions();
});

function bindDraggingFunctions() {
    if (window.FileReader) {
        // If browser supports HTML5 DnD.
        // Bind the event listeners for the image elements
        images = document.querySelectorAll('#objects img');
        // Loop through the images
        [].forEach.call(images, function (img) {
            img.addEventListener('dragstart', handleDragStart, false);
            img.addEventListener('dragend', handleDragEnd, false);
        });
        // Bind the event listeners for the canvas
        var canvasContainer = document.getElementById('canvas-container');
        canvasContainer.addEventListener('dragenter', handleDragEnter, false);
        canvasContainer.addEventListener('dragover', handleDragOver, false);
        canvasContainer.addEventListener('dragleave', handleDragLeave, false);
        canvasContainer.addEventListener('drop', handleDrop, false);
    } else {
        // Replace with a fallback to a library solution.
        alert("This browser doesn't support the HTML5 Drag and Drop API.");
    }
}

function handleDragStart(e) {
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
    this.classList.add('img_dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
    // NOTE: comment above refers to the article (see top) -natchiketa

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over'); // this / e.target is previous target element.
}

function handleDrop(e) {
    // this / e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    var img = document.querySelector('#images img.img_dragging');

    console.log('event: ', e);

    var newImage = new fabric.Image(img, {
        width: img.width,
        height: img.height,
        // Set the center of the new object based on the event coordinates relative
        // to the canvas container.
        left: e.layerX,
        top: e.layerY
    });
    canvas.add(newImage);


    if (img.className !== "my-image1 img_dragging canvas-img") { //makes sure it should have text
        var newText = new fabric.IText('#', {					//creates text
            left: e.layerX + 6,
            top: e.layerY + 3,
            fontFamily: 'Helvetica',
            fontSize: 30,
            fill: 'white',
        });
        canvas.add(newText);
        canvas.bringToFront(newText);
        newText.enterEditing();
        newText.selectAll();
    }
    var groupp = new fabric.Group([newImage, newText,]);

    canvas.add(groupp);

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
}