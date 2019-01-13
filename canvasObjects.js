

document.addEventListener("DOMContentLoaded", function () {
    fabric.util.addListener(fabricCanvas.upperCanvasEl, 'dblclick', function (e) {
        var target = fabricCanvas.findTarget(e);
        if(target.type === 'group'){
            editText();
        }
    });
});

function editText(){
    var activeObject = fabricCanvas.getActiveObject();
    var objectsInGroup = activeObject.getObjects();
    ungroup(activeObject, objectsInGroup);
    var image = objectsInGroup[0];
    var text = objectsInGroup[1];
    fabricCanvas.setActiveObject(text);
    text.enterEditing();
    text.selectAll();
    text.off();
    text.on('editing:exited', function () {
        var group = new fabric.Group([image, text]);
        fabricCanvas.add(group);
        fabricCanvas.setActiveObject(group);
    });
}

function ungroup(activeObject, objectsInGroup) {
    activeObject._restoreObjectsState();
    fabricCanvas.remove(activeObject);
    for (var i = 0; i < objectsInGroup.length; i++) {
        fabricCanvas.add(objectsInGroup[i]);
    }
}
