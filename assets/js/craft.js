const labWord = document.querySelector('.switch-word--lab');
const workWord = document.querySelector('.switch-word--work');
const labPanel = document.querySelector('.mode-panel--lab');
const workPanel = document.querySelector('.mode-panel--work');
const labLink = document.querySelector('.mode-panel--lab');
const workLink = document.querySelector('.mode-panel--work');
const clickHint = document.getElementById('click-hint');
const STORAGE_KEY = 'craftMode';

function setMode(isWork, skipSave) {
  const activePanel = isWork ? workPanel : labPanel;
  const inactivePanel = isWork ? labPanel : workPanel;


  inactivePanel.classList.remove('is-active');
  activePanel.classList.add('is-active');

  labWord.classList.toggle('switch-word--active', !isWork);
  workWord.classList.toggle('switch-word--active', isWork);

  updateStickyLinks(isWork);

  labWord.style.color = isWork ? '#b3b3b3' : '#000';
  workWord.style.color = isWork ? '#000' : '#b3b3b3';

  clickHint.classList.add('is-hidden');

  activePanel.classList.remove('is-flashing');
  void activePanel.offsetWidth;
  activePanel.classList.add('is-flashing');

  if (!skipSave) {
    try {
      sessionStorage.setItem(STORAGE_KEY, isWork ? 'work' : 'lab');
    } catch (e) {
      // localStorage might be unavailable (private browsing, etc) — fail silently
    }
  }
}

labWord.addEventListener('click', () => setMode(false));
workWord.addEventListener('click', () => setMode(true));

// On page load, restore the saved mode
let savedMode = null;

try {
  savedMode = sessionStorage.getItem(STORAGE_KEY);
} catch (e) {
  // ignore
}

if (savedMode === 'work') {
  setMode(true, true);
} else if (savedMode === 'lab') {
  setMode(false, true);
} else {
  clickHint.classList.remove('is-hidden');
}

// disable or enable the links based on the current mode
function updateStickyLinks(isWork) {
  if (isWork) {
    labLink.removeAttribute('href');
    workLink.setAttribute('href', '/stories.html');
  } else {
    labLink.setAttribute('href', '/lab.html');
    workLink.removeAttribute('href');
  }
}

// trigger popup

(function () {
  var overlay = document.getElementById('patterns-overlay');
  var trigger = document.getElementById('patterns-trigger');
  var closeBtn = document.getElementById('patterns-close');

  function openOverlay() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closeOverlay() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
  }

  trigger.addEventListener('click', openOverlay);
  closeBtn.addEventListener('click', closeOverlay);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeOverlay();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeOverlay();
  });
})();