

document.addEventListener("DOMContentLoaded", function () {
    fabric.util.addListener(fabricCanvas.upperCanvasEl, 'dblclick', function (e) {
        editText();
    });
    $('body').on('keydown',function(e){
        var activeObject = fabricCanvas.getActiveObject();
        if(activeObject && activeObject.type === "i-text" && activeObject.isEditing && activeObject.class === 'inputNumber'){
            var k = e.which;
            if(k !== 8 && k !== 46 && k !== 123 && k !== 16 && k !== 17 && (k < 48 || k > 58 || activeObject.text.length >= 2)){
                e.preventDefault();
            }
        }
    });
});

function editText(){
    var activeObject = fabricCanvas.getActiveObject();
    if(activeObject && activeObject.type === 'group') {
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
}

function ungroup(activeObject, objectsInGroup) {
    activeObject._restoreObjectsState();
    fabricCanvas.remove(activeObject);
    for (var i = 0; i < objectsInGroup.length; i++) {
        fabricCanvas.add(objectsInGroup[i]);
    }
}

