/* =====================================
   RÉCUPÉRATION DES DONNÉES
===================================== */

const STORAGE_KEY = "alidaPortfolioData";

function getPortfolioData() {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
        return null;
    }

    try {
        return JSON.parse(savedData);
    } catch (error) {
        console.error("Erreur de lecture :", error);
        return null;
    }
}


/* =====================================
   AFFICHAGE DU PROFIL
===================================== */

function displayProfile(data) {
    if (!data.profile) return;

    const name = document.getElementById("publicName");
    const description = document.getElementById("publicDescription");
    const image = document.getElementById("publicImage");

    if (name && data.profile.fullName) {
        name.textContent = data.profile.fullName;
    }

    if (description && data.profile.description) {
        description.textContent = data.profile.description;
    }

    if (image && data.profile.image) {
        image.src = data.profile.image;
    }
}


/* =====================================
   AFFICHAGE DES COMPÉTENCES
===================================== */

function displaySkills(data) {
    const container = document.getElementById("publicSkills");

    if (!container || !Array.isArray(data.skills)) return;

    if (data.skills.length === 0) return;

    container.replaceChildren();

    data.skills.forEach(skill => {
        const item = document.createElement("div");
        item.className = "skill-item";

        const title = document.createElement("h3");
        title.textContent = skill.name;

        const level = document.createElement("span");
        level.textContent = `${skill.level}%`;

        const progress = document.createElement("div");
        progress.className = "progress-bar";

        const progressFill = document.createElement("div");
        progressFill.className = "progress-fill";
        progressFill.style.width = `${skill.level}%`;

        progress.appendChild(progressFill);

        item.appendChild(title);
        item.appendChild(level);
        item.appendChild(progress);

        container.appendChild(item);
    });
}


/* =====================================
   AFFICHAGE DES PROJETS
===================================== */

function displayProjects(data) {
    const container = document.getElementById("publicProjects");

    if (!container || !Array.isArray(data.projects)) return;

    if (data.projects.length === 0) return;

    container.replaceChildren();

    data.projects.forEach(project => {
        const card = document.createElement("article");
        card.className = "project-card";

        if (project.image) {
            const image = document.createElement("img");
            image.src = project.image;
            image.alt = project.title;
            card.appendChild(image);
        }

        const content = document.createElement("div");
        content.className = "project-content";

        const title = document.createElement("h3");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        content.appendChild(title);
        content.appendChild(description);

        if (project.link) {
            const link = document.createElement("a");
            link.href = project.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "Voir le projet";

            content.appendChild(link);
        }

        card.appendChild(content);
        container.appendChild(card);
    });
}


/* =====================================
   AFFICHAGE DES EXPÉRIENCES
===================================== */

function displayExperiences(data) {
    const container = document.getElementById("publicTimeline");

    if (!container || !Array.isArray(data.experiences)) return;

    const experiences = data.experiences;

    const formations = Array.isArray(data.formations)
        ? data.formations
        : [];

    if (experiences.length === 0 && formations.length === 0) {
        return;
    }

    container.replaceChildren();

    experiences.forEach(experience => {
        const item = document.createElement("div");
        item.className = "timeline-item";

        const title = document.createElement("h3");
        title.textContent = experience.title;

        const company = document.createElement("h4");
        company.textContent = experience.company;

        const date = document.createElement("span");
        date.textContent = `${experience.start} - ${experience.end}`;

        const description = document.createElement("p");
        description.textContent = experience.description;

        item.append(title, company, date, description);
        container.appendChild(item);
    });

    formations.forEach(formation => {
        const item = document.createElement("div");
        item.className = "timeline-item";

        const title = document.createElement("h3");
        title.textContent = formation.title;

        const school = document.createElement("h4");
        school.textContent = formation.school;

        const date = document.createElement("span");
        date.textContent = `${formation.start} - ${formation.end}`;

        item.append(title, school, date);
        container.appendChild(item);
    });
}


/* =====================================
   AFFICHAGE DES COORDONNÉES
===================================== */

function displayContact(data) {
    const container = document.getElementById("publicContact");

    if (!container || !data.contact) return;

    const contact = data.contact;

    const email = container.querySelector(".contact-email");
    const phone = container.querySelector(".contact-phone");
    const address = container.querySelector(".contact-address");

    if (email && contact.email) {
        email.textContent = contact.email;
    }

    if (phone && contact.phone) {
        phone.textContent = contact.phone;
    }

    if (address && contact.address) {
        address.textContent = contact.address;
    }

    const linkedin = container.querySelector(".linkedin-link");
    const facebook = container.querySelector(".facebook-link");

    if (linkedin && contact.linkedin) {
        linkedin.href = contact.linkedin;
    }

    if (facebook && contact.facebook) {
        facebook.href = contact.facebook;
    }
}


/* =====================================
   INITIALISATION
===================================== */

function initializePublicPortfolio() {
    const data = getPortfolioData();

    if (!data) return;

    displayProfile(data);
    displaySkills(data);
    displayProjects(data);
    displayExperiences(data);
    displayContact(data);
}

document.addEventListener(
    "DOMContentLoaded",
    initializePublicPortfolio
);