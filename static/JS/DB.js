// Variables des points de vie et du tour
let julienHP = 100;
let gokuHP = 100;
let currentTurn = 'julien';

const log = document.getElementById("log");
const punchBtn = document.getElementById("punch-btn");
const kickBtn = document.getElementById("kick-btn");
const fleeBtn = document.getElementById("flee-btn");

// Gestion des attaques
function attack(type) {
    if (currentTurn !== 'julien') {
        log.innerHTML = "Ce n'est pas votre tour !";
        return;
    }

    let damage = type === 'punch' ? getRandom(5, 15) : getRandom(10, 25);
    
    gokuHP = Math.max(gokuHP - damage, 0);
    updateHP('goku', gokuHP);

    log.innerHTML = `Vous attaquez Goku avec un ${type} et infligez ${damage} dégâts !`;

    if (gokuHP === 0) {
        log.innerHTML = "Goku est vaincu ! Vous avez gagné !";
        disableButtons();
        return;
    }

    currentTurn = 'goku';
    setTimeout(gokuTurn, 1000);
}

// Tour de Goku
function gokuTurn() {
    let attackType = Math.random() < 0.5 ? 'punch' : 'kick';
    let damage = attackType === 'punch' ? getRandom(5, 15) : getRandom(10, 25);

    julienHP = Math.max(julienHP - damage, 0);
    updateHP('julien', julienHP);

    log.innerHTML = `Goku attaque avec un ${attackType} et inflige ${damage} dégâts à Julien !`;

    if (julienHP === 0) {
        log.innerHTML = "Julien est vaincu ! Goku a gagné !";
        disableButtons();
        return;
    }

    currentTurn = 'julien';
}

// Fonction de fuite
function flee() {
    log.innerHTML = "Vous avez fui le combat.";
    disableButtons();
}

// Met à jour la barre de vie
function updateHP(character, hp) {
    document.getElementById(`${character}-hp`).innerText = `HP : ${hp}`;
    document.getElementById(`${character}-hp-bar`).style.width = `${hp}%`;
}

// Désactive les boutons après la fin du combat
function disableButtons() {
    punchBtn.disabled = true;
    kickBtn.disabled = true;
    fleeBtn.disabled = true;
}

// Génère un nombre aléatoire entre min et max
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Événements des boutons
punchBtn.onclick = () => attack('punch');
kickBtn.onclick = () => attack('kick');
fleeBtn.onclick = flee;
