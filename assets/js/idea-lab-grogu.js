console.log("Idea Lab loaded!");

/* --------------------------
   Elements
-------------------------- */
const beacon = document.getElementById("search-beacon");
const svg = document.querySelector(".galaxy-map");

const nodes = document.querySelectorAll(".character");

console.log(beacon); 

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
    console.log("Dragging started");
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    console.log("Dragging stopped");
});

/* --------------------------
   Functions
-------------------------- */

function updateNearestNeighbors() {

}

function moveBeacon() {

}
