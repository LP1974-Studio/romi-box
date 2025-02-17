# Romi Box

## Description
Romi Box est un dispositif éducatif interactif conçu pour les enfants de 1 à 6 ans, combinant une interface physique avec 15 boutons colorés et une application React moderne.

## Installation

### Prérequis
- Node.js v14+
- ESP32S3 avec support Arduino IDE
- Navigateur avec support Web Bluetooth
- Composants matériels listés dans hardware/components/BOM.md

### Configuration Matérielle
1. Assembler le circuit selon les schémas dans hardware/schematics/
2. Flasher l'ESP32S3 avec le code dans src/esp32/
3. Vérifier les connexions des boutons
4. Tester l'alimentation

### Configuration Logicielle
```bash
# Installation des dépendances
cd src/frontend
npm install

# Démarrage en développement
npm start

# Build production
npm run build
```

## Structure des Vidéos
```
public/videos/
├── ferme/           # Animaux de la ferme
├── savane/          # Animaux de la savane
└── foret/           # Animaux de la forêt
```

## Utilisation

### Mode Standard
1. Connecter au contrôleur Bluetooth
2. Sélectionner un thème
3. Utiliser les boutons pour déclencher les vidéos

### Mode Jeu
1. Appuyer sur "Lancer le jeu"
2. Suivre les instructions vidéo
3. Trouver l'animal demandé

## Dépannage
- Vérifier la LED de charge
- Tester la connexion Bluetooth
- Consulter les logs dans la console

## Support
Pour toute assistance :
1. Consulter la documentation dans /docs
2. Vérifier les guides de dépannage
3. Suivre les procédures de maintenance

## Licence
Tous droits réservés
