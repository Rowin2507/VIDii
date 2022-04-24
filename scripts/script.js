// GAMEBOY --------------------------------
var gameBoy = document.querySelector('main > article:nth-of-type(1)');
var gameBoyStartButton = document.querySelector('main > article:nth-of-type(1) > section > section:nth-of-type(3) ul li:nth-of-type(3) button:last-of-type');
var gameBoyMenuButton = document.querySelector('main > article:nth-of-type(1) > section:nth-of-type(2) ol li:nth-of-type(1) button');
gameBoyStartButton.addEventListener('mouseup', gameBoyMenuOpen);
gameBoyMenuButton.addEventListener('mouseup', gameBoyMenuClose);

gameBoyStartButton.onmousedown = function() {
    this.classList.add('pressed');
}

function gameBoyMenuOpen() {
    this.classList.remove('pressed');
    gameBoy.classList.add('menu-active');
}

function gameBoyMenuClose() {
    gameBoy.classList.remove('menu-active');
}