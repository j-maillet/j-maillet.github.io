'use strict';

/* =============================================================
   CONFIGURATION
   ============================================================= */
// Sélecteurs des éléments pilotés par les événements délégués
const SELECTORS = {
  galleryImage: '.modal-gallery__image',
  zoomedImage: '.modal-gallery__image.is-zoomed',
  opener: '[data-dialog]',
  closer: '[data-dialog-close]',
};

// Touches qui déclenchent le zoom d'une image au clavier
const ZOOM_KEYS = ['Enter', ' '];

/* =============================================================
   ZOOM DES CAPTURES
   ============================================================= */
// Remet à zéro l'état de zoom d'une fiche (image, aria-pressed et classe de la fiche).
function resetImageZoom(dialog) {
  dialog.classList.remove('is-image-zoomed');
  dialog.querySelectorAll(SELECTORS.zoomedImage).forEach((image) => {
    image.classList.remove('is-zoomed');
    image.setAttribute('aria-pressed', 'false');
  });
}

// Agrandit ou réduit une capture, et marque la fiche pour qu'elle n'écrête plus l'image.
function toggleImageZoom(image) {
  const zoomed = image.classList.toggle('is-zoomed');
  image.setAttribute('aria-pressed', String(zoomed));

  const dialog = image.closest('dialog');
  if (dialog) dialog.classList.toggle('is-image-zoomed', zoomed);
}

/* =============================================================
   OUVERTURE ET FERMETURE
   ============================================================= */
// Ouvre la fiche dont l'id est donné, si elle existe et n'est pas déjà ouverte.
function openDialog(id) {
  if (!id) return;
  const dialog = document.getElementById(id);
  if (!(dialog instanceof HTMLDialogElement) || dialog.open) return;
  dialog.showModal();
}

// Ferme une fiche si elle est ouverte.
function closeDialog(dialog) {
  if (dialog instanceof HTMLDialogElement && dialog.open) dialog.close();
}

/* =============================================================
   GESTION DES ÉVÉNEMENTS
   ============================================================= */
// Branche, par délégation sur « root », les clics, le clavier et la remise à zéro du zoom.
// Les fiches étant créées dynamiquement, aucun écouteur n'est posé sur chacune d'elles.
function initModals(root = document) {
  if (!root) return;

  root.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const galleryImage = target.closest(SELECTORS.galleryImage);
    if (galleryImage) {
      toggleImageZoom(galleryImage);
      return;
    }

    const opener = target.closest(SELECTORS.opener);
    if (opener) {
      openDialog(opener.getAttribute('data-dialog'));
      return;
    }

    const closer = target.closest(SELECTORS.closer);
    if (closer) {
      closeDialog(closer.closest('dialog'));
      return;
    }

    // Clic sur le fond sombre : la cible est la fiche elle-même
    closeDialog(target);
  });

  // Entrée ou Espace sur une capture : même effet qu'un clic
  root.addEventListener('keydown', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const galleryImage = target.closest(SELECTORS.galleryImage);
    if (!galleryImage || !ZOOM_KEYS.includes(event.key)) return;

    event.preventDefault();
    toggleImageZoom(galleryImage);
  });

  // Échap (« cancel ») ou fermeture (« close ») : le zoom est remis à zéro.
  // Ces événements ne remontent pas : on les capte en phase de capture.
  ['cancel', 'close'].forEach((eventName) => {
    root.addEventListener(eventName, (event) => {
      if (event.target instanceof HTMLDialogElement) resetImageZoom(event.target);
    }, true);
  });
}
