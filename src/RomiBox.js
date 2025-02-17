// RomiBox.js - Part 1
import React, { useState, useEffect, useRef } from 'react';
import './RomiStyle.css';
import romiImage from './images/romi.png';
import BluetoothManager from './BluetoothManager';
import {
  buttonColors,
  videoThemes,
  encouragementVideo,
  victoryVideo,
  introductionVideo,
  musicVideo,
  shuffleArray,
  BUTTON_POSITIONS
} from './RomiBoxConstants';

// Mappage des pins physiques aux slots virtuels
const PIN_TO_SLOT_MAPPING = {
  1: 0,   // Rouge - BV1
  2: 1,   // Bleu1 - BV2
  3: 2,   // Jaune1 - BV3
  4: 3,   // Vert1 - BV4
  5: 4,   // Blanc1 - BV5
  6: 5,   // Bleu2 - BV6
  7: 6,   // Jaune2 - BV7
  8: 7,   // Vert2 - BV8
  9: 8,   // Blanc2 - BV9
  10: 9,  // Noir1 - BV10
  11: 10, // Noir2 - BV11
  12: 11, // Noir3 - BV12
  13: 12, // Noir4 - BV13
  14: 13, // Noir5 - BV14
  15: 14  // Noir6 - BV15
};

const RomiBox = () => {
  // Fonction de génération du layout
  const generateButtonLayout = (theme) => {
    const videos = [...videoThemes[theme]];
    const shuffledVideos = shuffleArray(videos);
    const layout = new Array(15).fill(null);
    
    shuffledVideos.forEach((video, index) => {
      if (index < layout.length) {
        layout[index] = video;
      }
    });

    return layout;
  };

  // États de base
  const [currentTheme, setCurrentTheme] = useState('farm');
  const [currentVideo, setCurrentVideo] = useState('');
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [foundVideos, setFoundVideos] = useState([]);
  const [currentSelectionVideo, setCurrentSelectionVideo] = useState(null);
  
  // Références pour les vidéos
  const videoRef = useRef(null);
  const projectionWindowRef = useRef(null);
  const projectionVideoRef = useRef(null);

  // États de la disposition et du Bluetooth
  const [buttonLayout, setButtonLayout] = useState(() => generateButtonLayout('farm'));
  const [randomKey, setRandomKey] = useState(0);
  const [bluetoothManager] = useState(() => BluetoothManager.getInstance());
  const [bluetoothConnectionState, setBluetoothConnectionState] = useState({
    status: 'disconnected',
    errorMessage: ''
  });
  const [physicalButtonStates, setPhysicalButtonStates] = useState(
    Object.keys(PIN_TO_SLOT_MAPPING).reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );
  const [lastButtonPress, setLastButtonPress] = useState(null);

  // Utilitaires
  const getFontSize = (length) => {
    if (length <= 4) return '16px';
    if (length <= 6) return '14px';
    if (length <= 8) return '12px';
    if (length <= 10) return '11px';
    return '10px';
  };

  // Gestion améliorée de la fenêtre de projection
  const openProjectionWindow = () => {
    const newWindow = window.open('', 'Projection', 'width=800,height=600');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Projection Romi Box</title>
            <style>
              body { 
                margin: 0; 
                padding: 0;
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                background: black; 
                overflow: hidden;
              }
              #projectionVideo { 
                width: 100vw;
                height: 100vh;
                object-fit: contain;
              }
            </style>
          </head>
          <body>
            <video id="projectionVideo" autoplay playsinline></video>
          </body>
        </html>
      `);
      newWindow.document.close();
      
      // Stockage des références
      projectionWindowRef.current = newWindow;
      projectionVideoRef.current = newWindow.document.getElementById('projectionVideo');
      
      // Gestionnaire de fermeture de la fenêtre
      newWindow.onbeforeunload = () => {
        setPresentationMode(false);
        projectionWindowRef.current = null;
        projectionVideoRef.current = null;
      };
    }
  };

  // Gestionnaire du mode présentation amélioré
  const handlePresentationModeToggle = () => {
    if (presentationMode) {
      if (projectionWindowRef.current && !projectionWindowRef.current.closed) {
        projectionWindowRef.current.close();
      }
      projectionWindowRef.current = null;
      projectionVideoRef.current = null;
      setPresentationMode(false);
    } else {
      openProjectionWindow();
      setPresentationMode(true);
    }
  };

  // Fonction de lecture vidéo améliorée
  const playVideo = async (video) => {
    if (!video || !video.url) {
      console.error("URL de vidéo invalide");
      return;
    }

    try {
      setIsVideoLoading(true);
      const response = await fetch(video.url);
      if (!response.ok) throw new Error(`Fichier vidéo non trouvé: ${video.url}`);

      setCurrentVideo(video.url);

      // Mise à jour de la vidéo principale
      if (videoRef.current) {
        videoRef.current.src = video.url;
        await videoRef.current.load();
        try {
          await videoRef.current.play();
        } catch (e) {
          console.warn("Lecture automatique impossible sur le lecteur principal:", e);
        }
      }

      // Mise à jour de la vidéo de projection
      if (projectionWindowRef.current && !projectionWindowRef.current.closed && projectionVideoRef.current) {
        projectionVideoRef.current.src = video.url;
        await projectionVideoRef.current.load();
        try {
          await projectionVideoRef.current.play();
        } catch (e) {
          console.warn("Lecture automatique impossible sur la projection:", e);
        }
      }

      setIsVideoLoading(false);
    } catch (error) {
      console.error("Erreur de lecture vidéo:", error);
      setIsVideoLoading(false);
      alert(`Impossible de lire la vidéo ${video?.name || 'sélectionnée'}. Veuillez vérifier les fichiers.`);
    }
  };
  // RomiBox.js - Part 2

  // Gestion Bluetooth
  const connectBluetooth = async () => {
    try {
      await bluetoothManager.connect();
      setBluetoothConnectionState({
        status: 'connected',
        errorMessage: ''
      });
    } catch (error) {
      console.error('Échec de la connexion Bluetooth:', error);
      setBluetoothConnectionState({
        status: 'error',
        errorMessage: 'Impossible de connecter la Romi Box'
      });
      alert('Impossible de connecter la Romi Box. Veuillez réessayer.');
    }
  };

  const disconnectBluetooth = () => {
    bluetoothManager.disconnect();
    setBluetoothConnectionState({
      status: 'disconnected',
      errorMessage: ''
    });
  };

  // Gestionnaire de changement de thème
  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    if (isGameActive) {
      setIsGameActive(false);
      setFoundVideos([]);
      setErrorCount(0);
    }
    const newLayout = generateButtonLayout(theme);
    setButtonLayout(newLayout);
    setRandomKey(prev => prev + 1);
  };

  // Gestionnaire de randomisation
  const handleRandomizeLayout = () => {
    if (isGameActive) return;
    const newLayout = generateButtonLayout(currentTheme);
    setButtonLayout(newLayout);
    setRandomKey(prev => prev + 1);
    console.log('Nouveau layout:', newLayout.map((video, index) => 
      `PIN${index + 1}: ${video?.name || 'vide'}`
    ));
  };

  // Gestion du jeu
  const handleGameStart = () => {
    if (isGameActive) return;
    
    setIsGameActive(true);
    setFoundVideos([]);
    setErrorCount(0);

    const availableVideos = buttonLayout.filter(v => v && v.name);
    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    const firstVideo = availableVideos[randomIndex];
    setCurrentSelectionVideo(firstVideo);
    playVideo(firstVideo);
  };

  const handleGameButtonPress = (video) => {
    if (!video || foundVideos.includes(video.name)) return;

    if (!currentSelectionVideo) {
      playVideo({ url: encouragementVideo });
      return;
    }

    if (video.name === currentSelectionVideo.name) {
      const newFoundVideos = [...foundVideos, video.name];
      setFoundVideos(newFoundVideos);

      if (newFoundVideos.length === videoThemes[currentTheme].filter(v => v.name).length) {
        setTimeout(() => {
          playVideo({ url: victoryVideo });
          setIsGameActive(false);
          setFoundVideos([]);
        }, 1000);
      } else {
        setTimeout(() => {
          const availableVideos = buttonLayout.filter(v =>
            v && v.name && !newFoundVideos.includes(v.name)
          );
          const nextVideo = availableVideos[Math.floor(Math.random() * availableVideos.length)];
          setCurrentSelectionVideo(nextVideo);
          playVideo(nextVideo);
        }, 1000);
      }
    } else {
      setErrorCount(prev => prev + 1);
      playVideo({ url: encouragementVideo });
    }
  };

  // Gestion des boutons physiques
  const handlePhysicalButtonPress = (buttonIndex) => {
    const now = Date.now();
    if (lastButtonPress && now - lastButtonPress < 200) return;
    setLastButtonPress(now);

    const slotIndex = PIN_TO_SLOT_MAPPING[buttonIndex + 1];
    if (slotIndex !== undefined) {
      const video = buttonLayout[slotIndex];
      if (video && video.url) {
        console.log(`Bouton physique ${buttonIndex + 1} pressé, déclenchement slot ${slotIndex + 1}: ${video.name}`);
        
        if (isGameActive) {
          handleGameButtonPress(video);
        } else {
          playVideo(video);
        }
      }
    }
  };

  // Effets
  useEffect(() => {
    return () => {
      // Nettoyage à la destruction du composant
      if (projectionWindowRef.current && !projectionWindowRef.current.closed) {
        projectionWindowRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (bluetoothManager) {
      bluetoothManager.setButtonStateChangeCallback((buttonStates) => {
        buttonStates.forEach((isPressed, index) => {
          if (isPressed) {
            handlePhysicalButtonPress(index);
          }
        });
      });

      bluetoothManager.setConnectionChangeCallback((connected) => {
        setBluetoothConnectionState({
          status: connected ? 'connected' : 'disconnected',
          errorMessage: ''
        });
      });
    }

    return () => {
      if (bluetoothManager) {
        bluetoothManager.setButtonStateChangeCallback(null);
        bluetoothManager.setConnectionChangeCallback(null);
      }
    };
  }, [buttonLayout, isGameActive, currentSelectionVideo, foundVideos]);

  // Rendu des boutons
  const renderButton = (index) => {
    const video = buttonLayout[index];
    const physicalButtonIndex = Object.entries(PIN_TO_SLOT_MAPPING)
      .find(([_, slot]) => slot === index)?.[0];
    const isPhysicalButtonPressed = physicalButtonStates[physicalButtonIndex];

    return (
      <button
        key={`button-${index}-${randomKey}-${video?.name || 'empty'}`}
        className={`romi-button-round ${!video?.name ? 'empty-slot' : ''}
                   ${foundVideos.includes(video?.name) ? 'found' : ''}
                   ${isPhysicalButtonPressed ? 'pressed' : ''}`}
        onClick={() => video && playVideo(video)}
        style={{
          backgroundColor: buttonColors[index],
          fontSize: getFontSize(video?.name?.length || 0)
        }}
        disabled={!video?.name || foundVideos.includes(video?.name)}
        title={`PIN${index + 1}: ${video?.name || 'Vide'}`}
      >
        <span>{video?.name || `${index + 1}`}</span>
      </button>
    );
  };

  // Rendu principal
  return (
    <div className="romi-container">
      <header className="romi-header">
        <div className="romi-header-left">
          <img src={romiImage} alt="ROMI" className="romi-character" />
          <h1 className="romi-welcome">Bienvenue dans la Romi Box</h1>
        </div>
      </header>

      <main className="romi-main">
        <div className="romi-themes-panel">
          <div className="theme-container">
            <div className="action-buttons-circle">
              <button
                className="circle-button romi-intro"
                onClick={() => playVideo({ url: introductionVideo })}
                title="Introduction de ROMI"
              >
                <img
                  src={romiImage}
                  alt="ROMI"
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                />
              </button>

              <button
                className={`circle-button bluetooth ${bluetoothConnectionState.status === 'connected' ? 'connected' : ''}`}
                onClick={bluetoothConnectionState.status === 'connected' ? disconnectBluetooth : connectBluetooth}
                title={bluetoothConnectionState.status === 'connected' ? 'Déconnecter la Romi Box' : 'Connecter la Romi Box'}
              >
                {bluetoothConnectionState.status === 'connected' ? '📱' : '📵'}
              </button>

              <button
                className="circle-button random"
                onClick={handleRandomizeLayout}
                disabled={isGameActive}
                title="Réorganiser aléatoirement"
              >
                🔀
              </button>

              <button
                className={`circle-button game ${isGameActive ? 'active' : ''}`}
                onClick={handleGameStart}
                disabled={isGameActive}
                title={isGameActive ? 'Jeu en cours...' : 'Lancer le jeu'}
              >
                🎮
              </button>

              <button
                className={`circle-button presentation ${presentationMode ? 'active' : ''}`}
                onClick={handlePresentationModeToggle}
                title="Mode Projection"
              >
                🎯
              </button>

              <button
                className="circle-button music"
                onClick={() => playVideo({ url: musicVideo })}
                title="Écouter la musique"
              >
                🎵
              </button>
            </div>

            <div className="theme-buttons">
              {Object.keys(videoThemes).map(theme => (
                <button
                  key={theme}
                  className={`romi-theme-button ${currentTheme === theme ? 'active' : ''}`}
                  onClick={() => handleThemeChange(theme)}
                  disabled={isGameActive}
                >
                  {`Animaux ${theme === 'farm' ? 'de la Ferme' :
                    theme === 'savanna' ? 'de la Savane' :
                    theme === 'forest' ? 'de la Forêt' :
                    theme === 'mountain' ? 'de la Montagne' :
                    theme === 'sea' ? 'de la Mer' :
                    theme === 'desert' ? 'du Désert' :
                    theme === 'jungle' ? 'de la Jungle' :
                    theme === 'tundra' ? 'de la Toundra' :
                    'de la Côte Rocheuse'}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="romi-content-wrapper">
          <div className="romi-buttons-grid-custom">
            {Array.from({ length: 15 }).map((_, index) => renderButton(index))}
          </div>

          <div className="romi-preview">
            <div className="video-container">
              <video
                ref={videoRef}
                controls
                className="preview-video"
              >
                {currentVideo && <source src={currentVideo} type="video/mp4" />}
              </video>
              {isVideoLoading && <div className="loading">Chargement...</div>}
            </div>

            {isGameActive && (
              <div className="error-counter-frame">
                <div className="error-counter-content">
                  <h3>Statistiques de la partie</h3>
                  <p>Nombre d'erreurs : <span className="error-count">{errorCount}</span></p>
                  {!isGameActive && errorCount > 0 && (
                    <p className="error-message">
                      {errorCount === 1 ? "Une seule erreur ! Excellent !" :
                       errorCount <= 3 ? "Bien joué !" :
                       errorCount <= 5 ? "Continue tes efforts !" :
                       "Ne te décourage pas, tu vas y arriver !"}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RomiBox;