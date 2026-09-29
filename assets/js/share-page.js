function sharePage(button) {
    navigator.clipboard.writeText(window.location.href);

    const originalText = button.textContent;
    button.textContent = "link copied ✓";

    setTimeout(() => {
        button.textContent = originalText;
    }, 1800);
}