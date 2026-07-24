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
      const distances = [];
      // Convert SVG coordinate strings into numbers for calculations
      const beaconX = Number(beacon.getAttribute("cx")); 
      const beaconY = Number(beacon.getAttribute("cy"));
   
      nodes.forEach((node) => {
   
       const nodeX = Number(node.getAttribute("cx"));
       const nodeY = Number(node.getAttribute("cy"));
   
       const dx = beaconX - nodeX;
       const dy = beaconY - nodeY;
   
       const distance = Math.sqrt(dx * dx + dy * dy);
   
       // console.log(node.dataset.name, Math.round(distance));
       distances.push({
          name: node.dataset.name,
          distance: Math.round(distance),
          element: node
      });
   
   }); // for each node 
   
   // sort by the shortest distance 
   distances.sort((a, b) => a.distance - b.distance);

   // display the top 3, closests 
   const nearest = distances.slice(0, 3);
   
   // console.log(nearest);
   
   // Remove previous top 3
   nodes.forEach((node) => {
       node.classList.remove("nearest");
   });
   
   // Highlight nearest neighbors (3)
   nearest.forEach((match) => {
       match.element.classList.add("nearest");
   });
}

function updateNearestNeighbors() {

}

function moveBeacon() {

}
