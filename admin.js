/* =====================================
   CONFIGURATION ET STOCKAGE
===================================== */

const STORAGE_KEY = "alidaPortfolioData";

const defaultData = {
    profile: {
        fullName: "",
        profession: "",
        description: "",
        image: "images/profil.png"
    },

    about: "",

    skills: [],
    projects: [],
    experiences: [],
    formations: [],

    contact: {
        email: "",
        phone: "",
        address: "",
        linkedin: "",
        facebook: ""
    }
};

function loadData() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (!savedData) {
            return structuredClone(defaultData);
        }

        const data = JSON.parse(savedData);

        return {
            ...structuredClone(defaultData),
            ...data,
            profile: {
                ...defaultData.profile,
                ...data.profile
            },
            contact: {
                ...defaultData.contact,
                ...data.contact
            }
        };

    } catch (error) {
        console.error("Erreur de lecture des données :", error);
        return structuredClone(defaultData);
    }
}

let portfolioData = loadData();

function saveData() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(portfolioData)
    );
}


/* =====================================
   OUTILS
===================================== */

function generateId() {
    if (window.crypto && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return Date.now().toString();
}

function showMessage(message, isError = false) {
    const messageBox = document.getElementById("adminMessage");

    messageBox.textContent = message;
    messageBox.classList.toggle("error", isError);
    messageBox.style.display = "block";

    setTimeout(() => {
        messageBox.style.display = "none";
    }, 3000);
}

function getElement(id) {
    return document.getElementById(id);
}


/* =====================================
   GESTION DU PROFIL
===================================== */

function loadProfile() {
    getElement("fullName").value = portfolioData.profile.fullName;
    getElement("profession").value = portfolioData.profile.profession;
    getElement("profileDescription").value = portfolioData.profile.description;
    getElement("profileImage").value = portfolioData.profile.image;
}

getElement("profileForm").addEventListener("submit", function (event) {
    event.preventDefault();

    portfolioData.profile = {
        fullName: getElement("fullName").value.trim(),
        profession: getElement("profession").value.trim(),
        description: getElement("profileDescription").value.trim(),
        image: getElement("profileImage").value.trim()
    };

    saveData();
    showMessage("Profil enregistré avec succès !");
});


/* =====================================
   GESTION DE LA PRÉSENTATION
===================================== */

function loadAbout() {
    getElement("aboutDescription").value = portfolioData.about;
}

getElement("aboutForm").addEventListener("submit", function (event) {
    event.preventDefault();

    portfolioData.about = getElement("aboutDescription").value.trim();

    saveData();
    showMessage("Présentation enregistrée !");
});


/* =====================================
   GESTION DES COMPÉTENCES
===================================== */

function renderSkills() {
    renderList("skillsList", portfolioData.skills, "skills");
    updateStatistics();
}

getElement("skillForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const id = getElement("skillId").value;

    const skill = {
        id: id || generateId(),
        name: getElement("skillName").value.trim(),
        level: Number(getElement("skillLevel").value)
    };

    if (id) {
        const index = portfolioData.skills.findIndex(item => item.id === id);

        if (index !== -1) {
            portfolioData.skills[index] = skill;
        }
    } else {
        portfolioData.skills.push(skill);
    }

    saveData();
    renderSkills();

    this.reset();
    getElement("skillId").value = "";

    showMessage("Compétence enregistrée !");
});


/* =====================================
   GESTION DES PROJETS
===================================== */

function renderProjects() {
    renderList("projectsList", portfolioData.projects, "projects");
    updateStatistics();
}

getElement("projectForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const id = getElement("projectId").value;

    const project = {
        id: id || generateId(),
        title: getElement("projectTitle").value.trim(),
        description: getElement("projectDescription").value.trim(),
        image: getElement("projectImage").value.trim(),
        link: getElement("projectLink").value.trim()
    };

    if (id) {
        const index = portfolioData.projects.findIndex(item => item.id === id);

        if (index !== -1) {
            portfolioData.projects[index] = project;
        }
    } else {
        portfolioData.projects.push(project);
    }

    saveData();
    renderProjects();

    this.reset();
    getElement("projectId").value = "";

    showMessage("Projet enregistré !");
});


