# Tests Communication Bluetooth MIDI

## 1. Tests de Base

### 1.1 Test de Découverte
```cpp
// ESP32
void testDiscovery() {
    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->setDeviceName("ROMI BOX MIDI");
    // UUIDs standards MIDI
    pAdvertising->addServiceUUID("03B80E5A-EDE8-4B33-A751-6CE34EC4C700");
    pAdvertising->setScanResponse(true);
    pAdvertising->setMinPreferred(0x06);
    BLEDevice::startAdvertising();
}

// React
async function testDiscovery() {
    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ name: 'ROMI BOX MIDI' }],
            optionalServices: ['03B80E5A-EDE8-4B33-A751-6CE34EC4C700']
        });
        console.log('Device found:', device.name);
        return true;
    } catch (error) {
        console.error('Discovery failed:', error);
        return false;
    }
}
```

### 1.2 Test de Connexion
```javascript
class ConnectionTester {
    constructor() {
        this.connectionAttempts = 0;
        this.successfulConnections = 0;
        this.disconnections = 0;
        this.averageConnectTime = 0;
    }

    async testConnection() {
        const startTime = Date.now();
        try {
            this.connectionAttempts++;
            const connected = await this.bluetoothManager.connect();
            if (connected) {
                this.successfulConnections++;
                this.averageConnectTime = 
                    (this.averageConnectTime * (this.successfulConnections - 1) + 
                    (Date.now() - startTime)) / this.successfulConnections;
            }
            return connected;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    }

    getStats() {
        return {
            attempts: this.connectionAttempts,
            successes: this.successfulConnections,
            successRate: (this.successfulConnections / this.connectionAttempts) * 100,
            avgConnectTime: this.averageConnectTime,
            disconnections: this.disconnections
        };
    }
}
```

## 2. Tests MIDI

### 2.1 Test Message MIDI
```cpp
// ESP32
void testMIDIMessage(uint8_t buttonIndex) {
    if (deviceConnected) {
        uint8_t midiPacket[] = {
            0x80,  // Header
            0x80,  // Timestamp
            0x90,  // Note On canal 1
            buttonIndex,
            0x7F   // Vélocité maximum
        };
        
        unsigned long startTime = micros();
        pCharacteristic->setValue(midiPacket, 5);
        pCharacteristic->notify();
        
        // Log latence
        unsigned long endTime = micros();
        Serial.printf("MIDI send time: %lu microseconds\n", endTime - startTime);
    }
}

// Vérification réception
void testMIDIReception(const uint8_t* data, size_t length) {
    if (length == 5 && data[0] == 0x80) {
        uint8_t button = data[3];
        uint8_t velocity = data[4];
        
        Serial.printf("MIDI received - Button: %d, Velocity: %d\n", 
                     button, velocity);
    }
}
```

### 2.2 Test Performance MIDI
```javascript
class MIDIPerformanceTester {
    async testMIDIThroughput() {
        const NUM_MESSAGES = 100;
        const messages = [];
        let lostMessages = 0;

        for (let i = 0; i < NUM_MESSAGES; i++) {
            const startTime = performance.now();
            try {
                await this.sendMIDIMessage(i % 15);
                messages.push({
                    messageId: i,
                    latency: performance.now() - startTime,
                    success: true
                });
            } catch (error) {
                lostMessages++;
                messages.push({
                    messageId: i,
                    error: error.message,
                    success: false
                });
            }
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        return {
            totalMessages: NUM_MESSAGES,
            successfulMessages: NUM_MESSAGES - lostMessages,
            lostMessages,
            averageLatency: messages
                .filter(m => m.success)
                .reduce((acc, m) => acc + m.latency, 0) / (NUM_MESSAGES - lostMessages),
            messageLog: messages
        };
    }
}
```

## 3. Tests de Robustesse

### 3.1 Test Interférences
```javascript
class InterferenceTest {
    async testWithInterference() {
        const results = {
            normalCondition: await this.testConnection(),
            withWiFi: null,
            withBluetooth: null,
            withMicrowave: null
        };

        // Test avec WiFi actif
        await this.enableWiFi();
        results.withWiFi = await this.testConnection();

        // Test avec autres appareils Bluetooth
        await this.enableNearbyBluetooth();
        results.withBluetooth = await this.testConnection();

        // Test avec interférences électromagnétiques
        results.withMicrowave = await this.testConnection();

        return results;
    }

    analyzeInterference(results) {
        return {
            baselineQuality: results.normalCondition.signalStrength,
            wifiImpact: results.normalCondition.signalStrength - results.withWiFi.signalStrength,
            bluetoothImpact: results.normalCondition.signalStrength - results.withBluetooth.signalStrength,
            microwaveImpact: results.normalCondition.signalStrength - results.withMicrowave.signalStrength
        };
    }
}
```

