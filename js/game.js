// game.js - Main game logic and loop
import { createDefaultGameState, getClickPower, getAutoProduction, checkAchievements, purchaseUpgrade } from './gameState.js';
import { saveGame, loadGame, deleteSave, AUTO_SAVE_INTERVAL } from './storage.js';
import { elements, createStarfield, updateDisplay, createParticle, createNumberPopup, createUpgrades, updateUpgrades, createAchievements, updateAchievements, setupDialogs } from './ui.js';

let gameState = createDefaultGameState();
let autoSaveTimer = 0;

function handlePlanetClick(e) {
    const rect = elements.planet.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gameState.clickCount++;
    const clickValue = getClickPower(gameState);
    gameState.energy += clickValue;

    // Create effects
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createParticle(
                x + (Math.random() - 0.5) * 50,
                y + (Math.random() - 0.5) * 50
            );
        }, i * 50);
    }

    createNumberPopup(x, y - 30, clickValue);
    updateDisplay(gameState);
    checkAchievements(gameState);
    updateUpgrades(gameState);
    saveGame(gameState);
}

function handleUpgradePurchase(upgradeId) {
    if (purchaseUpgrade(gameState, upgradeId)) {
        updateDisplay(gameState);
        updateUpgrades(gameState);
        checkAchievements(gameState);
        saveGame(gameState);
    }
}

function handleNewGame() {
    if (confirm('Are you sure you want to start a new game? All progress will be lost!')) {
        deleteSave();
        location.reload();
    }
}

function gameLoop() {
    const now = Date.now();
    const deltaTime = (now - gameState.lastUpdate) / 1000;
    gameState.lastUpdate = now;

    // Update play time
    gameState.playTime += deltaTime;

    // Auto generate energy
    if (gameState.energyPerSecond > 0) {
        gameState.energy += gameState.energyPerSecond * deltaTime;
    }

    // Auto-save
    autoSaveTimer += deltaTime;
    if (autoSaveTimer >= AUTO_SAVE_INTERVAL) {
        saveGame(gameState);
        autoSaveTimer = 0;
    }

    updateDisplay(gameState);
    const newAchievements = checkAchievements(gameState);
    if (newAchievements.length > 0) {
        updateAchievements(gameState);
    }
    updateUpgrades(gameState);

    requestAnimationFrame(gameLoop);
}

function init() {
    // Create visual effects
    createStarfield();

    // Load saved game
    const loadResult = loadGame(gameState);
    if (loadResult.loaded && loadResult.offlineTime > 0) {
        // Calculate offline progress
        const offlineProduction = getAutoProduction(gameState);
        if (offlineProduction > 0) {
            const offlineEnergy = offlineProduction * loadResult.offlineTime;
            gameState.energy += offlineEnergy;
            console.log(`Welcome back! You earned ${offlineEnergy.toFixed(0)} energy while away.`);
        }
    }

    // Recalculate energy per second
    gameState.energyPerSecond = getAutoProduction(gameState);
    gameState.lastUpdate = Date.now();

    // Setup UI
    createUpgrades(handleUpgradePurchase);
    createAchievements(gameState);
    updateDisplay(gameState);
    updateUpgrades(gameState);
    updateAchievements(gameState);
    setupDialogs();

    // Setup event listeners
    elements.planet.addEventListener('click', handlePlanetClick);
    elements.newGameBtn.addEventListener('click', handleNewGame);

    // Save before leaving
    window.addEventListener('beforeunload', () => {
        saveGame(gameState);
    });

    // Start game loop
    gameLoop();
}

// Start the game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
