# Tests Matériels Détaillés Romi Box

## 1. Tests Circuit d'Alimentation

### 1.1 Test USB-C et Charge
| Point de Test | Valeur Attendue | Méthode de Test | Critère de Réussite |
|--------------|-----------------|-----------------|-------------------|
| Tension USB-C | 5V ±0.25V | Multimètre sur pins USB | Stable sous charge |
| Courant Charge | 1A max | Pince ampèremétrique | Ne dépasse pas 1.2A |
| Protection Inverse | Pas de courant | Test polarité inverse | Aucun dommage |
| Température | <45°C | Thermomètre IR | Stable en charge |

### 1.2 Test Batterie
| Test | Spécification | Procédure | Validation |
|------|---------------|-----------|------------|
| Tension nominale | 3.7V | Mesure directe | 3.6-3.8V |
| Tension charge | 4.2V max | Monitoring charge | Ne dépasse pas 4.2V |
| Capacité | 2200mAh | Test décharge | >2000mAh |
| Protection | Coupure à 3.0V | Décharge contrôlée | Coupure automatique |

### 1.3 Test Convertisseur TLV322569
```
Protocole de test :
1. Mesure sortie à vide : 3.3V ±0.1V
2. Mesure sous charge : Variation <5%
3. Test ripple : <50mV
4. Efficacité : >85%
```

## 2. Tests Boutons et Interface

### 2.1 Test Mécanique des Boutons
```cpp
// Code de test complet des boutons
const int DEBOUNCE_TIME = 50;
const int TEST_DURATION = 1000;

struct ButtonTest {
    unsigned long pressCount;
    unsigned long lastPressTime;
    bool lastState;
    bool hasError;
};

ButtonTest buttonTests[15] = {0};

void testButtonMechanics() {
    unsigned long startTime = millis();
    
    while(millis() - startTime < TEST_DURATION) {
        for(int i = 0; i < numButtons; i++) {
            bool currentState = !digitalRead(buttonPins[i]);
            
            if(currentState != buttonTests[i].lastState) {
                if(millis() - buttonTests[i].lastPressTime > DEBOUNCE_TIME) {
                    buttonTests[i].pressCount++;
                    buttonTests[i].lastPressTime = millis();
                } else {
                    buttonTests[i].hasError = true; // Rebond détecté
                }
            }
            buttonTests[i].lastState = currentState;
        }
    }
    
    // Rapport de test
    for(int i = 0; i < numButtons; i++) {
        Serial.printf("Button %d: Presses=%d, Errors=%s\n",
            i, buttonTests[i].pressCount,
            buttonTests[i].hasError ? "Yes" : "No");
    }
}
```

### 2.2 Test LED Boutons
```cpp
void testButtonLEDs() {
    // Test séquentiel
    for(int i = 0; i < numButtons; i++) {
        digitalWrite(ledPins[i], HIGH);
        delay(500);
        digitalWrite(ledPins[i], LOW);
    }
    
    // Test intensité lumineuse
    const int MIN_LUMINOSITY = 100;
    for(int i = 0; i < numButtons; i++) {
        analogWrite(ledPins[i], 255);
        int luminosity = analogRead(lightSensor);
        if(luminosity < MIN_LUMINOSITY) {
            Serial.printf("LED %d below threshold\n", i);
        }
    }
}
```

## 3. Tests Communication Bluetooth

### 3.1 Test Qualité Signal
```cpp
class SignalTester {
    private:
        int samples[100];
        int sampleIndex = 0;
        
    public:
        void measureSignal() {
            if(deviceConnected && sampleIndex < 100) {
                int rssi = pClient->getRssi();
                samples[sampleIndex++] = rssi;
                
                if(sampleIndex == 100) {
                    analyzeSignal();
                }
            }
        }
        
        void analyzeSignal() {
            int min = 0, max = 0, avg = 0;
            for(int i = 0; i < 100; i++) {
                min = min(min, samples[i]);
                max = max(max, samples[i]);
                avg += samples[i];
            }
            avg /= 100;
            
            Serial.printf("Signal Analysis:\n");
            Serial.printf("Min: %d dBm\n", min);
            Serial.printf("Max: %d dBm\n", max);
            Serial.printf("Avg: %d dBm\n", avg);
            Serial.printf("Variation: %d dBm\n", max - min);
        }
};
```

