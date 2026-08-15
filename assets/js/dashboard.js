const card = document.getElementById('sample-data-file-card');


// *--------------------------------- 
//              EVENTS  
// --------------------------------- * //
document.getElementById('btn-walkthrough').addEventListener('click', function () {
    document.querySelector('.lab-choice').style.display = 'none';
    document.getElementById('data-cleanup').style.display = 'block';
});

document.getElementById('btn-skip').addEventListener('click', function () {
    document.querySelector('.lab-choice').style.display = 'none';
    document.getElementById('dashboard-view').style.display = 'block';
});

// load the sample dashboard programs data 
document.getElementById('btn-load-sample').addEventListener('click', function () {
    // if its already loaded, don't do anything just return
    if (document.getElementById('sample-data-file-card')) return;

    // create the card and give it css properties 
    const card = document.createElement('div');
    card.className = 'sample-data-file-card';
    card.id = 'sample-data-file-card';
    card.draggable = true;
    card.innerHTML = `
    <span class="fc-icon">&#128196;</span>
    nominations_export.csv
    <span class="fc-hint"><em>drag or click to drop in</em></span>
  `;

    document.getElementById('btn-load-sample').insertAdjacentElement('afterend', card);

    // now that the file "card" is loaded, make it draggable
    card.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', 'sample');
    });
});

// setup the 3 listeners to be able to drag, move, and drop the sample data 
const dz = document.getElementById('drop-zone');

dz.addEventListener('dragover', function (e) {
    e.preventDefault();
    dz.classList.add('dragover');
});

dz.addEventListener('dragleave', function () {
    dz.classList.remove('dragover');
});

dz.addEventListener('drop', function (e) {
    e.preventDefault();
    dz.classList.remove('dragover');
    console.log('dropped!');
});