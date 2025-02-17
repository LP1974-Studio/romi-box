// RomiBoxConstants.js

// Définition du chemin de base pour les ressources
const BASE_URL = process.env.PUBLIC_URL || '';

// Configuration des chemins de base pour les vidéos
const VIDEO_PATHS = {
  FARM: `${BASE_URL}/videos/ferme`,
  SAVANNA: `${BASE_URL}/videos/savane`,
  FOREST: `${BASE_URL}/videos/foret`,
  MOUNTAIN: `${BASE_URL}/videos/montagne`,
  SEA: `${BASE_URL}/videos/mer`,
  DESERT: `${BASE_URL}/videos/desert`,
  JUNGLE: `${BASE_URL}/videos/jungle`,
  TUNDRA: `${BASE_URL}/videos/toundra`,
  ROCKY_COAST: `${BASE_URL}/videos/cote_rocheuse`,
  SPECIAL: {
    ENCOURAGEMENT: `${BASE_URL}/videos/essaie_encore/nouvelessaie.mp4`,
    VICTORY: `${BASE_URL}/videos/victoire/victoire.mp4`,
    INTRO: `${BASE_URL}/videos/romi_introduction/Romi_Introduction.mp4`,
    MUSIC: `${BASE_URL}/videos/musique/musique.mp4`
  }
};

// Mappage des couleurs pour les boutons (configuration physique)
const buttonColors = {
  0: '#FF4422',    // Rouge (Pin 1) - Centre
  1: '#33AADD',    // Bleu (Pin 2) - Nord
  2: '#FFCC22',    // Jaune (Pin 3) - Nord-Est
  3: '#4CAF50',    // Vert (Pin 4) - Est
  4: '#FFFFFF',    // Blanc (Pin 5) - Sud-Est
  5: '#33AADD',    // Bleu (Pin 6) - Sud
  6: '#FFCC22',    // Jaune (Pin 7) - Sud-Ouest
  7: '#4CAF50',    // Vert (Pin 8) - Ouest
  8: '#FFFFFF',    // Blanc (Pin 9) - Nord-Ouest
  9: '#333333',    // Noir (Pin 10) - Nord-Est Externe
  10: '#333333',   // Noir (Pin 11) - Est Externe
  11: '#333333',   // Noir (Pin 12) - Sud-Est Externe
  12: '#333333',   // Noir (Pin 13) - Sud-Ouest Externe
  13: '#333333',   // Noir (Pin 14) - Ouest Externe
  14: '#333333'    // Noir (Pin 15) - Nord-Ouest Externe
};

