# Changelog

All notable changes to the Cosmic Clicker project will be documented in this file.

## [2.0.0] - 2025-11-08

### Major Refactor
- **Code Organization**: Refactored entire codebase into modular ES6+ structure
  - Split monolithic HTML file into separate HTML, CSS, and JavaScript modules
  - Created `styles.css` for all styling
  - Created modular JavaScript files:
    - `js/storage.js` - Handles localStorage operations
    - `js/gameState.js` - Manages game state and calculations
    - `js/ui.js` - Handles all UI updates and interactions
    - `js/game.js` - Main game logic and loop

### Added
- **New Game Button**: Players can now restart their game with a confirmation dialog
- **About Dialog**: 
  - Added HTML `<dialog>` element with game information
  - Includes author information (Andrew Wooldridge)
  - Links to GitHub repository: https://github.com/triptych/clicker-game-cosmic
  - Lists game features
  - Modern dialog UI with backdrop blur effect
- **Header Controls**: Added button controls in the header for About and New Game

### Changed
- **Module System**: Converted to ES6 modules for better code organization and maintainability
- **Separation of Concerns**: Each module now has a single, well-defined responsibility
- **Improved Maintainability**: Code is now easier to update, test, and extend

### Technical Improvements
- Modern JavaScript practices (ES6+ modules, arrow functions, const/let)
- Better error handling in storage operations
- Improved code readability with clear function names and comments
- Responsive dialog design that works on mobile and desktop

## [1.0.0] - 2025-11-08

### Added
- **localStorage Support**: 
  - Automatic game saving every 5 seconds
  - Save on page unload
  - Load saved game on startup
  - Offline progress calculation
- **Core Gameplay**: Initial release with clicking mechanics
- **Upgrades System**: Four types of upgrades (Auto Clicker, Click Boost, Energy Multiplier, Cosmic Amplifier)
- **Achievements System**: Seven achievements to unlock
- **Visual Effects**: 
  - Animated starfield background
  - Particle effects on clicks
  - Glowing animations
  - Number popups showing energy gained
- **Statistics Tracking**: 
  - Energy counter
  - Click counter
  - Energy per second
  - Play time tracker
- **Responsive Design**: Works on desktop and mobile devices
