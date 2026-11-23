
const flipBit = document.getElementById('flip-bit');
const character = document.getElementById('logic-character');
const annotation = document.querySelector('.logic-annotation');

flipBit.addEventListener('click', () => {
    const flipped = flipBit.textContent.trim() === '1';

    flipBit.textContent = flipped ? '0' : '1';
    character.textContent = flipped ? '@' : 'A';

    // Hide the handwritten note after the first click
    if (annotation) {
        annotation.style.display = 'none';
    }
});

document.querySelectorAll('.myth').forEach(myth => {
    myth.addEventListener('toggle', () => {
        if (myth.open) {
            document.querySelector('.myth-annotation')?.remove();
        }
    });
});