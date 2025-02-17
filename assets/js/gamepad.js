class BLEGamepad {
    constructor() {
        this.device = null;
        this.server = null;
        this.service = null;
        this.characteristic = null;
        this.connected = false;
        this.buttonStates = new Array(15).fill(false);
        this.onButtonChangeCallback = null;
    }

    async connect() {
        try {
            console.log('Recherche du contrôleur RomiBox...');
            this.device = await navigator.bluetooth.requestDevice({
                filters: [{
                    services: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
                }],
                optionalServices: []
            });

            console.log('Connexion au contrôleur...');
            this.server = await this.device.gatt.connect();
            
            this.service = await this.server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');
            this.characteristic = await this.service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');
            
            // Activation des notifications
            await this.characteristic.startNotifications();
            this.characteristic.addEventListener('characteristicvaluechanged',
                this.handleButtonChange.bind(this));
            
            this.connected = true;
            console.log('Contrôleur connecté !');
            
            // Gestion de la déconnexion
            this.device.addEventListener('gattserverdisconnected', this.handleDisconnection.bind(this));
            
            return true;
        } catch (error) {
            console.error('Erreur de connexion:', error);
            return false;
        }
    }

    handleButtonChange(event) {
        const value = event.target.value;
        const data = new Uint8Array(value.buffer);
        
        // Mise à jour des états des boutons
        for (let i = 0; i < this.buttonStates.length; i++) {
            const byteIndex = Math.floor(i / 8);
            const bitIndex = i % 8;
            const newState = (data[byteIndex] & (1 << bitIndex)) !== 0;
            
            if (this.buttonStates[i] !== newState) {
                this.buttonStates[i] = newState;
                if (this.onButtonChangeCallback) {
                    this.onButtonChangeCallback(i, newState);
                }
            }
        }
    }

    handleDisconnection() {
        this.connected = false;
        console.log('Contrôleur déconnecté');
        // Réinitialisation des états
        this.buttonStates.fill(false);
        if (this.onButtonChangeCallback) {
            this.buttonStates.forEach((state, index) => {
                this.onButtonChangeCallback(index, false);
            });
        }
    }

    setButtonChangeCallback(callback) {
        this.onButtonChangeCallback = callback;
    }

    isConnected() {
        return this.connected;
    }

    getButtonState(buttonIndex) {
        if (buttonIndex >= 0 && buttonIndex < this.buttonStates.length) {
            return this.buttonStates[buttonIndex];
        }
        return false;
    }
}
