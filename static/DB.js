let hp = { gohan: 100, enemy: 100 };

const attacks = {
    punch: { damage: [5, 15], text: "👊 Coup de poing !" },
    kick: { damage: [10, 20], text: "🦵 Coup de pied !" },
    kamehameha: { damage: [20, 35], text: "🔥 Kamehameha !" }
};

function attack(target, attackType) {
    if (hp[target] <= 0) return;
    
    let attackData = attacks[attackType];
    let damage = getRandom(attackData.damage[0], attackData.damage[1]);
    hp[target] = Math.max(0, hp[target] - damage);
    
    updateHealthBar(target);
    showDamage(target, damage, attackData.text);

    if (hp[target] > 0) setTimeout(() => enemyAttack(), 1000);
}

function enemyAttack() {
    let attackTypes = Object.keys(attacks);
    let randomAttack = attackTypes[Math.floor(Math.random() * attackTypes.length)];
    attack("gohan", randomAttack);
}

function updateHealthBar(target) {
    let bar = document.getElementById(target + "-bar");
    bar.style.width = hp[target] + "%";
    
    bar.style.background = hp[target] < 30 
        ? "red" 
        : hp[target] < 60 
        ? "orange" 
        : "linear-gradient(90deg, green, lime)";
}

function showDamage(target, damage, attackText) {
    let barContainer = document.getElementById(target + "-bar").parentElement;
    let damageText = document.createElement("div");
    damageText.className = "damage";
    damageText.innerText = `${attackText}\n-${damage}`;
    barContainer.appendChild(damageText);
    
    setTimeout(() => damageText.classList.add("fade-out"), 50);
    setTimeout(() => barContainer.removeChild(damageText), 600);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
