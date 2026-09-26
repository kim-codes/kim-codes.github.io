const careerData = {

    microsoft: {
        company: "Microsoft",
        years: "2018 – 2026",

        subtitle:
            "Product Marketing · Audience Strategy  · Cloud & AI  · Developers · Open Source · GTM Programs",

        description:
            "8 years at Microsoft, across developer engagement, open source, product marketing, and GTM programs. The roles changed, but a lot of the work came back to the same thing: taking big product and business priorities and figuring out how to make them useful to the people expected to act on them. That meant working across product, sales, marketing, customer success, partners, and developer communities. I listened for where things were getting stuck, simplified technical concepts, and built the programs, stories, resources, and enablement that helped move things forward.",

        image: "/assets/img/kimcodes-microsoft.png",

        projects: [
            {
                title: "Bringing a Virtual Tour to Life",
                url: "virtual-tour.html"
            },
            {
                title: "Celebrating the People Behind the Code",
                url: "devheroes.html"
            },
            {
                title: "A Coding Odyssey",
                url: "intothecosmos.html"
            }
        ]
    },

    auth0: {
        company: "Auth0",
        years: "2018",

        subtitle:
            "Developer Education · Community · Identity & Access Management · Technical Enablement",

        description:
            "At Auth0, I worked closely with developers around the world as they integrated identity and access management into their products. I helped troubleshoot technical challenges, taught IAM practices, and built demos and learning resources. I also partnered across Product, Support, Sales, and Engineering to turn recurring questions into documentation, workshops, and onboarding experiences that made the product easier to understand and adopt.",

        image: "/assets/img/kimcodes-auth0.png",

        projects: [
            {
                title: "Auth0 Hacktoberfest",
                url: "https://auth0.com/blog/celebrate-hacktoberfest-with-auth0/"
            },
            {
                title: "Opening the Door to Open Source",
                url: "hacktoberfest.html"
            }
        ]
    },

    github: {
        company: "GitHub",
        years: "2015-2017",

        subtitle:
            "Developer Evangelism · Community · Open Source · Programs",

        description:
            "At GitHub, I worked with student developers and community leaders around the world, helping them build stronger technical communities. I created training for the Campus Experts program, supported students throughout their journey, and helped bring developers together through hackathons, meetups, conferences, and GitHub Field Day. It was an early lesson in how much you can enable people to do when you give them the right tools, knowledge, and community.",

        image: "/assets/img/kimcodes-github.png",

        projects: [
            {
                title: "Campus Experts Journey",
                url: "https://medium.com/@kimcodes/my-journey-in-github-campus-experts-part-1-9f75dc9ba6c"
            },

            {
                title: "Hacking the hackable editor",
                url: "https://medium.com/@kimcodes/hacking-the-hackable-editor-f28d6ebb636"
            }
        ]
    }

};


/* =========================================================
   CAREER MODAL
   ========================================================= */

const modal = document.getElementById('career-modal');

const modalTitle = document.getElementById('career-modal-title');
const modalYears = document.getElementById('career-modal-years');
const modalSubtitle = document.getElementById('career-modal-subtitle');
const modalDescription = document.getElementById('career-modal-description');
const modalImage = document.getElementById('career-modal-image');
const modalImageMobile = document.getElementById('career-modal-image-mobile');

const projectTrack = document.getElementById('career-project-track');


function openCareerModal(career) {

    const data = careerData[career];

    if (!data) return;


    /* Chapter details */

    modalTitle.textContent = data.company;
    modalYears.textContent = data.years;
    modalSubtitle.textContent = data.subtitle;
    modalDescription.textContent = data.description;

    modalImage.src = data.image;
    modalImage.alt = `${data.company} chapter illustration`;

    modalImageMobile.src = data.image;
    modalImageMobile.alt = `${data.company} chapter illustration`;


    /* Stories */

    projectTrack.innerHTML = '';

    data.projects.forEach(project => {
        const link = document.createElement('a');

        link.className = 'career-project-link';
        link.href = project.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        link.innerHTML = `
        <span>${project.title}</span>
        <span class="career-project-arrow" aria-hidden="true">→</span>
    `;

        projectTrack.appendChild(link);
    });


    /* Open */

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');

    document.body.classList.add('modal-open');
}


function closeCareerModal() {

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');

    document.body.classList.remove('modal-open');
}


/* Open career stops */

document.querySelectorAll('[data-career]').forEach(stop => {

    stop.addEventListener('click', () => {
        openCareerModal(stop.dataset.career);
    });

    stop.addEventListener('keydown', event => {

        if (event.key === 'Enter' || event.key === ' ') {

            event.preventDefault();

            openCareerModal(stop.dataset.career);
        }

    });

});


/* Close modal */

document.querySelectorAll('[data-close-modal]').forEach(button => {

    button.addEventListener('click', closeCareerModal);

});


/* Escape key */

document.addEventListener('keydown', event => {

    if (
        event.key === 'Escape' &&
        modal.classList.contains('is-open')
    ) {
        closeCareerModal();
    }

});
