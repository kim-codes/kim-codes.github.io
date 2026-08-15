document.getElementById('btn-walkthrough').addEventListener('click', function () {
    console.log('walkthrough clicked');
});

document.getElementById('btn-skip').addEventListener('click', function () {
    console.log('skip clicked');
});


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

document.getElementById('btn-load-sample').addEventListener('click', function() {
  if (document.getElementById('file-card')) return;

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
});