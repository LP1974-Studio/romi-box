# Bill of Materials (BOM) - Romi Box

## Composants Principaux

### Microcontrôleur et Communication
| ID | Composant | Spécifications | Quantité | Notes |
|----|-----------|----------------|-----------|-------|
| MC1 | ESP32S3 | Module DevKit | 1 | Avec antenne intégrée |
| MC2 | Support ESP32S3 | PCB Mount | 1 | Optionnel |

### Alimentation
| ID | Composant | Spécifications | Quantité | Notes |
|----|-----------|----------------|-----------|-------|
| PS1 | Chargeur LiPo USB-C | 5V input, 4.2V output | 1 | Protection intégrée |
| PS2 | Batterie LiPo | 3.7V 2200mAh | 1 | Avec protection |
| PS3 | Convertisseur TLV322569 | 3.3V output | 1 | Régulateur Low-dropout |
| PS4 | Interrupteur ON/OFF | 3A min | 1 | Type glissière |
| PS5 | LED Bicolore | Rouge/Vert, 3mm | 1 | Indicateur charge |
| PS6 | Port USB Type-C | Female connector | 1 | Pour charge |

### Boutons
| ID | Composant | Spécifications | Quantité | Notes |
|----|-----------|----------------|-----------|-------|
| BT1 | Bouton Rouge | Arcade style, LED | 1 | Dia. 30mm |
| BT2 | Boutons Bleus | Arcade style, LED | 2 | Dia. 30mm |
| BT3 | Boutons Jaunes | Arcade style, LED | 2 | Dia. 30mm |
| BT4 | Boutons Verts | Arcade style, LED | 2 | Dia. 30mm |
| BT5 | Boutons Blancs | Arcade style, LED | 2 | Dia. 30mm |
| BT6 | Boutons Noirs | Arcade style, LED | 6 | Dia. 30mm |

### Résistances
| ID | Composant | Spécifications | Quantité | Notes |
|----|-----------|----------------|-----------|-------|
| R1 | Résistance LED | 1kΩ | 1 | Pour LED charge |
| R2 | Résistances Pull-up | 10kΩ | 15 | Pour boutons |

### Câblage
| ID | Composant | Spécifications | Quantité | Notes |
|----|-----------|----------------|-----------|-------|
| W1 | Fil silicone | AWG22, multicolore | 2m | Pour boutons |
| W2 | Fil batterie | AWG20, rouge/noir | 30cm | Pour alimentation |
| W3 | Gaine thermorétractable | Assortiment | 1 lot | Protection |
| W4 | Connecteurs JST | 2 pins, 2.54mm | 5 paires | Déconnexion rapide |

### Boîtier
| ID | Composant | Spécifications | Quantité | Notes |
|----|-----------|----------------|-----------|-------|
| C1 | Boîtier principal | 300x200x100mm | 1 | Avec ventilation |
| C2 | Support batterie | Pour 18650/LiPo | 1 | Avec fixations |
| C3 | Panel mount USB-C | Pour boîtier | 1 | Étanche |
| C4 | Vis et écrous | M3, assortiment | 1 lot | Fixation composants |

## Consommables

### Soudure et Assemblage
| ID | Composant | Spécifications | Quantité | Notes |
|----|-----------|----------------|-----------|-------|
| S1 | Soudure | Sans plomb, 0.8mm | 1 rouleau | Pour électronique |
| S2 | Flux | No-clean | 1 | Pour soudure |
| S3 | Ruban adhésif double face | Fort maintien | 1 rouleau | Fixation PCB |
| S4 | Pâte thermique | Conductrice | 1 tube | Pour régulateur |

## Outils Recommandés

### Pour l'Assemblage
| Outil | Usage | Notes |
|-------|--------|-------|
| Fer à souder | Soudure composants | Temp. réglable |
| Multimètre | Test continuité/tension | Digital |
| Tournevis | Assemblage boîtier | Set précision |
| Pince coupante | Coupe câbles/pattes | De précision |
| Pince à dénuder | Préparation câbles | Automatique |

### Pour la Programmation
| Outil | Usage | Notes |
|-------|--------|-------|
| Câble USB-C | Programmation ESP32 | Data capable |
| PC | Développement | Avec Bluetooth |

## Notes d'Approvisionnement

### Fournisseurs Recommandés
1. Microcontrôleur : Mouser/Digikey
2. Batterie : Fabricant certifié
3. Boutons : Fabricant arcade
4. Composants généraux : Farnell/RS

### Alternatives Possibles
1. ESP32S3 : ESP32S2 (moins cher mais sans BLE)
2. Batterie : 18650 avec support
3. Boutons : Version non-LED
4. Boîtier : Impression 3D

## Stock Minimum Recommandé

### Pièces Critiques
- 1x ESP32S3 de rechange
- 1x Batterie de rechange
- 2x Boutons de chaque couleur
- 1x Convertisseur de rechange

### Consommables
- Soudure : 100g
- Câbles : 5m assortis
- Connecteurs : 10 paires
- Visserie : 50 pièces