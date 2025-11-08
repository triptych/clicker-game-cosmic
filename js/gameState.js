// gameState.js - Manages game state and calculations

export function createDefaultGameState() {
    return {
        energy: 0,
        clickCount: 0,
        clickPower: 1,
        energyPerSecond: 0,
        playTime: 0,
        lastUpdate: Date.now(),
        upgrades: {
            autoClicker: { level: 0, baseCost: 10, baseProduction: 0.5 },
            clickBoost: { level: 0, baseCost: 50, multiplier: 2 },
            energyMultiplier: { level: 0, baseCost: 200, multiplier: 1.5 },
            cosmicAmplifier: { level: 0, baseCost: 1000, multiplier: 3 }
        },
        achievements: [
            {
                id: 'first_click',
                name: 'First Contact',
                description: 'Click the planet for the first time',
                unlocked: false
            },
            {
                id: 'hundred_clicks',
                name: 'Energy Collector',
                description: 'Click 100 times',
                unlocked: false
            },
            {
                id: 'thousand_energy',
                name: 'Energy Master',
                description: 'Collect 1,000 energy',
                unlocked: false
            },
            {
                id: 'ten_k_clicks',
                name: 'Cosmic Warrior',
                description: 'Click 10,000 times',
                unlocked: false
            },
            {
                id: 'million_energy',
                name: 'Cosmic God',
                description: 'Collect 1,000,000 energy',
                unlocked: false
            },
            {
                id: 'auto_clicker_10',
                name: 'Automation Expert',
                description: 'Reach level 10 Auto Clicker',
                unlocked: false
            },
            {
                id: 'hour_played',
                name: 'Dedicated Player',
                description: 'Play for 1 hour',
                unlocked: false
            }
        ]
    };
}

export function getClickPower(gameState) {
    let power = gameState.clickPower;
    if (gameState.upgrades.clickBoost.level > 0) {
        power *= Math.pow(gameState.upgrades.clickBoost.multiplier, gameState.upgrades.clickBoost.level);
    }
    if (gameState.upgrades.energyMultiplier.level > 0) {
        power *= Math.pow(gameState.upgrades.energyMultiplier.multiplier, gameState.upgrades.energyMultiplier.level);
    }
    if (gameState.upgrades.cosmicAmplifier.level > 0) {
        power *= Math.pow(gameState.upgrades.cosmicAmplifier.multiplier, gameState.upgrades.cosmicAmplifier.level);
    }
    return power;
}

export function getUpgradeCost(upgrade) {
    return Math.floor(upgrade.baseCost * Math.pow(1.5, upgrade.level));
}

export function getAutoProduction(gameState) {
    let production = 0;
    if (gameState.upgrades.autoClicker.level > 0) {
        production = gameState.upgrades.autoClicker.baseProduction * gameState.upgrades.autoClicker.level;
        if (gameState.upgrades.energyMultiplier.level > 0) {
            production *= Math.pow(gameState.upgrades.energyMultiplier.multiplier, gameState.upgrades.energyMultiplier.level);
        }
        if (gameState.upgrades.cosmicAmplifier.level > 0) {
            production *= Math.pow(gameState.upgrades.cosmicAmplifier.multiplier, gameState.upgrades.cosmicAmplifier.level);
        }
    }
    return production;
}

export function checkAchievements(gameState) {
    const conditions = {
        'first_click': () => gameState.clickCount >= 1,
        'hundred_clicks': () => gameState.clickCount >= 100,
        'thousand_energy': () => gameState.energy >= 1000,
        'ten_k_clicks': () => gameState.clickCount >= 10000,
        'million_energy': () => gameState.energy >= 1000000,
        'auto_clicker_10': () => gameState.upgrades.autoClicker.level >= 10,
        'hour_played': () => gameState.playTime >= 3600
    };

    const newlyUnlocked = [];
    gameState.achievements.forEach(achievement => {
        if (!achievement.unlocked && conditions[achievement.id] && conditions[achievement.id]()) {
            achievement.unlocked = true;
            newlyUnlocked.push(achievement);
        }
    });

    return newlyUnlocked;
}

export function purchaseUpgrade(gameState, upgradeId) {
    const upgrade = gameState.upgrades[upgradeId];
    if (!upgrade) return false;

    const cost = getUpgradeCost(upgrade);
    if (gameState.energy >= cost) {
        gameState.energy -= cost;
        upgrade.level++;
        gameState.energyPerSecond = getAutoProduction(gameState);
        return true;
    }
    return false;
}

export function formatNumber(num) {
    if (num < 1000) return Math.floor(num).toString();
    if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
    return (num / 1000000000).toFixed(1) + 'B';
}

export function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
