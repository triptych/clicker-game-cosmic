// storage.js - Handles localStorage operations
export const SAVE_KEY = 'cosmicClickerSave';
export const AUTO_SAVE_INTERVAL = 5; // seconds

export function saveGame(gameState) {
    try {
        const saveData = {
            energy: gameState.energy,
            clickCount: gameState.clickCount,
            clickPower: gameState.clickPower,
            energyPerSecond: gameState.energyPerSecond,
            playTime: gameState.playTime,
            lastSave: Date.now(),
            upgrades: {
                autoClicker: { level: gameState.upgrades.autoClicker.level },
                clickBoost: { level: gameState.upgrades.clickBoost.level },
                energyMultiplier: { level: gameState.upgrades.energyMultiplier.level },
                cosmicAmplifier: { level: gameState.upgrades.cosmicAmplifier.level }
            },
            achievements: gameState.achievements.map(a => ({
                id: a.id,
                unlocked: a.unlocked
            }))
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        console.log('Game saved successfully');
    } catch (e) {
        console.error('Failed to save game:', e);
    }
}

export function loadGame(gameState) {
    try {
        const savedData = localStorage.getItem(SAVE_KEY);
        if (savedData) {
            const data = JSON.parse(savedData);

            // Load basic stats
            gameState.energy = data.energy || 0;
            gameState.clickCount = data.clickCount || 0;
            gameState.clickPower = data.clickPower || 1;
            gameState.playTime = data.playTime || 0;

            // Load upgrades - only load the level, preserve base values
            if (data.upgrades) {
                Object.keys(data.upgrades).forEach(key => {
                    if (gameState.upgrades[key] && data.upgrades[key]) {
                        gameState.upgrades[key].level = data.upgrades[key].level || 0;
                    }
                });
            }

            // Load achievements - only update unlocked status
            if (data.achievements && Array.isArray(data.achievements)) {
                data.achievements.forEach(savedAch => {
                    const achievement = gameState.achievements.find(a => a.id === savedAch.id);
                    if (achievement && savedAch.unlocked !== undefined) {
                        achievement.unlocked = savedAch.unlocked;
                    }
                });
            }

            // Calculate offline progress if lastSave exists
            if (data.lastSave) {
                const offlineTime = (Date.now() - data.lastSave) / 1000;
                // Import getAutoProduction - we'll handle this in gameState
                return { loaded: true, offlineTime };
            }

            return { loaded: true, offlineTime: 0 };
        }
    } catch (e) {
        console.error('Failed to load game:', e);
    }
    return { loaded: false, offlineTime: 0 };
}

export function deleteSave() {
    localStorage.removeItem(SAVE_KEY);
}
