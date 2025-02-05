// src/RomiBox.js
import React, { useState } from 'react';
import './RomiStyle.css';
import romiImage from './images/romi.png';

const RomiBox = () => {
  const [projectionWindow, setProjectionWindow] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('farm');
  const [activatedButtons, setActivatedButtons] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null);

  const openProjectionWindow = () => {
    const projWin = window.open('', 'ROMI Projection', 'width=800,height=600');
    projWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ROMI Projection</title>
          <style>
            body { 
              margin: 0; 
              background: black;
              overflow: hidden;
            }
            video {
              width: 100vw;
              height: 100vh;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <video id="projectionVideo" autoplay></video>
        </body>
      </html>
    `);
    setProjectionWindow(projWin);
  };

  const playVideo = (videoUrl) => {
    setCurrentVideo(videoUrl);
    
    const mainVideo = document.getElementById('mainVideo');
    if (mainVideo) {
      mainVideo.src = videoUrl;
      mainVideo.play();
    }
    
    if (projectionWindow && !projectionWindow.closed) {
      const projVideo = projectionWindow.document.getElementById('projectionVideo');
      if (projVideo) {
        projVideo.src = videoUrl;
        projVideo.play();
      }
    }
  };

  return (
    <div className="romi-container">
      <header className="romi-header">
        <div className="romi-header-left">
          <img src={romiImage} alt="ROMI" className="romi-character" />
          <h1 className="romi-welcome">Bienvenue dans la Romi Box</h1>
        </div>
        <div className="romi-controls">
          <button 
            className="romi-button projection"
            onClick={projectionWindow ? null : openProjectionWindow}>
            {projectionWindow ? 'Projection Active' : 'Ouvrir Projection'}
          </button>
        </div>
      </header>

      <main className="romi-main">
        <div className="romi-themes-panel">
          <h2 className="romi-title">Les Thèmes de ROMI</h2>
          <button className="romi-theme-button farm-theme">Animaux de la Ferme</button>
          <button className="romi-theme-button savanna-theme">Animaux de la Savane</button>
          <button className="romi-theme-button forest-theme">Animaux de la Forêt</button>
        </div>

        <div className="romi-control-area">
          <div className="romi-game-controls">
            <h2 className="romi-title">Contrôles du Jeu</h2>
            <div className="romi-buttons-grid">
              <button className="romi-button announce">ROMI annonce !</button>
              <button className="romi-button new-game">Nouvelle Partie</button>
              <button className="romi-button help">Aide</button>
            </div>
            <div className="romi-progress">
              <span className="progress-text">Boutons activés : {activatedButtons}/15</span>
            </div>
          </div>

          <div className="romi-preview">
            <h2 className="romi-title">Aperçu</h2>
            <div className="video-container">
              <video id="mainVideo" className="preview-video" controls />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RomiBox;