### 3.2 Test Latence
```cpp
void testLatency() {
    const int NUM_TESTS = 100;
    unsigned long times[NUM_TESTS];
    
    for(int i = 0; i < NUM_TESTS; i++) {
        unsigned long start = micros();
        
        // Envoi paquet test
        uint8_t testPacket[] = {0x80, 0x80, 0x90, 0x00, 0x7F};
        pCharacteristic->setValue(testPacket, 5);
        pCharacteristic->notify();
        
        // Attente réponse
        while(!responseReceived && micros() - start < 100000);
        
        times[i] = micros() - start;
        delay(100);
    }
    
    // Analyse statistique
    analyzeLatencyStats(times, NUM_TESTS);
}
```

## 4. Tests Environnementaux

### 4.1 Test Température
```cpp
struct TempTest {
    float ambient;
    float battery;
    float converter;
    float esp32;
    unsigned long timestamp;
};

void monitorTemperatures() {
    TempTest temps;
    temps.ambient = readAmbientTemp();
    temps.battery = readBatteryTemp();
    temps.converter = readConverterTemp();
    temps.esp32 = readESP32Temp();
    temps.timestamp = millis();
    
    // Alertes
    if(temps.battery > 45.0) {
        Serial.println("ALERTE: Température batterie élevée!");
    }
    if(temps.converter > 60.0) {
        Serial.println("ALERTE: Température convertisseur élevée!");
    }
    
    logTemperatures(temps);
}
```

### 4.2 Test Résistance
- Test chute : 1m sur surface dure
- Test vibration : Table vibrante 10-500Hz
- Test humidité : 95% HR pendant 48h
- Test température : -10°C à +50°C

## 5. Tests de Longue Durée

### 5.1 Test d'Endurance
```cpp
void enduranceTest() {
    unsigned long startTime = millis();
    const unsigned long TEST_DURATION = 24 * 60 * 60 * 1000; // 24h
    
    while(millis() - startTime < TEST_DURATION) {
        // Test cycle boutons
        cycleAllButtons();
        
        // Test communication
        sendTestPackets();
        
        // Test température
        monitorTemperatures();
        
        // Log batterie
        logBatteryStatus();
        
        delay(1000);
    }
}
```

### 5.2 Métriques de Fiabilité
```cpp
struct ReliabilityMetrics {
    unsigned long totalUptime;
    unsigned long buttonPresses;
    unsigned long bluetoothDisconnects;
    unsigned long errors;
    float batteryLife;
    float averageLatency;
};

void updateMetrics(ReliabilityMetrics &metrics) {
    metrics.totalUptime = millis();
    metrics.batteryLife = getBatteryPercentage();
    metrics.averageLatency = calculateAverageLatency();
    
    logMetrics(metrics);
}
```

## 6. Rapport de Tests

### 6.1 Format Rapport
```text
RAPPORT DE TEST ROMI BOX
Date: [DATE]
Version: [VERSION]
Testeur: [NOM]

1. ALIMENTATION
   - Tension USB: [VALEUR]V
   - Courant Charge: [VALEUR]A
   - Température Max: [VALEUR]°C
   
2. BOUTONS
   - Taux de Réussite: [%]
   - Latence Moyenne: [ms]
   - Erreurs Détectées: [NOMBRE]
   
3. BLUETOOTH
   - Force Signal: [dBm]
   - Latence: [ms]
   - Perte Paquets: [%]
   
4. ENDURANCE
   - Durée Test: [HEURES]
   - Cycles Complets: [NOMBRE]
   - Erreurs: [NOMBRE]

VERDICT: [PASS/FAIL]
Notes: [OBSERVATIONS]
```