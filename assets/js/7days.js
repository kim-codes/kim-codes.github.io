const seriesLinks = document.querySelectorAll('.series-link');
const articleNavLinks = document.querySelectorAll(
    '.article-pagination a[data-article]'
);
const seriesArticles = document.querySelectorAll('.series-article');

function showArticle(articleId, shouldScroll = true) {

    const targetArticle = document.getElementById(articleId);

    if (!targetArticle) return;

    // Hide every article
    seriesArticles.forEach(article => {
        article.hidden = true;
        article.classList.remove('active');
    });

    // Remove active state from navigation
    seriesLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show selected article
    targetArticle.hidden = false;
    targetArticle.classList.add('active');

    // Highlight corresponding navigation item
    const activeLink = document.querySelector(
        `.series-link[data-article="${articleId}"]`
    );

    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Update URL
    history.replaceState(null, '', `#${articleId}`);

    // Move reader to beginning of article
    if (shouldScroll) {
        targetArticle.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}


seriesLinks.forEach(link => {

    link.addEventListener('click', event => {

        event.preventDefault();

        const articleId = link.dataset.article;

        showArticle(articleId);

    });

});


// If someone visits /7days.html#day-02,
// open that article automatically.
const requestedArticle = window.location.hash.substring(1);

if (
    requestedArticle &&
    document.getElementById(requestedArticle)?.classList.contains('series-article')
) {
    showArticle(requestedArticle, false);
}