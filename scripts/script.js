// GAMEBOY --------------------------------
var gameBoy = document.querySelector('main > article:nth-of-type(1)');
var gameBoyStartButton = document.querySelector('main > article:nth-of-type(1) > section:nth-of-type(1) > section:nth-of-type(3) > ul > li:nth-of-type(3) button:last-of-type');
var gameBoyMenuButton1 = document.querySelector('main > article:nth-of-type(1) > section:nth-of-type(2) ol li:nth-of-type(1) button');
var gameBoyMenuButton2 = document.querySelector('main > article:nth-of-type(1) > section:nth-of-type(2) ol li:nth-of-type(2) button');
// var gameBoyMenuButton3 = document.querySelector('main > article:nth-of-type(1) > section:nth-of-type(2) ol li:nth-of-type(3) button');
gameBoyStartButton.addEventListener('mouseup', gameBoyMenuOpen);
gameBoyMenuButton1.addEventListener('click', gameBoyMenuClose);

// OPEN GAMEBOY MENU
function gameBoyMenuOpen() {
    gameBoy.classList.add('menu-active');
}

// CLOSE GAMEBOY MENU
function gameBoyMenuClose() {
    gameBoy.classList.remove('menu-active');
    bootGameBoyAudio();
}

// PLAY AUDIO ON DEVICE BOOT
function bootGameBoyAudio() {
    var gameBoyBootAudio = new Audio('../sounds/gameboy-boot-audio.mp3');
    if (!gameBoy.classList.contains('menu-active')) {
        console.log("Booting...")

        setTimeout(function() {
            gameBoyBootAudio.play();
            console.log("Booted")
        }, 3000);
    }
}



// DS LITE --------------------------------
var DSLite = document.querySelector('main > article:nth-of-type(2)');
var DSLiteStartButton = document.querySelector('main > article:nth-of-type(2) > section:nth-of-type(1) > section:nth-of-type(3) > section:nth-of-type(3) > section:last-of-type ul li:first-of-type button');
var DSLiteMenuButton1 = document.querySelector('main > article:nth-of-type(2) > section:nth-of-type(2) ol li:nth-of-type(1) button');
var DSLiteMenuButton2 = document.querySelector('main > article:nth-of-type(2) > section:nth-of-type(2) ol li:nth-of-type(2) button');
// var DSLiteMenuButton3 = document.querySelector('main > article:nth-of-type(2) > section:nth-of-type(2) ol li:nth-of-type(3) button');
DSLiteStartButton.addEventListener('mouseup', DSLiteMenuOpen);
DSLiteMenuButton2.addEventListener('click', DSLiteMenuClose);

// OPEN DS LITE MENU
function DSLiteMenuOpen() {
    DSLite.classList.add('menu-active');
    DSLite.classList.remove('device-visible');
    
    // GET BATTERY LEVEL FROM CLIENT (IF SUPPORTED)
    if ('getBattery' in navigator){
        navigator.getBattery().then(function(battery) {
            var clientBatteryLevel = battery.level;
            var clientBatteryLevelExact = clientBatteryLevel * 100;
            console.log("Battery level: " + clientBatteryLevelExact);
        });
    } else {
        var clientBatteryLevelExact = 100;
        console.log("Battery not supported, default: " + clientBatteryLevelExact);
    }
    
    // GET EXACT TIME FROM CLIENT
    setInterval(function() {
        var clientDate = new Date();
        var clientHours = clientDate.getHours();
        var clientMinutes = clientDate.getMinutes();
        var clientSeconds = clientDate.getSeconds();
        // console.log(clientHours + ':' + clientMinutes + ':' + clientSeconds);
    }, 1000);
    
}

// CLOSE DS LITE MENU
function DSLiteMenuClose() {
    DSLite.classList.remove('menu-active');
    DSLite.classList.add('device-visible');

    // RESET ALL ANIMATIONS
    resetAnimations();
    // PLAY AUDIO ON DEVICE BOOT
    bootDSLiteAudio();
}

// PLAY AUDIO ON DEVICE BOOT
function bootDSLiteAudio() {
    var DSLiteBootAudio = new Audio('../sounds/ds-boot-audio.mp3');
    if (!DSLite.classList.contains('menu-active')) {
        console.log("Booting...")

        setTimeout(function() {
            DSLiteBootAudio.play();
            console.log("Booted")
        }, 1950);
    }
}



// SWITCH BETWEEN DEVICES --------------------------------
// SWITCH TO GAMEBOY
gameBoyMenuButton2.addEventListener('click', showDSLite);
function showDSLite() {
    DSLite.classList.remove('device-hidden');
    DSLite.classList.add('device-visible');
    gameBoy.classList.remove('menu-active');
    gameBoy.classList.add('device-hidden');
    
    resetAnimations();
    bootDSLiteAudio();
}

// SWITCH TO DS LITE
DSLiteMenuButton1.addEventListener('click', showGameBoy);
function showGameBoy() {
    gameBoy.classList.remove('device-hidden');
    gameBoy.classList.add('device-visible');
    DSLite.classList.remove('menu-active');
    DSLite.classList.add('device-hidden');

    resetAnimations();
    bootGameBoyAudio();
}

// SWITCH TO SWITCH
// ........
// bezig...
// ........




// GENERAL / OTHER FUNCTIONS --------------------------------
// RESET ALL ANIMATIONS
function resetAnimations() {
    document.getAnimations().forEach((anim) => {
        anim.cancel();
        anim.play();
    });
}

// CHARGE LED INDICATOR > BATTERY LEVEL FROM CLIENT (IF SUPPORTED)
if ('getBattery' in navigator){
    navigator.getBattery().then(battery => {
        function batteryStatus() {
            if (battery.charging == false) {
                gameBoy.classList.remove('device-charging');
                DSLite.classList.remove('device-charging');
                console.log("Not charging");
            } else if (battery.dischargingTime == "Infinity") {
                gameBoy.classList.add('device-charging');
                DSLite.classList.add('device-charging');
                console.log("Charging");
            } else {
                gameBoy.classList.remove('device-charging');
                DSLite.classList.remove('device-charging');
                console.log("Not charging");
            }
        }
        batteryStatus();

        // ON BATTERY CHARGING STATUS CHANGE RUN FUNCTION
        battery.onchargingchange = () => {
            batteryStatus();
        }
    });
}












// navigator.getBattery().then(function(battery) {
//     var clientBatteryLevel = battery.level;
//     var clientBatteryLevelExact = clientBatteryLevel * 100;
//     console.log("Battery level: " + clientBatteryLevelExact);
// });


// navigator.getBattery().then(battery => {
//     // ON BATTERY CHARGING STATUS CHANGE
//     battery.onchargingchange = () => {
//        console.log(battery.level);
//        console.log(battery.chargingTime);
//     }

//     // ON BATTERY LEVEL CHANGE
//     battery.onlevelchange = () => {
//         // document.querySelector('#level').textContent = battery.level;
    
//         if(battery.charging) {
//         console.log("Charging time: " + (battery.chargingTime / 60));
//         }
//         else {
//         console.log("Discharging time: " + (battery.dischargingTime / 60));
//         }
//     };
//  });





