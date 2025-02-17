# Spécifications Logicielles Romi Box

## Architecture Générale

### Frontend (React)
```
src/frontend/
├── RomiBox.js          # Composant principal
├── BluetoothManager.js # Gestion Bluetooth
└── RomiStyle.css       # Styles
```

### Backend (ESP32)
```
src/esp32/
├── romi_controller.ino # Programme principal
└── config.h           # Configuration
```

## Spécifications Techniques

### Frontend

#### Technologies Utilisées
- React 18+
- Web Bluetooth API
- Web Audio/Video API
- CSS3 modules

#### Dépendances Principales
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "web-bluetooth": "^0.1.0"
  }
}
```

#### Structure des États
```javascript
const [currentTheme, setCurrentTheme] = useState('farm');
const [isGameActive, setIsGameActive] = useState(false);
const [buttonLayout, setButtonLayout] = useState([]);
const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);
```

### Backend (ESP32)

#### Configuration Bluetooth
```cpp
// UUIDs pour MIDI
#define SERVICE_UUID        "03B80E5A-EDE8-4B33-A751-6CE34EC4C700"
#define CHARACTERISTIC_UUID "7772E5DB-3868-4112-A1A9-F2669D106BF3"
```

#### Configuration GPIO
```cpp
const int numButtons = 15;
const int buttonPins[numButtons] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15};
```

## Communication

### Protocole Bluetooth
1. **Format MIDI**
   ```
   [0x80, Timestamp, NoteOn, ButtonIndex, Velocity]
   ```

2. **États Boutons**
   ```javascript
   buttonStates = [false, false, true, ...]; // 15 états
   ```

## Fonctionnalités

### Gestion des Thèmes
```javascript
const videoThemes = {
  farm: [
    { name: 'Mouton', url: '/videos/ferme/mouton.MP4' },
    // ...
  ],
  savanna: [...],
  forest: [...]
};
```

### Système de Jeu
1. Mode Libre
   - Accès direct aux vidéos
   - Navigation par thème

2. Mode Jeu
   - Sélection aléatoire
   - Système de score
   - Retour visuel/audio

## Gestion des Médias

### Structure Vidéos
```
public/videos/
├── ferme/
│   ├── animaux/
│   └── selection/
├── savane/
│   ├── animaux/
│   └── selection/
└── foret/
    ├── animaux/
    └── selection/
```

### Format Vidéos
- Format: MP4
- Codec: H.264
- Audio: AAC
- Résolution: 1280x720
- Framerate: 30fps

## Gestion des Erreurs

### Frontend
```javascript
try {
  // Actions Bluetooth/Vidéo
} catch (error) {
  console.error('Type:', error.type);
  console.error('Message:', error.message);
  // Gestion erreur utilisateur
}
```

### Backend
```cpp
if (!deviceConnected) {
  // Tentative reconnexion
  delay(500);
}
```

## Tests

### Frontend
1. Tests Unitaires
   - Composants React
   - Gestionnaire Bluetooth
   - Logique de jeu

2. Tests d'Intégration
   - Communication Bluetooth
   - Lecture vidéo
   - États de l'application

### Backend
1. Tests Hardware
   - Lecture boutons
   - Envoi MIDI
   - Gestion énergie

2. Tests Communication
   - Connexion BLE
   - Latence
   - Perte de connexion

## Optimisations

### Performance
1. Debouncing boutons
   ```javascript
   const debounceDelay = 200; // ms
   ```

2. Préchargement vidéos
   ```javascript
   const preloadVideos = async (theme) => {
     // Logique préchargement
   };
   ```

### Batterie
1. Mode économie d'énergie
2. Gestion veille
3. Monitoring batterie

## Maintenance

### Logs
```javascript
console.log({
  event: 'buttonPress',
  button: buttonIndex,
  timestamp: Date.now(),
  batteryLevel: battery.level
});
```

### Mise à Jour
1. Frontend: Via serveur web
2. Backend: Via USB/OTA
3. Contenu: Système de versions

## Sécurité

### Bluetooth
1. Appairage sécurisé
2. Chiffrement données
3. Validation connexion

### Données
1. Validation entrées
2. Sanitization chemins
3. Protection ressources

## Documentation API

### BluetoothManager
```javascript
class BluetoothManager {
  connect()
  disconnect()
  sendMessage(data)
  handleResponse(callback)
}
```

### Composant Principal
```javascript
RomiBox {
  Props: {}
  State: {
    theme: string
    connected: boolean
    gameActive: boolean
  }
  Methods: {
    handleButtonPress()
    changeTheme()
    startGame()
  }
}
```