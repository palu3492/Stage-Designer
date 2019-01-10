

    window.fabric.util.addListener(canvas.upperCanvasEl, 'dblclick', function (event, self) {
        ChangeText();
    });


    $(document).keydown(function (e) {
        if (e.keyCode === 46) {
            deleteObjects();
        }
    });
    $("#dupB").click(function () {
        cloneObj();
    });
}





function deleteObjects() {
    var activeObject = canvas.getActiveObject();
    var activeGroup = canvas.getActiveGroup();
    if (activeObject) {
        canvas.remove(activeObject);

    } else if (activeGroup) {
        var objectsInGroup = activeGroup.getObjects();
        canvas.discardActiveGroup();
        objectsInGroup.forEach(function (object) {
            canvas.remove(object);
        });
    }
}

$("#delete").click(function () {
    deleteObjects();
});


function outNotepad() {
    var notepadID = document.getElementById('notepad');
    var inbuttonID = document.getElementById('buttonnotepadin');
    notepadID.style.right = "10px";
    inbuttonID.style.right = "385px";
}

function inNotepad() {
    var notepadID = document.getElementById('notepad');
    var inbuttonID = document.getElementById('buttonnotepadin');
    notepadID.style.right = "-800px";
    inbuttonID.style.right = "-50px";
}


function clearCanvas() {
    canvas.clear();
    // creates grid
    for (var i = 0; i < (2000 / grid); i++) {
        canvas.add(new fabric.Line([i * grid, 0, i * grid, 2000], {stroke: '#f7f7f7', selectable: false}));
        canvas.add(new fabric.Line([0, i * grid, 2000, i * grid], {stroke: '#f7f7f7', selectable: false}))
    }

    // snap to grid

    canvas.on('object:moving', function (options) {
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


function ChangeText() { //change text function
    //	remove group
    var act = canvas.getActiveObject(); //get object slected
    var items = act._objects;			//gets all items in group
    act._restoreObjectsState();			//puts them to original state
    canvas.remove(act);					//removes them
    for (var i = 0; i < items.length; i++) {
        canvas.add(items[i]);				//adds items back and enters editing
    }
    canvas.renderAll();
    if (items.length > 1) {
        items[1].enterEditing();
        items[1].selectAll();
    }
    var groupp2 = new fabric.Group(items);
    canvas.add(groupp2);
}

