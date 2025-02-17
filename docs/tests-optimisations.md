# Tests et Optimisations Romi Box

## 1. Tests Matériels

### 1.1 Tests Électriques
```
Circuit Alimentation :
- Tension USB-C : 5V ±0.25V
- Tension Batterie : 3.7-4.2V
- Sortie Régulateur : 3.3V ±0.1V
- Courant de charge : max 1A
- Courant en veille : < 50mA
```

### 1.2 Tests Boutons
```cpp
// Code de test boutons
void testButtons() {
    for(int i = 0; i < numButtons; i++) {
        if(!digitalRead(buttonPins[i])) {
            Serial.printf("Button %d pressed\n", i);
            delay(50); // Debounce
        }
    }
}
```

### 1.3 Test Bluetooth
```cpp
// Vérification signal
void testBLESignal() {
    if(deviceConnected) {
        int rssi = pClient->getRssi();
        Serial.printf("Signal strength: %d dBm\n", rssi);
    }
}
```

## 2. Tests Logiciels

### 2.1 Tests Frontend React
```javascript
// Test composant RomiBox
describe('RomiBox Component', () => {
    test('Bluetooth Connection', async () => {
        // Test connexion
        expect(isBluetoothConnected).toBe(true);
    });

    test('Video Playback', () => {
        // Test lecture vidéo
        expect(videoRef.current.paused).toBe(false);
    });
});
```

### 2.2 Tests Bluetooth Manager
```javascript
// Test gestionnaire Bluetooth
describe('BluetoothManager', () => {
    test('Connection Flow', async () => {
        const manager = new BluetoothManager();
        const connected = await manager.connect();
        expect(connected).toBe(true);
    });

    test('Data Reception', () => {
        // Test réception données
        expect(receivedData).toMatch(/^[0-1,]{15}$/);
    });
});
```

## 3. Optimisations

### 3.1 Optimisation Batterie
```cpp
// Mode économie d'énergie ESP32
void optimizePower() {
    // Désactiver WiFi
    WiFi.mode(WIFI_OFF);
    
    // Réduire fréquence CPU
    setCpuFrequencyMhz(80);
    
    // Activer light sleep entre les lectures
    esp_sleep_enable_timer_wakeup(50000);
}
```

### 3.2 Optimisation React
```javascript
// Utilisation de useCallback pour les fonctions
const handleButtonPress = useCallback((buttonIndex) => {
    if (Date.now() - lastPress < 200) return; // Debounce
    // Traitement du bouton
}, [lastPress]);

// Mise en cache des vidéos
const videoCache = useMemo(() => {
    return new Map(videoList.map(video => [
        video.id,
        new URL(video.url)
    ]));
}, [videoList]);
```

### 3.3 Optimisation Bluetooth
```javascript
// Gestion optimisée des paquets MIDI
class OptimizedBluetoothManager {
    constructor() {
        this.pendingUpdates = new Set();
        this.updateInterval = 50; // ms
    }

    queueUpdate(buttonState) {
        this.pendingUpdates.add(buttonState);
        this.scheduleUpdate();
    }

    scheduleUpdate() {
        if (!this.updateScheduled) {
            this.updateScheduled = setTimeout(() => {
                this.sendBatchUpdates();
            }, this.updateInterval);
        }
    }
}
```

## 4. Benchmarks

### 4.1 Performances Critiques
```
Latence Bluetooth : < 100ms
Démarrage vidéo : < 200ms
Réponse boutons : < 50ms
Durée batterie : > 8h
```

### 4.2 Métriques Frontend
```javascript
// Monitoring performances
const metrics = {
    buttonLatency: [],
    videoLoadTime: [],
    bluetoothReconnects: 0,
    batteryDrain: []
};

function logMetrics(type, value) {
    metrics[type].push({
        value,
        timestamp: Date.now()
    });
}
```

## 5. Tests de Charge

### 5.1 Test Batterie
```
Test de décharge complète :
1. Démarrage à 100%
2. Utilisation continue
3. Mesure toutes les 30min
4. Jusqu'à 10% batterie
```

### 5.2 Test Multi-boutons
```javascript
// Simulation pression multiple
async function stressTest() {
    const buttons = Array(15).fill(0);
    for(let i = 0; i < 1000; i++) {
        const randomButton = Math.floor(Math.random() * 15);
        buttons[randomButton] = 1;
        await handleButtonStates(buttons);
        await sleep(100);
        buttons[randomButton] = 0;
    }
}
```

## 6. Procédures de Tests

### 6.1 Test Initial
1. Vérification alimentation
2. Test boutons individuels
3. Test connexion Bluetooth
4. Test lecture vidéo
5. Test mode jeu

### 6.2 Test Périodique
1. Vérification batterie
2. Test signal Bluetooth
3. Validation latence
4. Test mémoire
5. Test performances

### 6.3 Test Post-Maintenance
1. Validation réparation
2. Test complet système
3. Benchmark comparatif
4. Test longue durée