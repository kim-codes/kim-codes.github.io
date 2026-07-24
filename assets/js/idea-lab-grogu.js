console.log("Idea Lab loaded!");

/* --------------------------
   Elements
-------------------------- */

const beacon = document.getElementById("search-beacon");
const svg = document.querySelector(".galaxy-map");
const nodes = document.querySelectorAll(".character");

// test - beacon.style.stroke = "#8ccf6e"; 

/* --------------------------
   State
-------------------------- */
let isDragging = false;

/* --------------------------
   Event Listeners
-------------------------- */

beacon.addEventListener("mousedown", () => {
    isDragging = true;
    //console.log("Dragging started");
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    //console.log("Dragging stopped");
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

   // calculate x and y points 
    beacon.setAttribute("cx", svgPoint.x);
    beacon.setAttribute("cy", svgPoint.y);

    updateDistances();
});


/* --------------------------
   Functions
-------------------------- */

function updateDistances() {
   //ensure change string to Number when calculating coordinates 
   const beaconX = Number(beacon.getAttribute("cx")); 
   const beaconY = Number(beacon.getAttribute("cy"));

   console.log(beaconX, beaconY);
}

function updateNearestNeighbors() {

}

function moveBeacon() {

}
