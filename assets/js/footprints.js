const cards = Array.from(document.querySelectorAll('.impact-card'));
        const filterButtons = document.querySelectorAll('.filter-pill');
        const viewMoreButton = document.getElementById('view-more');

        const batchSize = 6;

        let visibleCount = batchSize;
        let activeFilters = [];


        function getFilteredCards() {

            if (activeFilters.length === 0) {
                return cards;
            }

            return cards.filter(card => {

                const categories =
                    card.dataset.categories.split(' ');

                return activeFilters.some(filter =>
                    categories.includes(filter)
                );

            });
        }


        function renderCards() {

            const filteredCards = getFilteredCards();

            cards.forEach(card => {
                card.classList.add('is-hidden');
            });

            filteredCards
                .slice(0, visibleCount)
                .forEach(card => {
                    card.classList.remove('is-hidden');
                });


            if (filteredCards.length > visibleCount) {
                viewMoreButton.classList.remove('is-hidden');
            } else {
                viewMoreButton.classList.add('is-hidden');
            }
        }


        filterButtons.forEach(button => {

            button.addEventListener('click', () => {

                const filter = button.dataset.filter;


                /* ALL resets everything */
                if (filter === 'all') {

                    activeFilters = [];

                    filterButtons.forEach(btn =>
                        btn.classList.remove('active')
                    );

                    button.classList.add('active');

                } else {

                    /* turn off All */
                    document
                        .querySelector('[data-filter="all"]')
                        .classList.remove('active');


                    /* toggle selected filter */
                    if (activeFilters.includes(filter)) {

                        activeFilters =
                            activeFilters.filter(item =>
                                item !== filter
                            );

                        button.classList.remove('active');

                    } else {

                        activeFilters.push(filter);
                        button.classList.add('active');

                    }


                    /* nothing selected = All */
                    if (activeFilters.length === 0) {

                        document
                            .querySelector('[data-filter="all"]')
                            .classList.add('active');

                    }

                }


                /* filters always re-batch */
                visibleCount = batchSize;

                renderCards();

            });

        });


        viewMoreButton.addEventListener('click', () => {

            visibleCount += batchSize;

            renderCards();

        });


        renderCards();