'use strict';

/* =============================================================
   CONFIGURATION
   ============================================================= */
// Colonnes du tableau de compétences (aussi utilisées comme libellés en affichage mobile)
const SKILL_COLUMNS = ['Domaine', 'Compétences clés', 'Niveau'];

// Nombre de cases de la barre de niveau
const LEVEL_SEGMENTS = 5;

// Animation au scroll de la section « À propos » (voir initAboutReveal)
const ABOUT_REVEAL = {
  maxDistance: 190,   // distance de scroll maximale (px) avant la fin de l'animation
  viewportRatio: 0.25, // part de la hauteur de fenêtre utilisée si elle est plus petite
  opacityBoost: 1.45, // l'opacité atteint 1 avant la fin du mouvement
  startOffset: 28,    // décalage vertical de départ (px)
  travel: 84,         // déplacement vertical total (px)
};

/* =============================================================
   UTILITAIRES
   ============================================================= */
// Crée un élément avec classe, texte, attributs et attributs data-* optionnels,
// puis y ajoute les enfants donnés.
function createElement(tag, { className, text, attrs, data } = {}, ...children) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  Object.entries(attrs || {}).forEach(([name, value]) => element.setAttribute(name, value));
  Object.entries(data || {}).forEach(([name, value]) => { element.dataset[name] = value; });
  element.append(...children);
  return element;
}

// Formate le numéro d'un projet à partir de sa position (0 → « 01 »).
function formatProjectNumber(index) {
  return String(index + 1).padStart(2, '0');
}

/* =============================================================
   COMPÉTENCES
   ============================================================= */
// Crée une ligne du tableau : domaine, compétences et barre de niveau sur 5.
function createSkillRow(skill) {
  const [domainLabel, competenciesLabel, levelLabel] = SKILL_COLUMNS;
  const score = Math.min(LEVEL_SEGMENTS, Math.max(1, Number(skill.level) || 1));
  const segments = Array.from({ length: LEVEL_SEGMENTS }, () => createElement('span'));

  const level = createElement('span', {
    className: `level level--${score}`,
    attrs: { role: 'img', 'aria-label': `Niveau ${score} sur ${LEVEL_SEGMENTS}` },
  }, ...segments);

  return createElement('div', { className: 'st-row', attrs: { role: 'row' } },
    createElement('p', { text: skill.category, attrs: { role: 'rowheader' }, data: { label: domainLabel } }),
    createElement('div', { text: skill.competencies.join(' • '), attrs: { role: 'cell' }, data: { label: competenciesLabel } }),
    createElement('p', { attrs: { role: 'cell' }, data: { label: levelLabel } }, level));
}

// Affiche le tableau des compétences (en-tête puis une ligne par domaine).
function renderSkills(skills, container) {
  if (!container || !Array.isArray(skills)) return;

  const columns = SKILL_COLUMNS.map((label) =>
    createElement('p', { text: label, attrs: { role: 'columnheader' } }));
  container.append(createElement('div', { className: 'st-row st-head', attrs: { role: 'row' } }, ...columns));

  skills.forEach((skill) => {
    if (!skill?.category || !Array.isArray(skill.competencies)) return;
    container.append(createSkillRow(skill));
  });
}

/* =============================================================
   TECHNOLOGIES ET FILTRES
   ============================================================= */
// Crée la carte d'une technologie : logo, nom et catégorie.
function createTechnologyCard(technology) {
  const icon = createElement('span', { className: 'technology-card__icon' });
  if (technology.icon) {
    icon.append(createElement('img', {
      className: 'tech-logo',
      attrs: { src: technology.icon, alt: `Logo ${technology.name}` },
    }));
  }

  return createElement(
    'article',
    { className: 'technology-card', attrs: { role: 'listitem' }, data: { group: technology.group } },
    icon,
    createElement('h4', { className: 'technology-card__name', text: technology.name }),
    createElement('p', { className: 'technology-card__category', text: technology.label }),
  );
}

