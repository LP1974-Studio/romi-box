class BluetoothManager {
    constructor() {
        // UUID corrigé en minuscules avec des tirets
        this.SERVICE_UUID = '03b80e5a-ede8-4b33-a751-6ce34ec4c700';
        this.CHARACTERISTIC_UUID = '7772e5db-3868-4112-a1a9-f2669d106bf3';

        // États de connexion et de gestion
        this.device = null;
        this.server = null;
        this.service = null;
        this.characteristic = null;
        
        // États et callbacks
        this.isConnected = false;
        this.onButtonStateChange = null;
        this.onConnectionChange = null;

        // Configuration des boutons
        this.numButtons = 15;
        this.buttonStates = new Array(this.numButtons).fill(false);
        this.lastButtonStates = new Array(this.numButtons).fill(false);

        // Bind des méthodes
        this.boundHandleDisconnection = this.handleDisconnection.bind(this);
        this.boundHandleMIDIMessage = this.handleMIDIMessage.bind(this);
    }

    // Singleton
    static getInstance() {
        if (!BluetoothManager.instance) {
            BluetoothManager.instance = new BluetoothManager();
        }
        return BluetoothManager.instance;
    }

    async isBluetoothSupported() {
        if (!navigator.bluetooth) {
            console.error('Web Bluetooth non supporté');
            return false;
        }
        return true;
    }

    async connect() {
        try {
            console.log('Début de la connexion Bluetooth ROMI BOX');

            // Vérifier le support Bluetooth
            if (!await this.isBluetoothSupported()) {
                throw new Error('Bluetooth non supporté');
            }

            // Demande de connexion avec le nom spécifique du dispositif
            console.log('Demande de connexion au dispositif Bluetooth');
            this.device = await navigator.bluetooth.requestDevice({
                filters: [{
                    name: "ROMI BOX MIDI"
                }],
                optionalServices: [this.SERVICE_UUID]
            });
            console.log('Dispositif sélectionné:', this.device.name);

            // Ajout du listener de déconnexion
            this.device.addEventListener('gattserverdisconnected', this.boundHandleDisconnection);

            // Connexion au serveur GATT
            console.log('Connexion au serveur GATT');
            this.server = await this.device.gatt.connect();
            
            // Récupération du service
            console.log('Récupération du service');
            this.service = await this.server.getPrimaryService(this.SERVICE_UUID);

            // Récupération de la caractéristique
            console.log('Récupération de la caractéristique');
            this.characteristic = await this.service.getCharacteristic(this.CHARACTERISTIC_UUID);

            // Activer les notifications
            console.log('Activation des notifications');
            await this.characteristic.startNotifications();
            this.characteristic.addEventListener('characteristicvaluechanged', this.boundHandleMIDIMessage);

            // Mise à jour des états
            this.isConnected = true;

            console.log('Connexion Bluetooth ROMI BOX réussie');

            // Callback de connexion
            if (this.onConnectionChange) {
                this.onConnectionChange(true);
            }

        } catch (error) {
            console.error('Erreur de connexion Bluetooth ROMI BOX:', error);
            this.handleConnectionError(error);
        }
    }

    handleMIDIMessage(event) {
        try {
            const value = event.target.value;
            
            // Log du message brut
            console.log('Message MIDI reçu:', Array.from(new Uint8Array(value.buffer)));

            // Vérification du format MIDI
            if (value.byteLength === 5 && 
                value.getUint8(0) === 0x80 && 
                value.getUint8(1) === 0x80 && 
                value.getUint8(2) === 0x90) {
                
                const buttonIndex = value.getUint8(3);
                const isPressed = value.getUint8(4) > 0;

                console.log(`Bouton ${buttonIndex} : ${isPressed ? 'PRESSÉ' : 'RELÂCHÉ'}`);

                // Réinitialiser tous les états
                this.buttonStates = new Array(this.numButtons).fill(false);
                
                // Mettre à jour l'état du bouton spécifique
                if (buttonIndex >= 0 && buttonIndex < this.numButtons) {
                    this.buttonStates[buttonIndex] = isPressed;
                    
                    if (this.onButtonStateChange) {
                        this.onButtonStateChange(this.buttonStates);
                    }
                }

                // Mettre à jour les derniers états
                this.lastButtonStates = [...this.buttonStates];
            }
        } catch (error) {
            console.error('Erreur de traitement du message MIDI:', error);
        }
    }

    handleConnectionError(error) {
        console.error('Erreur de connexion Bluetooth:', error);
        
        this.isConnected = false;
        this.device = null;
        this.server = null;
        this.service = null;
        this.characteristic = null;

        if (this.onConnectionChange) {
            this.onConnectionChange(false);
        }

        // Informer l'utilisateur de l'échec de la connexion
        alert('La connexion Bluetooth a échoué. Veuillez réessayer manuellement.');
    }

    handleDisconnection() {
        console.log('Appareil Bluetooth déconnecté');
        
        this.isConnected = false;
        this.device = null;
        this.server = null;
        this.service = null;
        this.characteristic = null;

        if (this.onConnectionChange) {
            this.onConnectionChange(false);
        }

        // Informer l'utilisateur de la déconnexion
        alert('La connexion Bluetooth a été perdue. Veuillez vous reconnecter manuellement si nécessaire.');
    }

    disconnect() {
        if (this.device && this.device.gatt.connected) {
            console.log('Déconnexion manuelle de l\'appareil Bluetooth');
            this.device.gatt.disconnect();
        }

        this.isConnected = false;
        this.device = null;
        this.server = null;
        this.service = null;
        this.characteristic = null;

        if (this.onConnectionChange) {
            this.onConnectionChange(false);
        }
    }

    setButtonStateChangeCallback(callback) {
        this.onButtonStateChange = callback;
    }

    setConnectionChangeCallback(callback) {
        this.onConnectionChange = callback;
    }
}

BluetoothManager.instance = null;

export default BluetoothManager;