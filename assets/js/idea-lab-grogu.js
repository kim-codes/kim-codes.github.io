console.log("Idea Lab loaded!");

/* --------------------------
   Elements
-------------------------- */
const beacon = document.getElementById("search-beacon");
const svg = document.querySelector(".galaxy-map");

const nodes = document.querySelectorAll(".character");

/*
console.log(beacon); 

beacon.addEventListener("click", () => {
    console.log("Beacon clicked");
});
*/

// test - beacon.style.stroke = "#8ccf6e"; 

/* --------------------------
   State
-------------------------- */

// allow user to start dragging
beacon.addEventListener("mousedown", () => {
    isDragging = true;
});

// Stop dragging
document.addEventListener("mouseup", () => {
    isDragging = false;
});

// Move the beacon
svg.addEventListener("mousemove", (event) => {

    if (!isDragging) return;

    const point = svg.createSVGPoint();

    point.x = event.clientX;
    point.y = event.clientY;

    const svgPoint = point.matrixTransform(
        svg.getScreenCTM().inverse()
    );

    beacon.setAttribute("cx", svgPoint.x);
    beacon.setAttribute("cy", svgPoint.y);

});

/* --------------------------
   Event Listeners
-------------------------- */

/*
beacon.addEventListener("mousedown", () => {
    isDragging = true;
    console.log("Dragging started");
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    console.log("Dragging stopped");
});*/

/* --------------------------
   Functions
-------------------------- */

function updateNearestNeighbors() {

}

function moveBeacon() {

}