### 3.2 Test Distance
```javascript
class RangeTest {
    async testRange() {
        const distances = [0.5, 1, 2, 3, 4, 5]; // mètres
        const results = [];

        for (const distance of distances) {
            const result = await this.testAtDistance(distance);
            results.push({
                distance,
                signalStrength: result.rssi,
                packetLoss: result.packetLoss,
                latency: result.latency
            });
        }

        return {
            maxRange: this.findMaxRange(results),
            optimalRange: this.findOptimalRange(results),
            results
        };
    }

    findOptimalRange(results) {
        return results.reduce((best, current) => {
            const score = current.signalStrength - (current.packetLoss * 2);
            return score > best.score ? { distance: current.distance, score } : best;
        }, { distance: 0, score: -Infinity }).distance;
    }
}
```

## 4. Tests de Stress

### 4.1 Test Multi-boutons
```javascript
class ButtonStressTest {
    async testMultipleButtons() {
        const NUM_PRESSES = 1000;
        const results = [];

        for (let i = 0; i < NUM_PRESSES; i++) {
            const buttons = this.generateRandomButtonCombination();
            const startTime = performance.now();
            
            try {
                await this.sendButtonStates(buttons);
                results.push({
                    combination: buttons,
                    latency: performance.now() - startTime,
                    success: true
                });
            } catch (error) {
                results.push({
                    combination: buttons,
                    error: error.message,
                    success: false
                });
            }
        }

        return this.analyzeStressResults(results);
    }

    analyzeStressResults(results) {
        return {
            totalTests: results.length,
            successRate: (results.filter(r => r.success).length / results.length) * 100,
            averageLatency: results
                .filter(r => r.success)
                .reduce((acc, r) => acc + r.latency, 0) / results.length,
            failures: results.filter(r => !r.success).length
        };
    }
}
```

### 4.2 Test Reconnexion
```javascript
class ReconnectionTest {
    async testReconnection() {
        const NUM_TESTS = 50;
        const results = [];

        for (let i = 0; i < NUM_TESTS; i++) {
            const startTime = performance.now();
            await this.forceDisconnect();
            
            try {
                const reconnected = await this.waitForReconnection(5000); // 5s timeout
                results.push({
                    attempt: i,
                    time: performance.now() - startTime,
                    success: reconnected
                });
            } catch (error) {
                results.push({
                    attempt: i,
                    error: error.message,
                    success: false
                });
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        return {
            successRate: (results.filter(r => r.success).length / NUM_TESTS) * 100,
            averageReconnectTime: results
                .filter(r => r.success)
                .reduce((acc, r) => acc + r.time, 0) / results.filter(r => r.success).length,
            failures: results.filter(r => !r.success).length
        };
    }
}
```

## 5. Monitoring et Rapports

### 5.1 Logger Bluetooth
```javascript
class BluetoothLogger {
    constructor() {
        this.logs = [];
        this.startTime = Date.now();
    }

    log(event) {
        const timestamp = Date.now() - this.startTime;
        this.logs.push({
            timestamp,
            ...event
        });
    }

    generateReport() {
        const totalEvents = this.logs.length;
        const errorEvents = this.logs.filter(l => l.type === 'error').length;
        const disconnections = this.logs.filter(l => l.type === 'disconnection').length;
        
        return {
            duration: Date.now() - this.startTime,
            totalEvents,
            errorRate: (errorEvents / totalEvents) * 100,
            disconnectionRate: (disconnections / totalEvents) * 100,
            events: this.logs
        };
    }
}
```

### 5.2 Format Rapport
```javascript
function generateBluetoothReport(testResults) {
    return `
RAPPORT DE TEST BLUETOOTH MIDI
=============================
Date: ${new Date().toISOString()}
Durée des tests: ${testResults.duration}ms

1. Connexion
-----------
Taux de succès: ${testResults.connectionSuccess}%
Temps moyen de connexion: ${testResults.avgConnectTime}ms
Nombre de déconnexions: ${testResults.disconnections}

2. Performance MIDI
----------------
Messages envoyés: ${testResults.totalMessages}
Messages perdus: ${testResults.lostMessages}
Latence moyenne: ${testResults.avgLatency}ms

3. Robustesse
-----------
Distance optimale: ${testResults.optimalRange}m
Taux de perte de paquets: ${testResults.packetLoss}%
Impact interférences: ${testResults.interference}dB

4. Stress Test
------------
Taux de succès: ${testResults.stressSuccessRate}%
Temps moyen de réponse: ${testResults.stressAvgResponse}ms
Erreurs: ${testResults.stressErrors}

VERDICT: ${testResults.verdict}
Notes: ${testResults.notes}
    `;
}
```