// Affiche la grille des technologies.
function renderTechnologies(technologies, container) {
  if (!container || !Array.isArray(technologies)) return;

  technologies.forEach((technology) => {
    if (!technology?.name || !technology?.label || !technology?.group) return;
    container.append(createTechnologyCard(technology));
  });
}

// Branche les boutons de filtre : un clic n'affiche que les cartes du groupe choisi.
function initTechnologyFilters() {
  const filters = [...document.querySelectorAll('.technology-filters [data-filter]')];
  const cards = [...document.querySelectorAll('.technology-card')];
  if (!filters.length || !cards.length) return;

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const selected = filter.dataset.filter;

      filters.forEach((item) => {
        const active = item === filter;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      cards.forEach((card) => {
        card.hidden = selected !== 'all' && card.dataset.group !== selected;
      });
    });
  });
}

/* =============================================================
   PARCOURS SCOLAIRE
   ============================================================= */
// Crée la carte d'une étape du parcours : période, diplôme, détail et établissement.
function createEducationStep(step) {
  return createElement('article', { className: 'education-step' },
    createElement('p', { className: 'education-step__period', text: step.period }),
    createElement('h3', { className: 'education-step__title', text: step.title }),
    createElement('p', { className: 'education-step__detail', text: step.detail || '' }),
    createElement('p', { className: 'education-step__institution', text: step.institution || '' }));
}

// Affiche les étapes du parcours scolaire.
function renderEducation(steps, container) {
  if (!container || !Array.isArray(steps)) return;

  steps.forEach((step) => {
    if (!step?.period || !step?.title) return;
    container.append(createEducationStep(step));
  });
}

/* =============================================================
   PROJETS — cartes et fiches détaillées
   ============================================================= */
// Crée la carte résumée d'un projet (le titre est le bouton qui ouvre la fiche).
function createProjectCard(project, number) {
  const tags = (project.tags || []).map((text) => createElement('span', { text }));

  const head = createElement('div', { className: 'project__head' },
    createElement('span', { className: 'project__id', text: `#${number}` }),
    createElement('span', { className: 'tag', text: project.category || '' }));

  const opener = createElement('button', {
    className: 'project__open',
    text: project.title,
    attrs: { type: 'button', 'aria-haspopup': 'dialog' },
    data: { dialog: project.dialogId },
  });

  return createElement(
    'article',
    {
      className: `project${project.featured ? ' project--featured' : ''}`,
      attrs: { id: project.id, role: 'listitem' },
    },
    head,
    createElement('h3', {}, opener),
    createElement('p', { text: project.descriptionShort || '' }),
    createElement('div', { className: 'card__stack' }, ...tags),
    createElement('span', { className: 'project__more', text: 'Voir le détail →', attrs: { 'aria-hidden': 'true' } }),
  );
}

// Masque une capture introuvable et adapte la galerie (une seule colonne, ou masquée si vide).
function hideBrokenFigure(image, gallery) {
  const figure = image.closest('figure');
  if (figure) figure.style.display = 'none';

  const visibleFigures = [...gallery.querySelectorAll('.modal-gallery__item')]
    .filter((item) => item.style.display !== 'none');
  if (visibleFigures.length <= 1) gallery.classList.add('modal-gallery--single');
  if (!visibleFigures.length) gallery.hidden = true;
}

// Crée la figure d'une capture : image cliquable (zoom) et légende éventuelle.
function createGalleryFigure(visual, project, gallery) {
  const alt = visual.alt || `Capture du projet ${project.title}`;
  const image = createElement('img', {
    className: 'modal-gallery__image',
    attrs: {
      src: visual.src,
      alt,
      tabindex: '0',
      role: 'button',
      'aria-label': `Agrandir : ${alt}`,
      'aria-pressed': 'false',
    },
  });
  image.onerror = () => hideBrokenFigure(image, gallery);

  const figure = createElement('figure', { className: 'modal-gallery__item' }, image);
  if (visual.caption) figure.append(createElement('figcaption', { text: visual.caption }));
  return figure;
}

