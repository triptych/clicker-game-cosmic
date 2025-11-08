# Cosmic Clicker Game 🌌

A beautiful, space-themed incremental clicker game where you collect cosmic energy from a mystical planet.

## Features

- **Immersive Cosmic Theme**: Beautiful starfield background with glowing effects
- **Click Mechanics**: Click the cosmic planet to generate energy
- **Upgrade System**: 4 different upgrade paths:
  - 🤖 Auto Clicker - Generates energy automatically
  - ⚡ Click Boost - Increases click power
  - ✨ Energy Multiplier - Multiplies all energy generation
  - 🌟 Cosmic Amplifier - Massive power boost
- **Achievement System**: 7 achievements to unlock
- **Real-time Stats**: Track your energy, clicks, and production rate
- **Particle Effects**: Visual feedback with every click
- **Responsive Design**: Works on desktop and mobile devices

## How to Play

1. **Open the Game**: Simply open `index.html` in your web browser
2. **Click the Planet**: Click the glowing cosmic planet to generate energy
3. **Purchase Upgrades**: Use your energy to buy upgrades that increase your power
4. **Unlock Achievements**: Complete challenges to unlock all achievements
5. **Watch Your Progress**: Track your stats and energy production over time

## Quick Start

### Option 1: Direct Browser (Simplest)
Just double-click on `index.html` to open in your default browser.

### Option 2: Local Server (Recommended)
For the best experience, run a local server:

```powershell
# If you have Python installed
python -m http.server 8000

# If you have Node.js installed
npx serve

# If you have PHP installed
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.

## File Structure

```
clicker-game-cosmic/
├── index.html              # Main game file
├── cosmic_clicker.html     # Duplicate game file
├── cosmic_planet.png       # Planet image asset
├── design.md              # Design documentation
├── interaction.md         # Interaction documentation
└── README.md              # This file
```

## Upgrades Guide

### Auto Clicker
- **Base Cost**: 10 energy
- **Effect**: Generates 0.5 energy per second per level
- **Strategy**: Great early game investment for passive income

### Click Boost
- **Base Cost**: 50 energy
- **Effect**: 2x multiplier to click power per level
- **Strategy**: Essential for active play style

### Energy Multiplier
- **Base Cost**: 200 energy
- **Effect**: 1.5x multiplier to all energy generation
- **Strategy**: Powerful mid-game upgrade that affects everything

### Cosmic Amplifier
- **Base Cost**: 1000 energy
- **Effect**: 3x multiplier to all energy generation
- **Strategy**: Late game power boost

## Achievements

- 🎯 **First Contact** - Click the planet for the first time
- 🎯 **Energy Collector** - Click 100 times
- 🎯 **Energy Master** - Collect 1,000 energy
- 🎯 **Cosmic Warrior** - Click 10,000 times
- 🎯 **Cosmic God** - Collect 1,000,000 energy
- 🎯 **Automation Expert** - Reach level 10 Auto Clicker
- 🎯 **Dedicated Player** - Play for 1 hour

## Technologies Used

- Pure HTML5
- CSS3 (Animations, Flexbox, Grid)
- Vanilla JavaScript (No frameworks!)
- Canvas-free particle system

## Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ⚠️ Internet Explorer (Not supported)

## Development

This game is built with pure HTML, CSS, and JavaScript - no build process required! To modify:

1. Edit `index.html` directly
2. Refresh your browser to see changes
3. All styles are embedded in the `<style>` tag
4. All scripts are embedded in the `<script>` tag

## Future Enhancements

Potential features for future versions:
- [ ] Save/Load game progress (localStorage)
- [ ] Prestige system with permanent bonuses
- [ ] More upgrade tiers
- [ ] Sound effects and music
- [ ] Additional achievements
- [ ] Special events and bonuses
- [ ] Multiple planets to unlock

## Credits

Created with ❤️ for cosmic energy enthusiasts

## License

Feel free to use and modify this game for your own projects!
