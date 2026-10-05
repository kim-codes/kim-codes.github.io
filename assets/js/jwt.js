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

const continueToken = document.getElementById('continue-token');
const continueButton = document.getElementById('continue-button');
const apiPlayground = document.getElementById('api-playground');

const tokenEnding = document.getElementById('token-ending');

const exploredParts = new Set();

let hasScrolledToDetails = false;


/* =========================================================
   TAKE THE TOKEN APART
   ========================================================= */

wholeToken.addEventListener('click', () => {

    document.querySelector('.token-start-note').classList.add('hidden');

    tokenAnatomy.classList.add('visible');
    tokenAnatomy.setAttribute('aria-hidden', 'false');

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

        /* position the connector between the selected piece and details */

        const detailConnector = document.querySelector('.detail-connector');

        const partDetails = document.querySelector('.part-details');

        const pieceRect = piece.getBoundingClientRect();
        const detailsRect = partDetails.getBoundingClientRect();

        const pieceCenter = pieceRect.left + (pieceRect.width / 2);
        const connectorLeft = pieceCenter - detailsRect.left;

        detailConnector.style.left = `${connectorLeft}px`;
        detailConnector.style.opacity = '1';

        /* autoamtically scroll down to display the part details */

        if (!hasScrolledToDetails) {
            hasScrolledToDetails = true;

            setTimeout(() => {
                document.querySelector('.part-details').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }

        /* remember what they've explored */

        exploredParts.add(part);

        if (exploredParts.size === 3) {
            continueToken.classList.add('visible');
        }

    });

});

continueButton.addEventListener('click', () => {

    continueToken.style.display = 'none';

    apiPlayground.classList.add('visible');

    setTimeout(() => {

        apiPlayground.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    }, 100);

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


    /* API accepts token & display closing content */

    setTimeout(() => {

        apiEndpoint.classList.add('success');

        apiStatus.textContent = '✓ 200 OK';

        sendButton.disabled = false;
        sendButton.innerHTML = 'Send again <span>→</span>';

        tokenEnding.classList.add('visible');

    }, 1500);

});