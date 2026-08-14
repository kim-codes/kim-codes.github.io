document.getElementById('btn-walkthrough').addEventListener('click', function () {
    console.log('walkthrough clicked');
});

document.getElementById('btn-skip').addEventListener('click', function () {
    console.log('skip clicked');
});


// ---------- events ----------
document.getElementById('btn-walkthrough').addEventListener('click', function () {
    document.querySelector('.lab-choice').style.display = 'none';
    document.getElementById('data-cleanup').style.display = 'block';
});

document.getElementById('btn-skip').addEventListener('click', function () {
    document.querySelector('.lab-choice').style.display = 'none';
    document.getElementById('dashboard-view').style.display = 'block';
});
