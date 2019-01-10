
// window.fabric.util.addListener(canvas.upperCanvasEl, 'dblclick', function (event, self) {
//     ChangeText();
// });

document.addEventListener("DOMContentLoaded", function () {

    fabric.util.addListener(fabricCanvas.upperCanvasEl, 'dblclick', function () {
        editText();
    });

    // fabricCanvas.on('dblclick', function (options) {
    //     console.log(options);
    //     // options.target.set({
    //     //     left: Math.round(options.target.left / grid) * grid,
    //     //     top: Math.round(options.target.top / grid) * grid
    //     // });
    // });

});


function editText2() {
    var activeObject = fabricCanvas.getActiveObject();
    activeObject._restoreObjectsState();
    var location = {left: activeObject.left, top: activeObject.top};
    var objectsInGroup = activeObject.getObjects();
    var image = objectsInGroup[0];
    var text = objectsInGroup[1];
    fabricCanvas.remove(activeObject);
    text.enterEditing();
    text.selectAll();
    var group = new fabric.Group([image, text], {left: location.left, top: location.top});
    fabricCanvas.add(group);

    // activeObject._restoreObjectsState();			//puts them to original state
    // fabricCanvas.remove(activeObject);					//removes them
    //
    //
    // var group;
    // var image = document.querySelector('#objects img.img_dragging');
    // var canvasImage = new fabric.Image(image);
    //
    // if(image.classList.value !== 'stage-object n img_dragging') {
    //     var text = new fabric.IText('#', {fontFamily: 'Helvetica', fontSize: 32, fill: 'white', left: 7, top: 4});
    //     group = new fabric.Group([canvasImage, text], {left: Math.round((e.layerX-50) / grid) * grid, top: Math.round((e.layerY-50) / grid) * grid});
    //     // text.enterEditing();
    //     // text.selectAll();
    // } else {
    //     group = new fabric.Group([canvasImage], {left: e.layerX, top: e.layerY});
    // }
    // fabricCanvas.add(group);



    // for (var i = 0; i < items.length; i++) {
    //     canvas.add(items[i]);				//adds items back and enters editing
    // }
    // canvas.renderAll();
    // if (items.length > 1) {
    //     items[1].enterEditing();
    //     items[1].selectAll();
    // }
    // var groupp2 = new fabric.Group(items);
    // canvas.add(groupp2);
    // items[1].enterEditing();
    // items[1].selectAll();
}

function editText(){
    var activeObject = fabricCanvas.getActiveObject();
    var objectsInGroup = activeObject.getObjects();
    ungroup(activeObject, objectsInGroup);
    var image = objectsInGroup[0];
    var text = objectsInGroup[1];
    fabricCanvas.setActiveObject(text);
    text.enterEditing();
    text.selectAll();
    // text.on('editing:exited', function () {
    //     var group = new fabric.Group([image, text]);
    //     fabricCanvas.add(group);
    //     fabricCanvas.setActiveObject(group);
    // });
}

function ungroup(activeObject, objectsInGroup) {
    activeObject._restoreObjectsState();
    fabricCanvas.remove(activeObject);
    for (var i = 0; i < objectsInGroup.length; i++) {
        fabricCanvas.add(objectsInGroup[i]);
    }
}

// dimensionText.on('editing:exited', function () {
//     var items = [];
//     canvas.forEachObject(function (obj) {
//         items.push(obj);
//         canvas.remove(obj);
//     });
//     var grp = new fabric.Group(items.reverse(), {});
//     canvas.add(grp);
//     grp.on('mousedown', fabricDblClick(grp, function (obj) {
//         ungroup(grp);
//         canvas.setActiveObject(dimensionText);
//         dimensionText.enterEditing();
//         dimensionText.selectAll();
//     }));
// });