// Définition des thèmes vidéo avec chemins normalisés
const videoThemes = {
  farm: [
    { name: 'Mouton', url: `${VIDEO_PATHS.FARM}/mouton.mp4` },
    { name: 'Chat', url: `${VIDEO_PATHS.FARM}/chat.mp4` },
    { name: 'Chien', url: `${VIDEO_PATHS.FARM}/chien.mp4` },
    { name: 'Poule', url: `${VIDEO_PATHS.FARM}/poule.mp4` },
    { name: 'Vache', url: `${VIDEO_PATHS.FARM}/vache.mp4` },
    { name: 'Oiseau', url: `${VIDEO_PATHS.FARM}/oiseau.mp4` },
    { name: 'Corbeau', url: `${VIDEO_PATHS.FARM}/corbeau.mp4` },
    { name: 'Lapin', url: `${VIDEO_PATHS.FARM}/lapin.mp4` },
    { name: 'Cochon', url: `${VIDEO_PATHS.FARM}/cochon.mp4` },
    { name: 'Chevre', url: `${VIDEO_PATHS.FARM}/chevre.mp4` },
    { name: 'Cheval', url: `${VIDEO_PATHS.FARM}/cheval.mp4` },
    { name: 'Ecureuil', url: `${VIDEO_PATHS.FARM}/ecureuil.mp4` },
    { name: 'Ane', url: `${VIDEO_PATHS.FARM}/ane.mp4` },
    { name: 'Hibou', url: `${VIDEO_PATHS.FARM}/hibou.mp4` },
    { name: 'Parade', url: `${VIDEO_PATHS.FARM}/parade.mp4` }
  ],
  savanna: [
    { name: 'Lion', url: `${VIDEO_PATHS.SAVANNA}/lion.mp4` },
    { name: 'Elephant', url: `${VIDEO_PATHS.SAVANNA}/elephant.mp4` },
    { name: 'Girafe', url: `${VIDEO_PATHS.SAVANNA}/girafe.mp4` },
    { name: 'Zebre', url: `${VIDEO_PATHS.SAVANNA}/zebre.mp4` },
    { name: 'Gorille', url: `${VIDEO_PATHS.SAVANNA}/gorille.mp4` },
    { name: 'Guepard', url: `${VIDEO_PATHS.SAVANNA}/guepard.mp4` },
    { name: 'Hyene', url: `${VIDEO_PATHS.SAVANNA}/hyene.mp4` },
    { name: 'Rhinoceros', url: `${VIDEO_PATHS.SAVANNA}/rhinoceros.mp4` },
    { name: 'Crocodile', url: `${VIDEO_PATHS.SAVANNA}/crocodile.mp4` },
    { name: 'Antilope', url: `${VIDEO_PATHS.SAVANNA}/antilope.mp4` },
    { name: 'Serpent', url: `${VIDEO_PATHS.SAVANNA}/serpent.mp4` },
    { name: 'Chacal', url: `${VIDEO_PATHS.SAVANNA}/chacal.mp4` },
    { name: 'Gazelle', url: `${VIDEO_PATHS.SAVANNA}/gazelle.mp4` },
    { name: 'Vautour', url: `${VIDEO_PATHS.SAVANNA}/vautour.mp4` },
    { name: 'Chimpanze', url: `${VIDEO_PATHS.SAVANNA}/chimpanze.mp4` }
  ],
  forest: [
    { name: 'Cerf', url: `${VIDEO_PATHS.FOREST}/cerf.mp4` },
    { name: 'Renard', url: `${VIDEO_PATHS.FOREST}/renard.mp4` },
    { name: 'Ecureuil', url: `${VIDEO_PATHS.FOREST}/ecureuil.mp4` },
    { name: 'Loup', url: `${VIDEO_PATHS.FOREST}/loup.mp4` },
    { name: 'Hibou', url: `${VIDEO_PATHS.FOREST}/hibou.mp4` },
    { name: 'Blaireau', url: `${VIDEO_PATHS.FOREST}/blaireau.mp4` },
    { name: 'Lynx', url: `${VIDEO_PATHS.FOREST}/lynx.mp4` },
    { name: 'Ours', url: `${VIDEO_PATHS.FOREST}/ours.mp4` },
    { name: 'Sanglier', url: `${VIDEO_PATHS.FOREST}/sanglier.mp4` },
    { name: 'Aigle', url: `${VIDEO_PATHS.FOREST}/aigle.mp4` },
    { name: 'Serpent', url: `${VIDEO_PATHS.FOREST}/serpent.mp4` },
    { name: 'Chouette', url: `${VIDEO_PATHS.FOREST}/chouette.mp4` },
    { name: 'Picbois', url: `${VIDEO_PATHS.FOREST}/picbois.mp4` },
    { name: 'Chevreuil', url: `${VIDEO_PATHS.FOREST}/chevreuil.mp4` },
    { name: 'Marmotte', url: `${VIDEO_PATHS.FOREST}/marmotte.mp4` }
  ],
  mountain: [
    { name: 'Bouquetin', url: `${VIDEO_PATHS.MOUNTAIN}/bouquetin.mp4` },
    { name: 'Aigle Royal', url: `${VIDEO_PATHS.MOUNTAIN}/aigle_royal.mp4` },
    { name: 'Marmotte', url: `${VIDEO_PATHS.MOUNTAIN}/marmotte.mp4` },
    { name: 'Chamois', url: `${VIDEO_PATHS.MOUNTAIN}/chamois.mp4` },
    { name: 'Isard', url: `${VIDEO_PATHS.MOUNTAIN}/isard.mp4` },
    { name: 'Gypaète', url: `${VIDEO_PATHS.MOUNTAIN}/gypaete.mp4` },
    { name: 'Lièvre Variable', url: `${VIDEO_PATHS.MOUNTAIN}/lievre.mp4` },
    { name: 'Mouflon', url: `${VIDEO_PATHS.MOUNTAIN}/mouflon.mp4` },
    { name: 'Vautour', url: `${VIDEO_PATHS.MOUNTAIN}/vautour.mp4` },
    { name: 'Lagopède', url: `${VIDEO_PATHS.MOUNTAIN}/lagopede.mp4` },
    { name: 'Condor', url: `${VIDEO_PATHS.MOUNTAIN}/condor.mp4` },
    { name: 'Puma', url: `${VIDEO_PATHS.MOUNTAIN}/puma.mp4` },
    { name: 'Lama', url: `${VIDEO_PATHS.MOUNTAIN}/lama.mp4` },
    { name: 'Yack', url: `${VIDEO_PATHS.MOUNTAIN}/yack.mp4` },
    { name: 'Léopard', url: `${VIDEO_PATHS.MOUNTAIN}/leopard.mp4` }
  ],
  sea: [
    { name: 'Dauphin', url: `${VIDEO_PATHS.SEA}/dauphin.mp4` },
    { name: 'Baleine', url: `${VIDEO_PATHS.SEA}/baleine.mp4` },
    { name: 'Requin', url: `${VIDEO_PATHS.SEA}/requin.mp4` },
    { name: 'Orque', url: `${VIDEO_PATHS.SEA}/orque.mp4` },
    { name: 'Tortue', url: `${VIDEO_PATHS.SEA}/tortue.mp4` },
    { name: 'Méduse', url: `${VIDEO_PATHS.SEA}/meduse.mp4` },
    { name: 'Pieuvre', url: `${VIDEO_PATHS.SEA}/pieuvre.mp4` },
    { name: 'Raie Manta', url: `${VIDEO_PATHS.SEA}/raie.mp4` },
    { name: 'Hippocampe', url: `${VIDEO_PATHS.SEA}/hippocampe.mp4` },
    { name: 'Phoque', url: `${VIDEO_PATHS.SEA}/phoque.mp4` },
    { name: 'Morse', url: `${VIDEO_PATHS.SEA}/morse.mp4` },
    { name: 'Pingouin', url: `${VIDEO_PATHS.SEA}/pingouin.mp4` },
    { name: 'Manchot', url: `${VIDEO_PATHS.SEA}/manchot.mp4` },
    { name: 'Otarie', url: `${VIDEO_PATHS.SEA}/otarie.mp4` },
    { name: 'Narval', url: `${VIDEO_PATHS.SEA}/narval.mp4` }
  ],
  desert: [
    { name: 'Dromadaire', url: `${VIDEO_PATHS.DESERT}/dromadaire.mp4` },
    { name: 'Fennec', url: `${VIDEO_PATHS.DESERT}/fennec.mp4` },
    { name: 'Scorpion', url: `${VIDEO_PATHS.DESERT}/scorpion.mp4` },
    { name: 'Vipère', url: `${VIDEO_PATHS.DESERT}/vipere.mp4` },
    { name: 'Gerboise', url: `${VIDEO_PATHS.DESERT}/gerboise.mp4` },
    { name: 'Gazelle', url: `${VIDEO_PATHS.DESERT}/gazelle.mp4` },
    { name: 'Outarde', url: `${VIDEO_PATHS.DESERT}/outarde.mp4` },
    { name: 'Addax', url: `${VIDEO_PATHS.DESERT}/addax.mp4` },
    { name: 'Cobra', url: `${VIDEO_PATHS.DESERT}/cobra.mp4` },
    { name: 'Uromastyx', url: `${VIDEO_PATHS.DESERT}/uromastyx.mp4` },
    { name: 'Chacal', url: `${VIDEO_PATHS.DESERT}/chacal.mp4` },
    { name: 'Oryx', url: `${VIDEO_PATHS.DESERT}/oryx.mp4` },
    { name: 'Varan', url: `${VIDEO_PATHS.DESERT}/varan.mp4` },
    { name: 'Autruche', url: `${VIDEO_PATHS.DESERT}/autruche.mp4` },
    { name: 'Hyène', url: `${VIDEO_PATHS.DESERT}/hyene.mp4` }
  ],
  jungle: [
    { name: 'Jaguar', url: `${VIDEO_PATHS.JUNGLE}/jaguar.mp4` },
    { name: 'Toucan', url: `${VIDEO_PATHS.JUNGLE}/toucan.mp4` },
    { name: 'Anaconda', url: `${VIDEO_PATHS.JUNGLE}/anaconda.mp4` },
    { name: 'Ara', url: `${VIDEO_PATHS.JUNGLE}/ara.mp4` },
    { name: 'Tapir', url: `${VIDEO_PATHS.JUNGLE}/tapir.mp4` },
    { name: 'Paresseux', url: `${VIDEO_PATHS.JUNGLE}/paresseux.mp4` },
    { name: 'Capucin', url: `${VIDEO_PATHS.JUNGLE}/capucin.mp4` },
    { name: 'Tamanoir', url: `${VIDEO_PATHS.JUNGLE}/tamanoir.mp4` },
    { name: 'Ocelot', url: `${VIDEO_PATHS.JUNGLE}/ocelot.mp4` },
    { name: 'Quetzal', url: `${VIDEO_PATHS.JUNGLE}/quetzal.mp4` },
    { name: 'Tatou', url: `${VIDEO_PATHS.JUNGLE}/tatou.mp4` },
    { name: 'Iguane', url: `${VIDEO_PATHS.JUNGLE}/iguane.mp4` },
    { name: 'Colibri', url: `${VIDEO_PATHS.JUNGLE}/colibri.mp4` },
    { name: 'Caïman', url: `${VIDEO_PATHS.JUNGLE}/caiman.mp4` },
    { name: 'Orang-outan', url: `${VIDEO_PATHS.JUNGLE}/orang_outan.mp4` }
  ],
  tundra: [
    { name: 'Renne', url: `${VIDEO_PATHS.TUNDRA}/renne.mp4` },
    { name: 'Loup Arctique', url: `${VIDEO_PATHS.TUNDRA}/loup_arctique.mp4` },
    { name: 'Boeuf Musqué', url: `${VIDEO_PATHS.TUNDRA}/boeuf_musque.mp4` },
    { name: 'Renard Polaire', url: `${VIDEO_PATHS.TUNDRA}/renard_polaire.mp4` },
    { name: 'Harfang', url: `${VIDEO_PATHS.TUNDRA}/harfang.mp4` },
    { name: 'Lemming', url: `${VIDEO_PATHS.TUNDRA}/lemming.mp4` },
    { name: 'Lièvre Arctique', url: `${VIDEO_PATHS.TUNDRA}/lievre_arctique.mp4` },
    { name: 'Glouton', url: `${VIDEO_PATHS.TUNDRA}/glouton.mp4` },
    { name: 'Elan', url: `${VIDEO_PATHS.TUNDRA}/elan.mp4` },
    { name: 'Ours Blanc', url: `${VIDEO_PATHS.TUNDRA}/ours_blanc.mp4` },
    { name: 'Belette', url: `${VIDEO_PATHS.TUNDRA}/belette.mp4` },
    { name: 'Caribou', url: `${VIDEO_PATHS.TUNDRA}/caribou.mp4` },
    { name: 'Hermine', url: `${VIDEO_PATHS.TUNDRA}/hermine.mp4` },
    { name: 'Lagopède', url: `${VIDEO_PATHS.TUNDRA}/lagopede.mp4` },
    { name: 'Phoque', url: `${VIDEO_PATHS.TUNDRA}/phoque.mp4` }
  ],
  rocky_coast: [
    { name: 'Macareux', url: `${VIDEO_PATHS.ROCKY_COAST}/macareux.mp4` },
    { name: 'Goéland', url: `${VIDEO_PATHS.ROCKY_COAST}/goeland.mp4` },
    { name: 'Fou de Bassan', url: `${VIDEO_PATHS.ROCKY_COAST}/fou_de_bassan.mp4` },
    { name: 'Phoque Gris', url: `${VIDEO_PATHS.ROCKY_COAST}/phoque_gris.mp4` },
    { name: 'Mouette', url: `${VIDEO_PATHS.ROCKY_COAST}/mouette.mp4` },
    { name: 'Crabe', url: `${VIDEO_PATHS.ROCKY_COAST}/crabe.mp4` },
    { name: 'Homard', url: `${VIDEO_PATHS.ROCKY_COAST}/homard.mp4` },
    { name: 'Étoile de Mer', url: `${VIDEO_PATHS.ROCKY_COAST}/etoile_mer.mp4` },
    { name: 'Bernard', url: `${VIDEO_PATHS.ROCKY_COAST}/bernard.mp4` },
    { name: 'Cormoran', url: `${VIDEO_PATHS.ROCKY_COAST}/cormoran.mp4` },
    { name: 'Balane', url: `${VIDEO_PATHS.ROCKY_COAST}/balane.mp4` },
    { name: 'Bigorneau', url: `${VIDEO_PATHS.ROCKY_COAST}/bigorneau.mp4` },
    { name: 'Huître', url: `${VIDEO_PATHS.ROCKY_COAST}/huitre.mp4` },
    { name: 'Moule', url: `${VIDEO_PATHS.ROCKY_COAST}/moule.mp4` },
    { name: 'Oursin', url: `${VIDEO_PATHS.ROCKY_COAST}/oursin.mp4` }
  ]
};

