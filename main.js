"use strict";
var DrawingApp = /** @class */ (function () {
    function DrawingApp() {
        var _this = this;
        this.paint = false;
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.clearEventHandler = function () {
            _this.clearCanvas();
        };
        this.releaseEventHandler = function () {
            _this.paint = false;
            _this.redraw();
        };
        this.cancelEventHandler = function () {
            _this.paint = false;
        };
        this.pressEventHandler = function (e) {
            var mouseX = e.pageX;
            var mouseY = e.pageY;
            mouseX -= _this.canvas.offsetLeft;
            mouseY -= _this.canvas.offsetTop;
            _this.paint = true;
            _this.addClick(mouseX, mouseY, false);
            _this.redraw();
        };
        this.dragEventHandler = function (e) {
            var mouseX = e.pageX;
            var mouseY = e.pageY;
            mouseX -= _this.canvas.offsetLeft;
            mouseY -= _this.canvas.offsetTop;
            if (_this.paint) {
                _this.addClick(mouseX, mouseY, true);
                _this.redraw();
            }
            e.preventDefault();
        };
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "black";
        context.lineWidth = 1;
        this.canvas = canvas;
        this.context = context;
        this.redraw();
        this.createUserEvents();
    }
    DrawingApp.prototype.createUserEvents = function () {
        var _a;
        var canvas = this.canvas;
        canvas.addEventListener("mousedown", this.pressEventHandler);
        canvas.addEventListener("mousemove", this.dragEventHandler);
        canvas.addEventListener("mouseup", this.releaseEventHandler);
        canvas.addEventListener("mouseout", this.cancelEventHandler);
        (_a = document
            .getElementById("clear")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.clearEventHandler);
    };
    DrawingApp.prototype.redraw = function () {
        var clickX = this.clickX;
        var context = this.context;
        var clickDrag = this.clickDrag;
        var clickY = this.clickY;
        for (var i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            }
            else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.stroke();
        }
        context.closePath();
    };
    DrawingApp.prototype.addClick = function (x, y, dragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    };
    DrawingApp.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
    };
    return DrawingApp;
}());
new DrawingApp();
var testPanel = document.getElementById("test-panel");
function toggleHide() {
    testPanel.hidden = !testPanel.hidden;
}
var domtoimage;
var tableNode = document.getElementById("test");
var pusheenNode = document.getElementById("pusheen");
var canvasNode = document.getElementById("canvas");
var tableOutput = document.getElementById("png-table");
var pusheenOutput = document.getElementById("png-pusheen");
var canvasOutput = document.getElementById("canvas-output");
domtoimage.toPng(tableNode).then(function (dataUrl) {
    var img = new Image();
    img.src = dataUrl;
    if (tableOutput) {
        tableOutput.appendChild(img);
    }
});
domtoimage.toPng(pusheenNode).then(function (dataUrl) {
    var img = new Image();
    img.src = dataUrl;
    if (pusheenOutput) {
        console.log(dataUrl);
        pusheenOutput.append(img);
    }
});
var canvasToPngButton = document.getElementById("canvas-to-png");
canvasToPngButton.onclick = function (e) {
    domtoimage.toPng(canvasNode).then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        if (canvasOutput) {
            canvasOutput.append(img);
        }
    });
};
function makeDraggable(item) {
    item.setAttribute("draggable", "true");
    item.addEventListener("dragstart", function (e) {
        var target = e.target;
        if (e.dataTransfer) {
            e.dataTransfer.setData("text/plain", target.id);
            e.dataTransfer.dropEffect = "move";
            target.classList.add("dragging");
        }
    });
    item.addEventListener("dragend", function (e) {
        var target = e.target;
        target.classList.remove("dragging");
    });
    item.addEventListener("dragover", function (e) {
        e.preventDefault();
        if (e.dataTransfer)
            e.dataTransfer.dropEffect = "move";
    });
    item.addEventListener("drop", function (e) {
        e.preventDefault();
        if (e.dataTransfer) {
            var target = e.target;
            var data = e.dataTransfer.getData("text/plain");
            var element = document.getElementById(data);
            if (element != null) {
                var aId = element.id;
                var bId = target.id;
                var aData = element.innerHTML;
                var bData = target.innerHTML;
                element.id = bId;
                element.innerText = bData;
                target.id = aId;
                target.innerText = aData;
            }
        }
    });
}
// Drag and drop grid test
var items = document.querySelectorAll(".item");
items.forEach(function (item, key, parent) {
    item.id = "item-" + key;
    makeDraggable(item);
});
