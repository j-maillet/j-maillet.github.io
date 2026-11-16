'use strict';

/* =============================================================
   CONFIGURATION
   ============================================================= */
// Largeur (px) au-dessus de laquelle le menu mobile est remplacé par la barre PC
const MOBILE_MENU_MAX_WIDTH = 960;

// Défilement (px) à partir duquel le header prend son état « scrolled »
const HEADER_SCROLLED_OFFSET = 24;

// Zone de détection du scrollspy : bande étroite au milieu de l'écran
const SCROLLSPY_OPTIONS = { rootMargin: '-38% 0px -52% 0px', threshold: 0 };

// Défilement (px) à partir duquel le bouton « Retour en haut » apparaît
const BACK_TO_TOP_OFFSET = 320;

/* =============================================================
   MENU MOBILE
   ============================================================= */
// Ouvre ou ferme le menu mobile et synchronise les attributs ARIA du bouton et du menu.
// Toutes les fermetures (lien, Échap, appui extérieur, redimensionnement) passent par ici.
function setMenuOpen(burger, mobileMenu, open) {
  burger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  mobileMenu.setAttribute('aria-hidden', String(!open));
}

// Branche les événements du menu mobile : bouton, liens, appui extérieur, Échap, redimensionnement.
function initMobileMenu(menuArea, burger, mobileMenu) {
  if (!burger || !mobileMenu) return;

  const isOpen = () => burger.getAttribute('aria-expanded') === 'true';
  const setOpen = (open) => setMenuOpen(burger, mobileMenu, open);

  burger.addEventListener('click', () => setOpen(!isOpen()));

  // Clic sur un lien du menu : ferme
  mobileMenu.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) setOpen(false);
  });

  // Appui en dehors du header : ferme.
  // « pointerdown » (souris ou doigt) fonctionne aussi sur iPhone, où un « click »
  // n'est pas toujours envoyé quand on touche une zone non cliquable de la page.
  document.addEventListener('pointerdown', (event) => {
    if (isOpen() && !menuArea.contains(event.target)) setOpen(false);
  });

  // Touche Échap : ferme et rend le focus au bouton s'il se trouvait dans le header
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !isOpen()) return;
    const focusInHeader = menuArea.contains(document.activeElement);
    setOpen(false);
    if (focusInHeader) burger.focus();
  });

  // Passage en affichage PC : le menu mobile est refermé
  window.addEventListener('resize', () => {
    if (window.innerWidth > MOBILE_MENU_MAX_WIDTH) setOpen(false);
  });
}

/* =============================================================
   ÉTAT DU HEADER
   ============================================================= */
// Ajoute la classe « header--scrolled » dès que la page a défilé.
function initHeaderState(header) {
  if (!header) return;

  const update = () => {
    header.classList.toggle('header--scrolled', window.scrollY > HEADER_SCROLLED_OFFSET);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* =============================================================
   SOULIGNEMENT ANIMÉ DE LA BARRE PC
   ============================================================= */
// Crée le trait animé sous les liens et l'ajoute à la liste de la barre PC.
function createNavIndicator(navList) {
  const indicator = document.createElement('span');
  indicator.className = 'nav-indicator';
  indicator.setAttribute('aria-hidden', 'true');
  navList.append(indicator);
  return indicator;
}

// Place le trait sous un lien. En mode « instant », le déplacement se fait sans animation.
// Un lien masqué (largeur nulle, par exemple en affichage mobile) est ignoré.
function moveNavIndicator(indicator, navList, targetLink, instant = false) {
  if (!indicator || !navList || !targetLink) return;

  const listRect = navList.getBoundingClientRect();
  const linkRect = targetLink.getBoundingClientRect();
  if (!linkRect.width) return;

  if (instant) indicator.classList.add('is-instant');
  indicator.style.width = `${linkRect.width}px`;
  indicator.style.transform = `translateX(${linkRect.left - listRect.left}px)`;
  indicator.classList.add('is-visible');

  if (instant) {
    indicator.getBoundingClientRect(); // force le calcul de style avant de réactiver l'animation
    indicator.classList.remove('is-instant');
  }
}

/* =============================================================
   SCROLLSPY — lien actif selon la section visible
   ============================================================= */
// Marque le lien de la section visible comme actif (classe, aria-current) et déplace le trait.
function initScrollSpy(nav) {
  const navList = nav.querySelector('.nav-links');
  const links = [...nav.querySelectorAll('[data-nav]')];
  const sections = [...document.querySelectorAll('main .section[id]')];
  if (!('IntersectionObserver' in window) || !sections.length || !links.length) return;

  const indicator = navList ? createNavIndicator(navList) : null;

  // Lien de la barre PC suivi par le trait. Le lien du menu mobile (même href) est
  // exclu : il est masqué sur PC, donc le recalage au redimensionnement ne marcherait pas.
  let activeLink = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || !entry.target.id) return;

      links.forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', isCurrent);

        if (!isCurrent) {
          link.removeAttribute('aria-current');
          return;
        }

        link.setAttribute('aria-current', 'location');
        if (!navList || !navList.contains(link)) return;

        const isFirstPlacement = !activeLink;
        activeLink = link;
        moveNavIndicator(indicator, navList, link, isFirstPlacement);
      });
    });
  }, SCROLLSPY_OPTIONS);

  sections.forEach((section) => observer.observe(section));

  // Les largeurs des liens changent avec la fenêtre et le chargement des polices
  const realign = () => {
    if (activeLink) moveNavIndicator(indicator, navList, activeLink, true);
  };

  window.addEventListener('resize', realign, { passive: true });
  if (document.fonts?.ready) document.fonts.ready.then(realign);
}

/* =============================================================
   BOUTON RETOUR EN HAUT
   ============================================================= */
// Affiche le bouton « Retour en haut » une fois que l'utilisateur a défilé.
function initBackToTop() {
  const button = document.getElementById('backToTop');
  if (!button) return;

  const update = () => {
    button.classList.toggle('is-visible', window.scrollY > BACK_TO_TOP_OFFSET);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* =============================================================
   POINT D'ENTRÉE
   ============================================================= */
// Initialise la navigation : menu mobile, état du header et scrollspy.
function initNavigation() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const header = document.getElementById('siteHeader');
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('navMobile');

  initMobileMenu(header || nav, burger, mobileMenu);
  initHeaderState(header);
  initScrollSpy(nav);
  initBackToTop();
}
