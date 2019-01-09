
var canvas = new fabric.Canvas('stage-canvas');
var grid = 35;
var w1 = screen.height;
fabric.Object.prototype.hasControls = false; //objects on canvas can't be resized/rotated


// create grid

for (var i = 0; i < (2000 / grid); i++) {
  canvas.add(new fabric.Line([ i * grid, 0, i * grid, 2000], { stroke: '#f7f7f7', selectable: false }));
  canvas.add(new fabric.Line([ 0, i * grid, 2000, i * grid], { stroke: '#f7f7f7', selectable: false}))
}

// add objects

// snap to grid

canvas.on('object:moving', function(options) { 
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});

/* ------------------------------------- *//* ------------------------------------- *//* ------------------------------------- *//* ------------------------------------- */


/* ------------------------------------- */


/* ------------------------------------- *//* ------------------------------------- *//* ------------------------------------- *//* ------------------------------------- */
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
	
	

	if(img.className!="my-image1 img_dragging canvas-img"){ //makes sure it should have text
	var newText = new fabric.IText('#', {					//creates text
		left: e.layerX + 6,
		top: e.layerY + 3,
		fontFamily: 'Helvetica',
		fontSize: 30,
		fill: 'white',
})
canvas.add(newText)
canvas.bringToFront(newText)
newText.enterEditing();
newText.selectAll();
}
var groupp = new fabric.Group([ newImage, newText,]);

canvas.add(groupp);

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
}

if (window.FileReader) {
    // Browser supports HTML5 DnD.

    // Bind the event listeners for the image elements
    var images = document.querySelectorAll('#images img');
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
/* ------------------------------------- *//* ------------------------------------- *//* ------------------------------------- *//* ------------------------------------- */
function deleteObjects(){
	var activeObject = canvas.getActiveObject(),
    activeGroup = canvas.getActiveGroup();
    if (activeObject) {
            canvas.remove(activeObject);
        
    }
    else if (activeGroup) {
    
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function(object) {
            canvas.remove(object);
            });
        
    }
}
$("#delete").click(function(){
    deleteObjects();
});

/* ------------------------------------- *//* ------------------------------------- *//* ------------------------------------- *//* ------------------------------------- */

function outNotepad(){
var notepadID = document.getElementById('notepad');
var inbuttonID = document.getElementById('buttonnotepadin');
notepadID.style.right = "10px";
inbuttonID.style.right = "385px";
}
function inNotepad(){
var notepadID = document.getElementById('notepad');
var inbuttonID = document.getElementById('buttonnotepadin');
notepadID.style.right = "-800px";
inbuttonID.style.right = "-50px";
}
/* ------------------------------------- *//* ------------------------------------- *//* ------------------------------------- *//* ------------------------------------- */
function clearCanvas() {
canvas.clear();
// creates grid
for (var i = 0; i < (2000 / grid); i++) {
  canvas.add(new fabric.Line([ i * grid, 0, i * grid, 2000], { stroke: '#f7f7f7', selectable: false }));
  canvas.add(new fabric.Line([ 0, i * grid, 2000, i * grid], { stroke: '#f7f7f7', selectable: false}))
}

// snap to grid

canvas.on('object:moving', function(options) { 
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});
}
function exportSVG() {

    var svg = canvas.toSVG();
    var data = "data:image/svg+xml," + encodeURIComponent(svg);
    window.open(data);
    //console.log(data);
}


function ChangeText(){ //change text function
//	remove group
var act = canvas.getActiveObject(); //get object slected
var items = act._objects;			//gets all items in group
act._restoreObjectsState();			//puts them to original state
canvas.remove(act);					//removes them
for(var i = 0; i < items.length; i++) {
  canvas.add(items[i]);				//adds items back and enters editing
}
canvas.renderAll();
if (items.length>1){
items[1].enterEditing();
items[1].selectAll();
}
var groupp2 = new fabric.Group(items);

canvas.add(groupp2);
};
window.fabric.util.addListener(canvas.upperCanvasEl, 'dblclick', function (event, self) {
  ChangeText();
});

canvas.observe('mouse:over', function (e) { 	//so grid wont have cursor
            if (e.target.get('type') == 'line') {

                e.target.hoverCursor = 'default';
            }

        });
$(document).keydown(function(e) {
    if(e.keyCode == 46) {
        deleteObjects();
    }      
});
$("#dupB").click(function(){
    cloneObj();
});