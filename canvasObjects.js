
// window.fabric.util.addListener(canvas.upperCanvasEl, 'dblclick', function (event, self) {
//     ChangeText();
// });

document.addEventListener("DOMContentLoaded", function () {

    fabric.util.addListener(fabricCanvas.upperCanvasEl, 'dblclick', function (e) {
        var target = fabricCanvas.findTarget(e);
        try {
            if(target.type === 'group' && target._objects[0].type === 'image' && target._objects[1].type === 'i-text'){
                editText();
            }
        } catch(error) {
            console.error(error);
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
