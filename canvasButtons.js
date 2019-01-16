
document.addEventListener("DOMContentLoaded", function () {
    $('#trash').on('click',function(e){
        deleteObjects();
    });
    $(document).keydown(function (e) {
        if (e.keyCode === 46) {
            deleteObjects();
        }
    });
    $('#edit').on('click',function(e){
        editText();
    });
    $('#duplicate').on('click',function(e){
        duplicateObjects();
    });
    $('#clear').on('click',function(e){
        clearCanvas();
    });
    $('#save').on('click',function(e){
        saveImg();
    });
    $('#notes').on('click',function(e){
        openNotes();
    });
});

function deleteObjects() {
    var activeObject = fabricCanvas.getActiveObject();
    if (activeObject) {
        if(activeObject.type === 'group') {
            deleteGroup(activeObject)
        } else if(activeObject.type === 'activeSelection') {
            // delete each group in selection
            var groups = activeObject.getObjects();
            groups.forEach(function (object) {
                if(object.type === 'group') {
                    deleteGroup(object)
                } else {
                    fabricCanvas.remove(object);
                }
            });
        } else if(activeObject.type === 'image') {
            fabricCanvas.remove(activeObject);
        }
        fabricCanvas.discardActiveObject();
    }
}

function deleteGroup(activeObject){
    // remove objects in group
    var objectsInGroup = activeObject.getObjects();
    objectsInGroup.forEach(function (object) {
        fabricCanvas.remove(object);
    });
    // remove group
    fabricCanvas.remove(activeObject);
}

function duplicateObjects(){
    var activeObject = fabricCanvas.getActiveObject();
    if(activeObject && activeObject.type !== 'i-text') {
        activeObject.clone(function (clonedObject) {
            fabricCanvas.discardActiveObject();
            clonedObject.set({
                left: clonedObject.left + 10,
                top: clonedObject.top + 10
            });
            if (clonedObject.type === 'activeSelection') {
                // active selection needs a reference to the canvas.
                clonedObject.canvas = fabricCanvas;
                clonedObject.forEachObject(function (obj) {
                    fabricCanvas.add(obj);
                });
                // this should solve the unselectability
                // clonedObject.setCoords();
            } else {
                fabricCanvas.add(clonedObject);
            }
            fabricCanvas.setActiveObject(clonedObject);
            fabricCanvas.requestRenderAll();
        });
    }
}

function clearCanvas() {
    fabricCanvas.clear();
    addCanvasGrid();
    snapToGrid();
}

function saveImg(){
    window.open(fabricCanvas.toDataURL('png'));
}

function openNotes(){
    var main = $('#main');
    console.log(main);
    main.css("grid-template-columns", "260px auto 260px");
}