// Configuration des positions des boutons
const BUTTON_POSITIONS = {
  CENTER: { top: 50, left: 50 },
  NORTH: { top: 30, left: 50 },
  NORTH_EAST: { top: 35.75, left: 64.25 },
  EAST: { top: 50, left: 70 },
  SOUTH_EAST: { top: 64.25, left: 64.25 },
  SOUTH: { top: 70, left: 50 },
  SOUTH_WEST: { top: 64.25, left: 35.75 },
  WEST: { top: 50, left: 30 },
  NORTH_WEST: { top: 35.75, left: 35.75 },
  NORTH_EAST_EXTERNAL: { top: 35.75, left: 84.25 },
  EAST_EXTERNAL: { top: 50, left: 90 },
  SOUTH_EAST_EXTERNAL: { top: 64.25, left: 84.25 },
  SOUTH_WEST_EXTERNAL: { top: 64.25, left: 15.75 },
  WEST_EXTERNAL: { top: 50, left: 10 },
  NORTH_WEST_EXTERNAL: { top: 35.75, left: 15.75 }
};

// Fonction de mélange optimisée
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Export des vidéos spéciales avec les chemins normalisés
const encouragementVideo = VIDEO_PATHS.SPECIAL.ENCOURAGEMENT;
const victoryVideo = VIDEO_PATHS.SPECIAL.VICTORY;
const introductionVideo = VIDEO_PATHS.SPECIAL.INTRO;
const musicVideo = VIDEO_PATHS.SPECIAL.MUSIC;

// Exports
export {
  buttonColors,
  videoThemes,
  encouragementVideo,
  victoryVideo,
  introductionVideo,
  musicVideo,
  shuffleArray,
  BUTTON_POSITIONS,
  VIDEO_PATHS
};