/* =====================================
   GESTION DES EXPÉRIENCES
===================================== */

function renderExperiences() {
    renderList(
        "experiencesList",
        portfolioData.experiences,
        "experiences"
    );

    updateStatistics();
}

getElement("experienceForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const id = getElement("experienceId").value;

    const experience = {
        id: id || generateId(),
        title: getElement("experienceTitle").value.trim(),
        company: getElement("experienceCompany").value.trim(),
        start: getElement("experienceStart").value.trim(),
        end: getElement("experienceEnd").value.trim(),
        description: getElement("experienceDescription").value.trim()
    };

    if (id) {
        const index = portfolioData.experiences.findIndex(item => item.id === id);

        if (index !== -1) {
            portfolioData.experiences[index] = experience;
        }
    } else {
        portfolioData.experiences.push(experience);
    }

    saveData();
    renderExperiences();

    this.reset();
    getElement("experienceId").value = "";

    showMessage("Expérience enregistrée !");
});


/* =====================================
   GESTION DES FORMATIONS
===================================== */

function renderFormations() {
    renderList(
        "formationsList",
        portfolioData.formations,
        "formations"
    );

    updateStatistics();
}

getElement("formationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const id = getElement("formationId").value;

    const formation = {
        id: id || generateId(),
        title: getElement("formationTitle").value.trim(),
        school: getElement("formationSchool").value.trim(),
        start: getElement("formationStart").value.trim(),
        end: getElement("formationEnd").value.trim()
    };

    if (id) {
        const index = portfolioData.formations.findIndex(item => item.id === id);

        if (index !== -1) {
            portfolioData.formations[index] = formation;
        }
    } else {
        portfolioData.formations.push(formation);
    }

    saveData();
    renderFormations();

    this.reset();
    getElement("formationId").value = "";

    showMessage("Formation enregistrée !");
});


/* =====================================
   AFFICHAGE DES ÉLÉMENTS
===================================== */

function renderList(containerId, items, type) {
    const container = getElement(containerId);

    container.replaceChildren();

    if (items.length === 0) {
        const emptyMessage = document.createElement("p");

        emptyMessage.textContent =
            "Aucune donnée enregistrée pour le moment.";

        emptyMessage.style.color = "#64748b";

        container.appendChild(emptyMessage);
        return;
    }

    items.forEach(item => {
        const article = document.createElement("div");
        article.className = "data-item";

        const information = document.createElement("div");

        const title = document.createElement("h3");

        title.textContent =
            item.name ||
            item.title ||
            "Sans titre";

        const description = document.createElement("p");

        if (type === "skills") {
            description.textContent = `Niveau : ${item.level}%`;
        }

        if (type === "projects") {
            description.textContent = item.description;
        }

        if (type === "experiences") {
            description.textContent =
                `${item.company} | ${item.start} - ${item.end}`;
        }

        if (type === "formations") {
            description.textContent =
                `${item.school} | ${item.start} - ${item.end}`;
        }

        information.appendChild(title);
        information.appendChild(description);

        const actions = document.createElement("div");
        actions.className = "data-actions";

        const editButton = document.createElement("button");

        editButton.type = "button";
        editButton.className = "btn-edit";
        editButton.innerHTML = '<i class="fas fa-pen"></i> Modifier';
        editButton.dataset.action = "edit";
        editButton.dataset.type = type;
        editButton.dataset.id = item.id;

        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.className = "btn-delete";
        deleteButton.innerHTML = '<i class="fas fa-trash"></i> Supprimer';
        deleteButton.dataset.action = "delete";
        deleteButton.dataset.type = type;
        deleteButton.dataset.id = item.id;

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        article.appendChild(information);
        article.appendChild(actions);

        container.appendChild(article);
    });
}


