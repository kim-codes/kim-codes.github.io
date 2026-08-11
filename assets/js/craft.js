const toggle = document.getElementById('mode-toggle');
const labPanel = document.querySelector('.mode-panel--lab');
const workPanel = document.querySelector('.mode-panel--work');
const labLabel = document.querySelector('.switch-label--left');
const workLabel = document.querySelector('.switch-label--right');

function setMode(isWork) {
  const activePanel = isWork ? workPanel : labPanel;
  const inactivePanel = isWork ? labPanel : workPanel;

  inactivePanel.classList.remove('is-active');
  activePanel.classList.add('is-active');

  labLabel.style.color = isWork ? '#999' : '#27500a';
  workLabel.style.color = isWork ? '#854f0b' : '#999';

  activePanel.classList.remove('is-flashing');
  void activePanel.offsetWidth;
  activePanel.classList.add('is-flashing');
}

toggle.addEventListener('change', () => {
  setMode(toggle.checked);
});

labLabel.addEventListener('click', () => {
  toggle.checked = false;
  setMode(false);
});

workLabel.addEventListener('click', () => {
  toggle.checked = true;
  setMode(true);
});