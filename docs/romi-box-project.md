# Projet Romi Box - Structure Complète

```
RomiBox/
├── docs/
│   ├── README.md                 # Documentation principale
│   ├── SCHEMA.md                # Schémas de câblage détaillés
│   ├── MAINTENANCE.md           # Guide de maintenance
│   └── specifications/
│       ├── hardware.md          # Spécifications matérielles
│       └── software.md          # Spécifications logicielles
│
├── src/
│   ├── esp32/
│   │   ├── romi_controller.ino  # Code ESP32S3
│   │   └── config.h            # Configuration ESP32
│   │
│   ├── frontend/
│   │   ├── RomiBox.js          # Composant principal React
│   │   ├── BluetoothManager.js # Gestionnaire Bluetooth
│   │   └── RomiStyle.css       # Styles CSS
│   │
│   └── assets/
│       ├── images/
│       │   └── romi.png        # Logo et images
│       └── videos/             # Structure des vidéos
│           ├── ferme/
│           ├── savane/
│           └── foret/
│
└── hardware/
    ├── schematics/            # Schémas électroniques
    │   ├── power.pdf          # Circuit d'alimentation
    │   └── buttons.pdf        # Circuit des boutons
    │
    └── components/            # Liste des composants
        ├── BOM.md             # Bill of Materials
        └── datasheet/         # Fiches techniques
```

## Guide des Documents

### Documentation (docs/)
1. `README.md` : Documentation principale du projet
   - Vue d'ensemble
   - Installation
   - Configuration
   - Utilisation

2. `SCHEMA.md` : Schémas de câblage
   - Diagrammes détaillés
   - Instructions de montage
   - Points de test

3. `MAINTENANCE.md` : Guide de maintenance
   - Procédures de vérification
   - Dépannage
   - Mises à jour

4. `specifications/`
   - `hardware.md` : Détails techniques matériels
   - `software.md` : Architecture logicielle

### Code Source (src/)
1. `esp32/`
   - Code du microcontrôleur
   - Configuration MIDI
   - Gestion des boutons

2. `frontend/`
   - Interface React
   - Gestion Bluetooth
   - Styles CSS

3. `assets/`
   - Ressources graphiques
   - Contenu vidéo

### Matériel (hardware/)
1. `schematics/`
   - Schémas d'alimentation
   - Circuits des boutons
   - Plans de câblage

2. `components/`
   - Liste des composants (BOM)
   - Fiches techniques

## Versions des Documents

- Documentation Principale : v1.0
- Schémas de Câblage : v1.1 (mise à jour interrupteur)
- Code ESP32 : v1.0
- Interface React : v1.0

## Mises à Jour Récentes

1. Ajout de l'interrupteur ON/OFF
2. Mise à jour des schémas d'alimentation
3. Documentation du système de charge
4. Ajout des logs de debug Bluetooth

## Notes d'Installation

1. Cloner le dépôt complet
2. Consulter docs/README.md
3. Suivre les instructions de montage
4. Tester avec les procédures de vérification

## Maintenance des Documents

- Mettre à jour la version lors des modifications
- Documenter les changements dans CHANGELOG.md
- Maintenir la cohérence entre les schémas et le code
- Vérifier les liens entre les documents