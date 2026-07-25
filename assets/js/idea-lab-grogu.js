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
let embeddingGenerated = false;
let hasMovedBeacon = false;

/* --------------------------
   Event Listeners
-------------------------- */

/** ONLY WORKS FOR MOUSE / DESKTOP - need to change to work on PIAD 

beacon.addEventListener("mousedown", () => {
    isDragging = true;
    //console.log("Dragging started");
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    //console.log("Dragging stopped");
});


svg.addEventListener("mousemove", (event) => { */


beacon.addEventListener("pointerdown", () => {
    isDragging = true;
});


document.addEventListener("pointerup", () => {
    isDragging = false;
});


svg.addEventListener("pointermove", (event) => {

    if (!isDragging) return;

    const point = svg.createSVGPoint();

    point.x = event.clientX;
    point.y = event.clientY;

    const svgPoint = point.matrixTransform(
        svg.getScreenCTM().inverse()
    );

   // Move exploration beacon
   beacon.setAttribute("cx", svgPoint.x);
   beacon.setAttribute("cy", svgPoint.y);

   if (!hasMovedBeacon) {
       document.getElementById("drag-hint").style.opacity = "0";
       document.getElementById("search-beacon-text").style.display = "none";
   
       hasMovedBeacon = true;
   }
      
      // Update displayed coordinates
      updateExploreCoordinates();

   if (!embeddingGenerated) {
       updateEmbeddingStatus();
       embeddingGenerated = true;
   }

   // Search logic
    const distances = updateDistances();

    const nearest = findNearestNeighbors(distances);

    // Visual updates
    highlightNeighbors(nearest);

    // Update text
    updateStatusCard(nearest);

   // Easter Egg
   checkEasterEgg(nearest);
});


/* --------------------------
   Functions
-------------------------- */

function moveBeacon() {

}

function updateDistances() {
      const distances = [];
      // convert SVG coordinate strings into numbers for calculations
      const beaconX = Number(beacon.getAttribute("cx")); 
      const beaconY = Number(beacon.getAttribute("cy"));
   
      nodes.forEach((node) => {
   
       const nodeX = Number(node.getAttribute("cx"));
       const nodeY = Number(node.getAttribute("cy"));
   
       const dx = beaconX - nodeX;
       const dy = beaconY - nodeY;
   
       const distance = Math.sqrt(dx * dx + dy * dy);
   
       distances.push({
          name: node.dataset.name,
          distance: Math.round(distance),
          element: node
      });
   
   }); // for each node 

   return distances;

}

function findNearestNeighbors(distances) {
    // sort by the shortest distance 
    const sorted = [...distances].sort((a, b) => {
        return a.distance - b.distance;
    });

    // display the top 3, closests 
    return sorted.slice(0, 3);
}

function highlightNeighbors(nearest) {
   // Remove previous top 3
   nodes.forEach((node) => {
       node.classList.remove("nearest");
   });
   
   // Highlight nearest neighbors (3)
   nearest.forEach((match) => {
       match.element.classList.add("nearest");
   });
}

// Update the Status Card 
function updateStatusCard(nearest) {

    const neighborsStatus = document.getElementById("neighbors-status");

    const warnings = ["Vader", "Moff Gideon", "Stormtrooper"];

    neighborsStatus.innerHTML = nearest
        .map((match) => {
            
            if (warnings.includes(match.name)) {
                return `${match.name} ⚠️`;
            }

            return match.name;

        })
        .join("<br>");

}

// Create 'fake' embedding generation 
function updateEmbeddingStatus() {

    const embeddingStatus = document.getElementById("explore-coordinates");

    setTimeout(() => {
        embeddingStatus.innerHTML = `
            Sector:<br>
            X: 0.42<br>
            Y: -0.18<br>
            Z: 0.76
        `;
    }, 1200);

}

function checkEasterEgg(nearest) {

    const babuMessage = document.getElementById("babu-message");

    const babuNearby = nearest.some((match) => match.name === "Babu Frik");

    if (babuNearby) {
        babuMessage.textContent = "Hey heyyyy!";
        babuMessage.classList.add("show");
    } else {
        babuMessage.textContent = "";
        babuMessage.classList.remove("show");
    }

}

// Update the exploration beacon as you move through the galaxy
function updateExploreCoordinates() {

    const coordinates = document.getElementById("explore-coordinates");

    const x = Number(beacon.getAttribute("cx"));
    const y = Number(beacon.getAttribute("cy"));

    coordinates.innerHTML = `
        X: ${(x / 1000).toFixed(2)}<br>
        Y: ${(y / 1000).toFixed(2)}<br>
        Z: 0.76
    `;
}

