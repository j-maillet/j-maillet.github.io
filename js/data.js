'use strict';

/* =============================================================
   DONNÉES DU PORTFOLIO
   Toutes les données affichées par le site (lues par js/main.js).
   ============================================================= */
window.portfolioData = {
  // Projets : une carte résumée + une fiche détaillée (descriptionDetailed est du HTML)
  projects: [
    {
      id: 'proj-powerbi',
      dialogId: 'dialog-powerbi',
      title: 'Jardin de Charlotte — Power BI',
      tags: ['Power BI', 'Power Query', 'DAX'],
      category: 'Data & BI',
      featured: true,
      descriptionShort: 'Tableau de bord Power BI sur plusieurs pages pour suivre l’activité d’une fleuristerie lyonnaise : clients, livraisons et achats aux grossistes.',
      descriptionDetailed: `
        <p class="modal__lead">
          Tableau de bord Power BI réalisé pour la direction du Jardin de Charlotte,
          une fleuristerie lyonnaise, pour suivre son activité commerciale et logistique
          à partir de ses données.
        </p>

        <dl class="modal__meta">
          <div><dt>Contexte</dt><dd>SAÉ • Exploitation d’une base de données</dd></div>
          <div><dt>Période</dt><dd>Semestre 2 • 2026</dd></div>
          <div><dt>Équipe</dt><dd>Binôme</dd></div>
          <div><dt>Statut</dt><dd>Terminé</dd></div>
        </dl>

        <h4>Contenu du rapport</h4>
        <ul>
          <li>Page d’accueil avec des boutons pour passer d’une page à l’autre.</li>
          <li>Répartition géographique des clients par code postal.</li>
          <li>Suivi des livraisons : carte, taux de retard et volume de commandes.</li>
          <li>Analyse des achats auprès des grossistes avec filtres par fleur et par année.</li>
          <li>Visuels utilisés : courbes, histogrammes, anneaux, cartes, segments et indicateurs clés.</li>
        </ul>

        <p class="modal__note">Ce rapport utilise les données de la base Oracle conçue dans le projet « Jardin de Charlotte — Base de données ».</p>

        <h4>Technologies</h4>
        <div class="card__stack">
          <span>Power BI</span><span>Power Query</span><span>DAX</span><span>Oracle</span>
        </div>
      `,
      images: [
        {
          src: 'assets/projects/powerbi-1.png',
          alt: 'Page Volume et Géographie des Livraisons du rapport Power BI',
          caption: 'Volume et géographie des livraisons — Jardin de Charlotte',
        },
        {
          src: 'assets/projects/powerbi-2.png',
          alt: 'Page Performance des Livraisons du rapport Power BI',
          caption: 'Suivi de la performance des livraisons — Jardin de Charlotte',
        },
      ],
    },
    {
      id: 'proj-chronowall',
      dialogId: 'dialog-chronowall',
      title: 'ChronoWall',
      tags: ['PHP', 'MySQL', 'JavaScript', 'HTML / CSS'],
      category: 'Application Web',
      featured: false,
      descriptionShort: 'Application web pour gérer des compétitions d’escalade de vitesse et des entraînements : file de passage en direct, estimation du temps d’attente, statistiques et exports.',
      descriptionDetailed: `
        <p class="modal__lead">
          Application web pour gérer des compétitions d’escalade de vitesse et des
          séances d’entraînement, avec une file de passage mise à jour en direct sur
          tous les écrans.
        </p>

        <dl class="modal__meta">
          <div><dt>Contexte</dt><dd>Projet personnel</dd></div>
          <div><dt>Période</dt><dd>Semestre 1 • 2026</dd></div>
          <div><dt>Équipe</dt><dd>Solo</dd></div>
          <div><dt>Statut</dt><dd>En cours</dd></div>
        </dl>

        <h4>Fonctionnalités</h4>
        <ul>
          <li><strong>Compétitions :</strong> qualifications (deux runs par participant) puis finales en duels, classement au meilleur temps, codes d’accès organisateur et spectateur.</li>
          <li><strong>Entraînements :</strong> file d’attente partagée protégée par code PIN, gestion des groupes (dont groupes avec temps de repos), réorganisation par glisser-déposer.</li>
          <li><strong>Suivi en direct :</strong> mise à jour automatique de l’affichage sans rechargement manuel.</li>
          <li><strong>Estimation du temps d’attente</strong> de chaque grimpeur selon les temps de passage enregistrés.</li>
          <li><strong>Statistiques :</strong> classement, records, courbes de progression, export CSV et fiche imprimable en PDF.</li>
          <li><strong>Comptes :</strong> connexion par code ou lien magique, espace coach.</li>
        </ul>

        <h4>Sécurité</h4>
        <ul>
          <li>Requêtes SQL préparées (PDO), protection contre les failles XSS et CSRF.</li>
          <li>Limitation des tentatives de saisie de code, sessions sécurisées.</li>
        </ul>

        <h4>Technologies</h4>
        <div class="card__stack">
          <span>PHP</span><span>MySQL / MariaDB</span><span>JavaScript</span><span>HTML / CSS</span><span>Apache</span><span>Git</span><span>GitHub Actions</span>
        </div>

        <div class="modal__links">
          <a href="https://chronowall.alwaysdata.net/" target="_blank" rel="noopener" class="btn btn--primary">Voir le site</a>
        </div>
      `,
      images: [],
    },
    {
      id: 'proj-meditrack',
      dialogId: 'dialog-meditrack',
      title: 'MediTrack',
      tags: ['Java', 'Swing', 'GraphStream', 'JUnit'],
      category: 'Développement Logiciel',
      featured: false,
      descriptionShort: 'Application Java d’aide à la décision pour des centres de santé : calcul d’itinéraires courts ou fiables et tournées de livraison sur un graphe.',
      descriptionDetailed: `
        <p class="modal__lead">
          Application Java avec interface graphique pour organiser le transport de patients,
          de personnel et de matériel entre des centres de santé, sur un réseau routier où chaque
          trajet a un niveau de risque.
        </p>

        <dl class="modal__meta">
          <div><dt>Contexte</dt><dd>SAÉ • Aide décisionnelle pour des centres de santé</dd></div>
          <div><dt>Période</dt><dd>Semestre 2 • 2026</dd></div>
          <div><dt>Équipe</dt><dd>Trinôme</dd></div>
          <div><dt>Statut</dt><dd>Terminé</dd></div>
        </dl>

        <h4>Fonctionnalités</h4>
        <ul>
          <li><strong>Cartes de districts :</strong> génération aléatoire ou import depuis un fichier CSV.</li>
          <li><strong>Visualisation du graphe</strong> avec GraphStream : type de centre (maternité, bloc opératoire, centre de nutrition), fiabilité, distance et durée des routes, affichage des routes risquées selon un seuil.</li>
          <li><strong>Deux itinéraires entre deux centres :</strong> le plus rapide et le plus sûr (durée pondérée par la fiabilité des routes), calculés avec l’algorithme de Dijkstra.</li>
          <li><strong>Fiche d’un centre :</strong> centres les plus proches de chaque type, distances et durées vers le reste du réseau.</li>
          <li><strong>Tournées de camions :</strong> un ou deux camions pour livrer tout le réseau ou un seul type de centre, avec une heuristique du plus proche voisin puis une variante « multi-start » qui garde le meilleur trajet.</li>
        </ul>

        <h4>Qualité du code</h4>
        <ul>
          <li>Découpage en packages (modèles, IHM, utilitaires) avec séparation vue / modèle.</li>
          <li>Tests unitaires JUnit et documentation Javadoc.</li>
        </ul>

        <h4>Technologies</h4>
        <div class="card__stack">
          <span>Java</span><span>Swing</span><span>GraphStream</span><span>JUnit</span><span>Javadoc</span><span>Git</span>
        </div>
      `,
      images: [],
    },
    {
      id: 'proj-xofanemusic',
      dialogId: 'dialog-xofanemusic',
      title: 'XofaneMusic',
      tags: ['PHP', 'JavaScript', 'PL/SQL', 'Figma'],
      category: 'Application Web',
      featured: false,
      descriptionShort: 'Application web d’écoute de musiques libres de droits, reliée à l’API NoCopyrightSounds. Conception terminée : dossier de 20 pages, UML et maquettes.',
      descriptionDetailed: `
        <p class="modal__lead">
          Application web pour écouter et découvrir des musiques libres de droits,
          à partir du catalogue de l’API NoCopyrightSounds (NCS).
        </p>

        <dl class="modal__meta">
          <div><dt>Contexte</dt><dd>SAÉ • Développement d’une application</dd></div>
          <div><dt>Période</dt><dd>Semestre 3 • 2026 – Semestre 4 • 2027</dd></div>
          <div><dt>Équipe</dt><dd>4 étudiants</dd></div>
          <div><dt>Statut</dt><dd>En cours</dd></div>
        </dl>

        <h4>Réalisé à ce jour</h4>
        <ul>
          <li>Dossier de conception de 20 pages : cadrage, benchmark (Spotify, NCS), priorisation MoSCoW, user stories, planning Gantt et analyse des risques.</li>
          <li>Diagrammes UML : cas d’utilisation, séquence et classes.</li>
          <li>Sept écrans maquettés sous Figma (accueil, recherche, lecteur, fiche artiste, album, profil, filtres).</li>
        </ul>

        <h4>Fonctionnalités prévues</h4>
        <ul>
          <li>Recherche d’un morceau, d’un artiste, d’un album ou d’une playlist publique.</li>
          <li>Lecteur audio : lecture, pause, piste suivante ou précédente, réglage du volume.</li>
          <li>Création de compte, connexion et récupération du mot de passe.</li>
          <li>Téléchargement des titres, playlists personnelles, favoris, historique et file de lecture.</li>
        </ul>

        <h4>Technologies prévues</h4>
        <div class="card__stack">
          <span>HTML / CSS</span><span>JavaScript</span><span>PHP</span><span>PL/SQL</span><span>API NCS</span><span>UML</span><span>Figma</span><span>Git</span>
        </div>
      `,
      images: [],
    },
    {
      id: 'proj-bd-oracle',
      dialogId: 'dialog-bd-oracle',
      title: 'Jardin de Charlotte — Base de données',
      tags: ['Oracle', 'SQL', 'MCD / MPD'],
      category: 'Base de données',
      featured: false,
      descriptionShort: 'Conception et création d’une base de données Oracle pour une fleuristerie : MCD, dictionnaire de données, implémentation et requêtes SQL.',
      descriptionDetailed: `
        <p class="modal__lead">
          Conception et mise en place d’une base de données Oracle pour gérer l’activité
          d’une boutique de fleurs : commandes, livraisons, composition des bouquets et
          achats auprès des grossistes.
        </p>

        <dl class="modal__meta">
          <div><dt>Contexte</dt><dd>SAÉ • Gestion des données de l’information</dd></div>
          <div><dt>Période</dt><dd>Semestre 1 • 2026</dd></div>
          <div><dt>Équipe</dt><dd>Binôme</dd></div>
          <div><dt>Statut</dt><dd>Terminé</dd></div>
        </dl>

        <h4>Partie 1 : conception</h4>
        <ul>
          <li>Modèle conceptuel (MCD) construit autour de la commande, qui relie le client, le destinataire et la zone de livraison.</li>
          <li>Suivi des stocks et des approvisionnements : de l’achat des fleurs chez les grossistes jusqu’à la composition des bouquets vendus.</li>
          <li>Rédaction du dictionnaire de données et passage au modèle physique (MPD).</li>
        </ul>

        <h4>Partie 2 : implémentation</h4>
        <ul>
          <li>Création des tables et contraintes sous Oracle.</li>
          <li>Jeu d’essai : insertion de clients et de commandes.</li>
          <li>Requêtes SQL de vérification et d’extraction.</li>
        </ul>

        <p class="modal__note">Les données de cette base ont ensuite servi pour le rapport du projet « Jardin de Charlotte — Power BI ».</p>

        <h4>Technologies</h4>
        <div class="card__stack">
          <span>Oracle</span><span>SQL</span><span>MCD / MPD</span><span>draw.io</span>
        </div>
      `,
      images: [
        {
          src: 'assets/projects/jardin-mcd.png',
          alt: 'Schéma MCD et MPD de la base du Jardin de Charlotte',
          caption: 'Modélisation de la base relationnelle Oracle du Jardin de Charlotte',
        },
      ],
    },
    {
      id: 'proj-reseau',
      dialogId: 'dialog-reseau',
      title: 'Serveur web Apache & Nginx',
      tags: ['Linux', 'Apache', 'Nginx', 'Wireshark'],
      category: 'Systèmes & Réseau',
      featured: false,
      descriptionShort: 'Guide d’installation pour héberger un site en local sous Linux avec Apache et Nginx, puis analyser le trafic HTTP généré.',
      descriptionDetailed: `
        <p class="modal__lead">
          Guide d’installation pas à pas pour héberger un site web en local sous Linux,
          configurer ses ports d’écoute et observer les échanges réseau générés.
        </p>

        <dl class="modal__meta">
          <div><dt>Contexte</dt><dd>SAÉ • Installation de services réseau</dd></div>
          <div><dt>Période</dt><dd>Semestre 2 • 2026</dd></div>
          <div><dt>Équipe</dt><dd>Binôme</dd></div>
          <div><dt>Statut</dt><dd>Terminé</dd></div>
        </dl>

        <h4>Étapes du manuel</h4>
        <ul>
          <li>Mise en ligne du site via un VirtualHost Apache sur le port 80 et résolution d’un conflit de port.</li>
          <li>Capture des trames HTTP sous Wireshark, puis bascule sur le port 8080 et comparaison.</li>
          <li>Configuration d’un DNS local pour joindre le site par un nom de domaine.</li>
          <li>Installation et paramétrage d’un serveur Nginx.</li>
          <li>Envoi de requêtes HTTP manuelles avec Telnet (méthodes GET et POST).</li>
        </ul>

        <h4>Technologies</h4>
        <div class="card__stack">
          <span>Linux</span><span>Apache</span><span>Nginx</span><span>Wireshark</span><span>DNS</span><span>HTTP</span><span>Telnet</span>
        </div>
      `,
      images: [],
    },
    {
      id: 'proj-plsql',
      dialogId: 'dialog-plsql',
      title: 'Travaux pratiques PL/SQL',
      tags: ['Oracle', 'PL/SQL', 'SQL'],
      category: 'Base de données',
      featured: false,
      descriptionShort: 'Exercices et sujets de révision en PL/SQL sur base relationnelle : blocs anonymes, curseurs, exceptions, procédures et fonctions stockées.',
      descriptionDetailed: `
        <p class="modal__lead">
          Série d’exercices et de sujets de révision en PL/SQL réalisés sur une base
          de données relationnelle.
        </p>

        <dl class="modal__meta">
          <div><dt>Contexte</dt><dd>Travaux pratiques • Programmation PL/SQL</dd></div>
          <div><dt>Période</dt><dd>Semestre 1 • 2025 – Semestre 2 • 2026</dd></div>
          <div><dt>Équipe</dt><dd>Solo</dd></div>
          <div><dt>Statut</dt><dd>Terminé</dd></div>
        </dl>

        <h4>Notions pratiquées</h4>
        <ul>
          <li>Blocs anonymes.</li>
          <li>Curseurs explicites et paramétrés.</li>
          <li>Gestion des exceptions.</li>
          <li>Procédures et fonctions stockées.</li>
        </ul>

        <h4>Technologies</h4>
        <div class="card__stack">
          <span>Oracle</span><span>PL/SQL</span><span>SQL</span>
        </div>
      `,
      images: [],
    },
  ],

  // Parcours scolaire
  education: {
    steps: [
      {
        period: '2022 - 2025',
        title: 'Bac STI2D',
        detail: 'Spécialité SIN (Systèmes d’Information et Numérique)',
        institution: 'Lycée du Val de Saône • Trévoux (01600)',
      },
      {
        period: '2025 - 2028 • En cours',
        title: 'BUT Informatique',
        detail: 'Parcours AGED (Administration, Gestion & Exploitation de Données)',
        institution: 'IUT Lyon 1 • Site de la Doua, Villeurbanne (69100)',
      },
    ],
  },

  // Compétences : domaine, niveau de 1 à 5 et liste de compétences
  skills: [
    {
      category: 'Bases de données',
      level: 5,
      competencies: [
        'Modélisation (MCD/MLD)',
        'PL/SQL (curseurs, procédures, triggers)',
        'Requêtes complexes',
      ],
    },
    {
      category: 'Data & BI',
      level: 4,
      competencies: [
        'Tableaux de bord décisionnels',
        'Data visualisation',
        'Automatisation de flux (Power Automate)',
      ],
    },
    {
      category: 'Développement logiciel',
      level: 3,
      competencies: [
        'Programmation orientée objet (Java)',
        'Algorithmique & optimisation (C)',
        'UML',
        'Tests (JUnit)',
      ],
    },
    {
      category: 'Web & Sécurité',
      level: 3,
      competencies: ['Développement web (PHP, JavaScript)', 'Sécurité web (requêtes préparées, CSRF / XSS)'],
    },
    {
      category: 'Systèmes & DevOps',
      level: 4,
      competencies: [
        'Administration Linux & Bash',
        'Réseaux & virtualisation',
        'Git / CI-CD',
        'Méthodes Agiles',
      ],
    },
  ],

  // Technologies : groupe = data | dev | sys | design (sert au filtre)
  technologies: [
    {
      name: 'Power BI',
      label: 'DATA & BI',
      group: 'data',
      icon: 'assets/icons/powerBi.jpg',
    },
    {
      name: 'Oracle / PL/SQL',
      label: 'BASE DE DONNÉES',
      group: 'data',
      icon: 'assets/icons/plsql.jpeg',
    },
    {
      name: 'MySQL',
      label: 'BASE DE DONNÉES',
      group: 'data',
      icon: 'assets/icons/MySQL.jpg',
    },
    {
      name: 'phpMyAdmin',
      label: 'GESTION BDD',
      group: 'data',
      icon: 'assets/icons/phpmyadmin.png',
    },
    {
      name: 'Java',
      label: 'BACKEND / POO',
      group: 'dev',
      icon: 'assets/icons/java.jpeg',
    },
    {
      name: 'PHP',
      label: 'BACKEND',
      group: 'dev',
      icon: 'assets/icons/php.png',
    },
    {
      name: 'JavaScript',
      label: 'FRONTEND',
      group: 'dev',
      icon: 'assets/icons/js.jpg',
    },
    {
      name: 'HTML',
      label: 'FRONTEND',
      group: 'dev',
      icon: 'assets/icons/html.jpg',
    },
    {
      name: 'CSS',
      label: 'FRONTEND',
      group: 'dev',
      icon: 'assets/icons/css.jpg',
    },
    {
      name: 'Langage C',
      label: 'ALGORITHMIQUE',
      group: 'dev',
      icon: 'assets/icons/c.png',
    },
    {
      name: 'Ubuntu / Linux',
      label: 'SYSTÈME',
      group: 'sys',
      icon: 'assets/icons/ubuntu.jpg',
    },
    {
      name: 'Bash',
      label: 'SCRIPTING',
      group: 'sys',
      icon: 'assets/icons/bash.png',
    },
    {
      name: 'Cisco',
      label: 'RÉSEAUX',
      group: 'sys',
      icon: 'assets/icons/cisco.png',
    },
    {
      name: 'Git / GitHub',
      label: 'DEVOPS & OUTILS',
      group: 'sys',
      icon: 'assets/icons/github.jpg',
    },
    {
      name: 'Figma',
      label: 'UX / UI DESIGN',
      group: 'design',
      icon: 'assets/icons/figma.jpg',
    },
  ],

  // Centres d’intérêt : icône, titre et description
  passions: [
    {
      icon: 'assets/icons/sports.svg',
      title: 'Sports',
      description: 'Escalade de vitesse jusqu’au niveau international (Open en Allemagne) et co-encadrement d’un groupe en club. Je pratique aussi le vélo et la course à pied.',
    },
    {
      icon: 'assets/icons/echecs.svg',
      title: 'Échecs',
      description: 'Je joue chaque jour en ligne (rapide et blitz) et je résous quelques problèmes tactiques, en prenant le temps d’analyser mes parties.',
    },
    {
      icon: 'assets/icons/veille.svg',
      title: 'Technologies',
      description: 'J’aime comprendre comment fonctionnent les outils que j’utilise et tester de nouvelles technologies sur mes projets personnels.',
    },
  ],
};
