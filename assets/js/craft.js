const labWord = document.querySelector('.switch-word--lab');
const workWord = document.querySelector('.switch-word--work');
const labPanel = document.querySelector('.mode-panel--lab');
const workPanel = document.querySelector('.mode-panel--work');
const clickHint = document.getElementById('click-hint');

function setMode(isWork) {
  const activePanel = isWork ? workPanel : labPanel;
  const inactivePanel = isWork ? labPanel : workPanel;

  inactivePanel.classList.remove('is-active');
  activePanel.classList.add('is-active');

  labWord.classList.toggle('switch-word--active', !isWork);
  workWord.classList.toggle('switch-word--active', isWork);

  labWord.style.color = isWork ? '#b3b3b3' : '#000';
  workWord.style.color = isWork ? '#000' : '#b3b3b3';

  clickHint.classList.add('is-hidden');

  activePanel.classList.remove('is-flashing');
  void activePanel.offsetWidth;
  activePanel.classList.add('is-flashing');
}

labWord.addEventListener('click', () => setMode(false));
workWord.addEventListener('click', () => setMode(true));