// Crée la galerie de captures d'un projet, ou renvoie null s'il n'y en a pas.
function createGallery(project) {
  if (!Array.isArray(project.images) || !project.images.length) return null;

  const gallery = createElement('div', {
    className: `modal-gallery${project.images.length === 1 ? ' modal-gallery--single' : ''}`,
    attrs: { 'aria-label': `Captures du projet ${project.title}` },
  });

  project.images.forEach((visual) => {
    if (!visual?.src) return;
    gallery.append(createGalleryFigure(visual, project, gallery));
  });

  return gallery.childElementCount ? gallery : null;
}

// Crée la fiche détaillée d'un projet (<dialog>) : en-tête, texte HTML et galerie.
function createProjectDialog(project, number) {
  const titleId = `${project.dialogId}-title`;

  const header = createElement('div', { className: 'modal__head' },
    createElement('div', {},
      createElement('p', { className: 'project__id', text: `#${number} • ${project.category || 'Projet'}` }),
      createElement('h3', { text: project.title, attrs: { id: titleId } })),
    createElement('button', {
      className: 'modal__close',
      text: '×',
      attrs: { type: 'button', 'aria-label': 'Fermer la fenêtre' },
      data: { dialogClose: '' },
    }));

  const body = createElement('div', { className: 'modal__body' });
  body.innerHTML = project.descriptionDetailed || '';
  const gallery = createGallery(project);
  if (gallery) body.append(gallery);

  return createElement('dialog', {
    className: 'modal',
    attrs: { id: project.dialogId, 'aria-labelledby': titleId },
  }, header, body);
}

// Affiche les cartes de projets et leurs fiches détaillées.
function renderProjects(projects, cardsContainer, dialogsContainer) {
  if (!cardsContainer || !dialogsContainer || !Array.isArray(projects)) return;

  projects.forEach((project, index) => {
    if (!project?.id || !project?.dialogId || !project?.title) return;

    const number = formatProjectNumber(index);
    cardsContainer.append(createProjectCard(project, number));
    dialogsContainer.append(createProjectDialog(project, number));
  });
}

/* =============================================================
   CENTRES D'INTÉRÊT
   ============================================================= */
// Crée la carte d'un centre d'intérêt : icône SVG, titre et description.
function createPassionCard(passion) {
  const icon = createElement('img', {
    className: 'passion__icon',
    attrs: { src: passion.icon, alt: '', 'aria-hidden': 'true' },
  });

  return createElement('article', { className: 'passion', attrs: { role: 'listitem' } },
    icon,
    createElement('h3', { text: passion.title }),
    createElement('p', { text: passion.description }));
}

// Affiche les centres d'intérêt.
function renderPassions(passions, container) {
  if (!container || !Array.isArray(passions)) return;

  passions.forEach((passion) => {
    if (!passion?.title || !passion?.description || !passion?.icon) return;
    container.append(createPassionCard(passion));
  });
}

/* =============================================================
   ANIMATION AU SCROLL — section À propos
   ============================================================= */
// Fait apparaître et monter le bloc « À propos » (#aboutDetails) pendant les premiers pixels
// de défilement. Désactivée si l'utilisateur demande moins d'animations.
function initAboutReveal() {
  const details = document.getElementById('aboutDetails');
  if (!details) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.CSS?.supports?.('animation-timeline: scroll()')) return;

  details.classList.add('is-reveal-ready');

  const update = () => {
    details.classList.toggle('is-revealed', window.scrollY > 24);
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* =============================================================
   POINT D'ENTRÉE
   ============================================================= */
// Construit la page à partir de window.portfolioData, puis branche les comportements.
function init() {
  const data = window.portfolioData;
  if (!data) return;

  renderSkills(data.skills, document.getElementById('skillsList'));
  renderTechnologies(data.technologies, document.getElementById('technologyGrid'));
  initTechnologyFilters();
  renderEducation(data.education?.steps, document.getElementById('educationTimeline'));
  renderProjects(data.projects, document.getElementById('projectsList'), document.getElementById('dialogs'));
  renderPassions(data.passions, document.getElementById('passionsList'));
  initAboutReveal();
  initNavigation();
  initModals(document.getElementById('projects'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