/* =====================================
   MODIFICATION ET SUPPRESSION
===================================== */

const forms = {
    skills: {
        form: "skillForm",
        id: "skillId",
        fields: {
            name: "skillName",
            level: "skillLevel"
        }
    },

    projects: {
        form: "projectForm",
        id: "projectId",
        fields: {
            title: "projectTitle",
            description: "projectDescription",
            image: "projectImage",
            link: "projectLink"
        }
    },

    experiences: {
        form: "experienceForm",
        id: "experienceId",
        fields: {
            title: "experienceTitle",
            company: "experienceCompany",
            start: "experienceStart",
            end: "experienceEnd",
            description: "experienceDescription"
        }
    },

    formations: {
        form: "formationForm",
        id: "formationId",
        fields: {
            title: "formationTitle",
            school: "formationSchool",
            start: "formationStart",
            end: "formationEnd"
        }
    }
};

function editItem(type, id) {
    const configuration = forms[type];

    const item = portfolioData[type].find(
        element => element.id === id
    );

    if (!item) {
        return;
    }

    getElement(configuration.id).value = item.id;

    Object.entries(configuration.fields).forEach(
        ([property, elementId]) => {
            getElement(elementId).value = item[property] ?? "";
        }
    );

    getElement(configuration.form).scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    showMessage("Formulaire de modification chargé.");
}

function deleteItem(type, id) {
    const confirmed = confirm(
        "Voulez-vous vraiment supprimer cet élément ?"
    );

    if (!confirmed) {
        return;
    }

    portfolioData[type] = portfolioData[type].filter(
        item => item.id !== id
    );

    saveData();

    if (type === "skills") renderSkills();
    if (type === "projects") renderProjects();
    if (type === "experiences") renderExperiences();
    if (type === "formations") renderFormations();

    showMessage("Élément supprimé !");
}


/* =====================================
   ÉCOUTE DES BOUTONS
===================================== */

document.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const action = button.dataset.action;
    const type = button.dataset.type;
    const id = button.dataset.id;

    if (action === "edit") {
        editItem(type, id);
    }

    if (action === "delete") {
        deleteItem(type, id);
    }
});


/* =====================================
   GESTION DES COORDONNÉES
===================================== */

function loadContact() {
    getElement("contactEmail").value = portfolioData.contact.email;
    getElement("contactPhone").value = portfolioData.contact.phone;
    getElement("contactAddress").value = portfolioData.contact.address;
    getElement("linkedinLink").value = portfolioData.contact.linkedin;
    getElement("facebookLink").value = portfolioData.contact.facebook;
}

getElement("contactAdminForm").addEventListener("submit", function (event) {
    event.preventDefault();

    portfolioData.contact = {
        email: getElement("contactEmail").value.trim(),
        phone: getElement("contactPhone").value.trim(),
        address: getElement("contactAddress").value.trim(),
        linkedin: getElement("linkedinLink").value.trim(),
        facebook: getElement("facebookLink").value.trim()
    };

    saveData();
    showMessage("Coordonnées enregistrées !");
});


/* =====================================
   STATISTIQUES
===================================== */

function updateStatistics() {
    getElement("totalSkills").textContent =
        portfolioData.skills.length;

    getElement("totalProjects").textContent =
        portfolioData.projects.length;

    getElement("totalExperiences").textContent =
        portfolioData.experiences.length;

    getElement("totalFormations").textContent =
        portfolioData.formations.length;
}


/* =====================================
   MENU ACTIF
===================================== */

const menuLinks = document.querySelectorAll(".sidebar-menu a");

menuLinks.forEach(link => {
    link.addEventListener("click", function () {
        menuLinks.forEach(item => item.classList.remove("active"));

        this.classList.add("active");
    });
});


/* =====================================
   INITIALISATION
===================================== */

function initializeAdmin() {
    loadProfile();
    loadAbout();
    loadContact();

    renderSkills();
    renderProjects();
    renderExperiences();
    renderFormations();

    updateStatistics();
}

initializeAdmin();