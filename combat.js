// @ts-nocheck
import {
  state,
  elements,
  monsters,
  weapons,
  armors,
  saveGame,
  monsterImages,
  updateImage,
  updateUI,
} from "./gameState.js";
import { updateLocationsList, update, locations } from "./locations.js";
import { showMessage } from "./utils.js";

export function attack() {
  const monsterDamage = calculateMonsterDamage();
  const playerDamage = calculatePlayerDamage();

  updateCombatState(monsterDamage, playerDamage);

  if (state.health <= 0) {
    lose();
    return;
  }

  if (state.monsterHealth <= 0) {
    if (state.fighting === 14) {
      winGame();
    } else {
      defeatMonster();
    }
    return;
  }

  updateCombatUI(playerDamage, monsterDamage);
  saveGame();
}

function calculateMonsterDamage() {
  return Math.max(
    0,
    getMonsterAttackValue(monsters[state.fighting].level) -
      armors[state.armor].defense
  );
}

function calculatePlayerDamage() {
  const criticalHit = Math.random() < 0.1;
  let damage =
    weapons[state.currentWeapon].power +
    Math.floor(Math.random() * state.xp) +
    1;

  if (criticalHit) {
    damage *= 2;
    elements.text.innerText += "\nCRITICAL HIT! ";
  }

  return damage;
}

function updateCombatState(monsterDamage, playerDamage) {
  state.health -= monsterDamage;

  if (isMonsterHit()) {
    state.monsterHealth = Math.max(0, state.monsterHealth - playerDamage);
  }
}

function updateCombatUI(playerDamage, monsterDamage) {
  let message = "";
  if (isMonsterHit()) {
    message = `You hit the ${
      monsters[state.fighting].name
    } for ${playerDamage} damage.\nThe monster deals ${monsterDamage} damage.`;
  } else {
    message = `You miss!\nThe monster deals ${monsterDamage} damage.`;
  }

  showMessage(elements.text, message);
  elements.healthText.innerText = state.health;
  elements.monsterHealthText.innerText = state.monsterHealth;
}

export function dodge() {
  showMessage(
    elements.text,
    "You dodge the attack from the " + monsters[state.fighting].name
  );
}

export function getMonsterAttackValue(level) {
  const hit = level * 3 - Math.floor(Math.random() * state.xp);
  return hit > 0 ? hit : 0;
}

export function isMonsterHit() {
  return Math.random() > 0.2 || state.health < 20;
}

export function defeatMonster() {
  const monster = monsters[state.fighting];
  const goldGained = Math.floor(monster.level * 6.7);
  const xpGained = Math.floor(monster.level / 2);
  state.gold += goldGained;
  state.xp += xpGained;

  state.fighting = null;
  state.monsterHealth = 0;

  elements.goldText.innerText = state.gold;
  elements.xpText.innerText = state.xp;
  showMessage(
    elements.text,
    `You defeated the ${monster.name}!\nYou earned ${goldGained} gold and ${xpGained} XP.`
  );

  elements.monsterStats.style.display = "none";

  updateLocationsList();
  update(locations[4]);
  saveGame();
}

export function goFight() {
  update(locations[3]);
  state.monsterHealth = monsters[state.fighting].health;
  setupMonsterStats();
  updateMonsterImage();
}

function setupMonsterStats() {
  elements.monsterStats.style.display = "block";
  elements.monsterName.innerText = monsters[state.fighting].name;
  elements.monsterHealthText.innerText = state.monsterHealth;
}

function updateMonsterImage() {
  const currentMonster = monsters[state.fighting].name;
  if (monsterImages[currentMonster]) {
    updateImage(monsterImages[currentMonster], `Fighting ${currentMonster}`);
  }
}

export function lose() {
  update(locations[5]);
  updateUI();
  updateLocationsList();
}

export function winGame() {
  update(locations[6]);
}
