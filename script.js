
const canvas = document.getElementById("main");
var context = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;



const AXIS_LENGTH = canvas.height;
const AXIS_WIDTH = canvas.width;

console.log(AXIS_LENGTH);
console.log(AXIS_WIDTH);

const ORIGIN = { x: 10, y: 10 };
const END = { x: AXIS_WIDTH - 10, y: AXIS_LENGTH - 10 };
const TOPRIGHT = { x: AXIS_WIDTH - 10, y: 10 };
const BOTTOMLEFT = { x: 10, y: AXIS_LENGTH - 10 };

const POINT_BOTTOMLEFT = { x: 10, y: AXIS_LENGTH - 10, c: "black" };
const POINT_TOPRIGHT = { x: AXIS_WIDTH - 10, y: 10, c: "black" };
const POINT_MID = { x: AXIS_WIDTH / 2, y: AXIS_LENGTH / 2, c: "black" }
const POINT_MID_BOTTOM_LEFT = { x: ((AXIS_WIDTH / 2 + 10) / 2), y: ((AXIS_LENGTH / 2) + (AXIS_LENGTH - 10)) / 2, c: "black" }
const POINT_MID_TOP_RIGHT = { x: ((AXIS_WIDTH / 2) + (AXIS_WIDTH - 10)) / 2, y: ((10) + (AXIS_LENGTH / 2)) / 2, c: "black" }

const POINTRADIUS = 10;
const CURVEPOINTRADIUS = 2;

let POINTS = [POINT_BOTTOMLEFT, POINT_TOPRIGHT, POINT_MID_BOTTOM_LEFT, POINT_MID_TOP_RIGHT]


window.addEventListener("resize", () => { location.reload() })


function drawYaxis() {
    context.moveTo(BOTTOMLEFT.x, BOTTOMLEFT.y);
    context.lineTo(ORIGIN.x, ORIGIN.y);
    context.stroke();
}

function connectHelperDots() {
    context.moveTo(POINT_BOTTOMLEFT.x, POINT_BOTTOMLEFT.y);
    context.lineTo(POINT_MID_BOTTOM_LEFT.x, POINT_MID_BOTTOM_LEFT.y)
    context.stroke();

    context.moveTo(POINT_MID_TOP_RIGHT.x, POINT_MID_TOP_RIGHT.y);
    context.lineTo(POINT_TOPRIGHT.x, POINT_TOPRIGHT.y)
    context.stroke();
}

function drawXaxis() {
    context.moveTo(BOTTOMLEFT.x, BOTTOMLEFT.y);
    context.lineTo(END.x, END.y)
    context.stroke();
}

function drawPoint(x, y, color) {
    context.beginPath();
    context.arc(x, y, POINTRADIUS, 0, 2 * Math.PI, true);
    context.fillStyle = color
    context.fill();
}

function drawPoints(points) {

    for (let i = 0; i < points.length; i++) {
        drawPoint(points[i].x, points[i].y, points[i].c);
    }
}


function drawCurvePoint(x, y) {
    context.beginPath();
    context.arc(x, y, CURVEPOINTRADIUS, 0, 2 * Math.PI, true);
    context.fillStyle = "red"
    context.fill();
}


function drawCurvePoints(points) {

    for (let i = 0; i < points.length; i++) {
        drawCurvePoint(points[i].x, points[i].y);
    }
}

function getMousePos(evt) {
    var pos = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - pos.left,
        y: evt.clientY - pos.top
    }
}

function getTouchPos(evt) {
    var pos = canvas.getBoundingClientRect();
    var touch = evt.touches[0]
    return {
        x: touch.clientX - pos.left,
        y: touch.clientY - pos.top
    }
}

function getPos(evt) {
    return evt.type.includes("mouse") ? getMousePos(evt) : getTouchPos(evt);
}

function detectMouseCollitionWithPoint(mousePos, point) {


    return (Math.sqrt(((mousePos.x - point.x) * (mousePos.x - point.x) + (mousePos.y - point.y) * (mousePos.y - point.y))) <= POINTRADIUS)

}

let hoverPoint = null;
let draggedPoint = null

drawWithPoints()

function handleHover(evt) {
    mousePos = getPos(evt);

    for (let point of POINTS) {
        if (detectMouseCollitionWithPoint(mousePos, point)) {
            console.log("collided")
            point.c = "green"
        }
        else {
            point.c = "black"
        }
    }
    drawWithPoints()

}

canvas.addEventListener("mousemove", handleHover)
canvas.addEventListener("touchmove", handleHover)


function handlePressed(evt) {
    mousePos = getPos(evt);
    drawWithPoints()
    for (let point of POINTS) {
        if (detectMouseCollitionWithPoint(mousePos, point)) {
            draggedPoint = point;
            break;
        }
    }
}



canvas.addEventListener("mousedown", handlePressed)
canvas.addEventListener("touchstart", handlePressed)


function handleDrag(evt) {
    if (draggedPoint) {
        const mousePos = getPos(evt);
        draggedPoint.x = mousePos.x;
        draggedPoint.y = mousePos.y;
    }
}



canvas.addEventListener("mousemove", handleDrag)
canvas.addEventListener("touchmove", handleDrag)


function handleDragEnd(evt) {
    draggedPoint = null;
}

canvas.addEventListener("mouseup", handleDragEnd)
canvas.addEventListener("touchend", handleDragEnd)

function drawBezierCurve() {

    let p0 = POINT_BOTTOMLEFT;
    let p1 = POINT_MID_BOTTOM_LEFT;
    let p2 = POINT_MID_TOP_RIGHT;
    let p3 = POINT_TOPRIGHT


    const resolution = 100;

    let curve = []

    for (let i = 0; i <= resolution; i++) {
        let t = i / resolution;
        let it = (1 - t);
        let curvePointX = (it * it * it * p0.x) + (3 * it * it * t * p1.x) + (3 * it * t * t * p2.x) + (t * t * t * p3.x);
        let curvePointY = (it * it * it * p0.y) + (3 * it * it * t * p1.y) + (3 * it * t * t * p2.y) + (t * t * t * p3.y);
        curve.push({ x: curvePointX, y: curvePointY })

    }

    drawCurvePoints(curve);

}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawYaxis()
    drawXaxis()
    connectHelperDots()
    // drawPoints(POINTS);
    drawBezierCurve()

}

function drawWithPoints() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawYaxis()
    drawXaxis()
    connectHelperDots()
    drawPoints(POINTS);
    drawBezierCurve()
}

