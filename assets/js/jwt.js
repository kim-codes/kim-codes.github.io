const wholeToken = document.getElementById('whole-token');
const tokenStart = document.getElementById('token-start');
const tokenAnatomy = document.getElementById('token-anatomy');

const tokenPieces = document.querySelectorAll('.token-piece');
const detailPanels = document.querySelectorAll('.detail-panel');

const sendButton = document.getElementById('send-token');
const travellingToken = document.getElementById('travelling-token');
const tokenCheck = document.getElementById('token-check');
const apiEndpoint = document.querySelector('.api-endpoint');
const apiStatus = document.getElementById('api-status');


/* =========================================================
   TAKE THE TOKEN APART
   ========================================================= */

wholeToken.addEventListener('click', () => {

    tokenStart.classList.add('opened');

    setTimeout(() => {

        tokenAnatomy.classList.add('visible');
        tokenAnatomy.setAttribute('aria-hidden', 'false');

    }, 280);

});


/* =========================================================
   EXPLORE TOKEN PARTS
   ========================================================= */

tokenPieces.forEach(piece => {

    piece.addEventListener('click', () => {

        const part = piece.dataset.part;

        tokenPieces.forEach(item => {
            item.classList.remove('active');
        });

        detailPanels.forEach(panel => {
            panel.classList.remove('visible');
        });

        piece.classList.add('active');

        document
            .getElementById(`${part}-detail`)
            .classList.add('visible');

    });

});


/* =========================================================
   SEND TOKEN
   ========================================================= */

sendButton.addEventListener('click', () => {

    travellingToken.classList.remove('sending');
    tokenCheck.classList.remove('visible');

    apiEndpoint.classList.remove('success');
    apiStatus.textContent = 'waiting...';

    void travellingToken.offsetWidth;

    travellingToken.classList.add('sending');

    sendButton.disabled = true;
    sendButton.textContent = 'Sending...';


    /* token reaches checkpoint */

    setTimeout(() => {

        tokenCheck.classList.add('visible');

    }, 750);


    /* API accepts token */

    setTimeout(() => {

        apiEndpoint.classList.add('success');

        apiStatus.textContent = '✓ 200 OK';

        sendButton.disabled = false;
        sendButton.innerHTML = 'Send again <span>→</span>';

    }, 1500);

});