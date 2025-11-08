// ui.js - Handles all UI updates and interactions
import { formatNumber, formatTime, getClickPower, getUpgradeCost } from './gameState.js';

export const elements = {
    energy: document.getElementById('energy'),
    clickCount: document.getElementById('clickCount'),
    energyPerSecond: document.getElementById('energyPerSecond'),
    playTime: document.getElementById('playTime'),
    clickPower: document.getElementById('clickPower'),
    planet: document.getElementById('planet'),
    particleContainer: document.getElementById('particleContainer'),
    upgradesList: document.getElementById('upgradesList'),
    achievementsGrid: document.getElementById('achievementsGrid'),
    aboutDialog: document.getElementById('aboutDialog'),
    aboutBtn: document.getElementById('aboutBtn'),
    newGameBtn: document.getElementById('newGameBtn'),
    closeDialogBtn: document.getElementById('closeDialogBtn')
};

export function createStarfield() {
    const starfield = document.getElementById('starfield');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        starfield.appendChild(star);
    }
}

export function updateDisplay(gameState) {
    elements.energy.textContent = formatNumber(gameState.energy);
    elements.clickCount.textContent = formatNumber(gameState.clickCount);
    elements.energyPerSecond.textContent = formatNumber(gameState.energyPerSecond);
    elements.playTime.textContent = formatTime(gameState.playTime);
    elements.clickPower.textContent = formatNumber(getClickPower(gameState));
}

export function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    elements.particleContainer.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 2000);
}

export function createNumberPopup(x, y, number) {
    const popup = document.createElement('div');
    popup.className = 'number-popup';
    popup.textContent = '+' + formatNumber(number);
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    elements.particleContainer.appendChild(popup);

    setTimeout(() => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
    }, 1500);
}

export function createUpgrades(purchaseCallback) {
    const upgrades = [
        {
            id: 'autoClicker',
            name: 'Auto Clicker',
            description: 'Generates energy automatically',
            icon: '🤖'
        },
        {
            id: 'clickBoost',
            name: 'Click Boost',
            description: 'Increases click power',
            icon: '⚡'
        },
        {
            id: 'energyMultiplier',
            name: 'Energy Multiplier',
            description: 'Multiplies all energy generation',
            icon: '✨'
        },
        {
            id: 'cosmicAmplifier',
            name: 'Cosmic Amplifier',
            description: 'Massive power boost',
            icon: '🌟'
        }
    ];

    upgrades.forEach(upgrade => {
        const element = document.createElement('div');
        element.className = 'upgrade-item';
        element.id = `upgrade-${upgrade.id}`;
        element.innerHTML = `
            <div class="upgrade-count" id="count-${upgrade.id}">0</div>
            <div class="upgrade-name">${upgrade.icon} ${upgrade.name}</div>
            <div class="upgrade-description">${upgrade.description}</div>
            <div class="upgrade-cost" id="cost-${upgrade.id}">Cost: 10</div>
        `;

        element.addEventListener('click', () => purchaseCallback(upgrade.id));
        elements.upgradesList.appendChild(element);
    });
}

export function updateUpgrades(gameState) {
    Object.keys(gameState.upgrades).forEach(upgradeId => {
        const upgrade = gameState.upgrades[upgradeId];
        const cost = getUpgradeCost(upgrade);
        const element = document.getElementById(`upgrade-${upgradeId}`);
        const costElement = document.getElementById(`cost-${upgradeId}`);
        const countElement = document.getElementById(`count-${upgradeId}`);

        if (element && costElement && countElement) {
            countElement.textContent = upgrade.level;
            costElement.textContent = `Cost: ${formatNumber(cost)}`;
            element.disabled = gameState.energy < cost;
        }
    });
}

export function createAchievements(gameState) {
    gameState.achievements.forEach(achievement => {
        const element = document.createElement('div');
        element.className = 'achievement';
        element.id = `achievement-${achievement.id}`;
        element.innerHTML = `
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
        `;
        elements.achievementsGrid.appendChild(element);
    });
}

export function updateAchievements(gameState) {
    gameState.achievements.forEach(achievement => {
        const element = document.getElementById(`achievement-${achievement.id}`);
        if (element && achievement.unlocked) {
            element.classList.add('unlocked');
        }
    });
}

export function setupDialogs() {
    // About button handler
    elements.aboutBtn.addEventListener('click', () => {
        elements.aboutDialog.showModal();
    });

    // Close dialog button handler
    elements.closeDialogBtn.addEventListener('click', () => {
        elements.aboutDialog.close();
    });

    // Click outside to close
    elements.aboutDialog.addEventListener('click', (e) => {
        const rect = elements.aboutDialog.getBoundingClientRect();
        if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
        ) {
            elements.aboutDialog.close();
        }
    });
}
