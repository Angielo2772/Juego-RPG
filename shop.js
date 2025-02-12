// @ts-nocheck
import { state, elements, weapons, armors, updateUI } from "./gameState.js";
import { goStore } from "./locations.js";

export function getWeaponPrice(weaponIndex) {
  const basePrice = 30;
  return Math.floor(basePrice * Math.pow(1.5, weaponIndex));
}

export function buyHealth() {
  const healingOptions = getHealingOptions();
  displayHealingOptions(healingOptions);
  setupHealingButtons(healingOptions);
}

export function buyWeapon() {
  elements.button4.style.display = "inline-block";
  elements.button5.style.display = "inline-block";

  if (state.currentWeapon < weapons.length - 1) {
    displayWeaponShop();
  } else {
    displayMaxWeaponMessage();
  }
}

export function buyArmor() {
  if (state.armor < armors.length - 1) {
    displayArmorShop();
  } else {
    displayMaxArmorMessage();
  }
}

function getHealingOptions() {
  return [
    { amount: 10, price: 10 },
    { amount: 30, price: 25 },
    { amount: 50, price: 40 },
    { amount: 100, price: 75 },
  ];
}

function displayHealingOptions(options) {
  elements.text.innerText = `Your current health is: ${state.health}\nSelect healing amount:\n`;
  options.forEach((option, index) => {
    elements[
      `button${index + 1}`
    ].innerText = `Buy ${option.amount} HP (${option.price} gold)`;
  });
  elements.button5.innerText = "Go back";
}

export function processHealing(option) {
  if (state.gold >= option.price) {
    state.gold -= option.price;
    state.health += option.amount;
    updateUI();
    elements.text.innerText = `You have been healed for ${option.amount} HP! Your total health is now ${state.health}.`;
  } else {
    elements.text.innerText = "You don't have enough gold!";
  }
}

export function purchaseWeapon(nextWeapon, weaponPrice) {
  if (state.gold >= weaponPrice) {
    state.gold -= weaponPrice;
    state.currentWeapon++;
    elements.goldText.innerText = state.gold;

    elements.text.innerText = `You bought a ${nextWeapon.name} for ${weaponPrice} gold.\n`;
    elements.text.innerText += `${nextWeapon.description}\n`;
    elements.text.innerText += `Power: ${nextWeapon.power}\n`;

    state.inventory.push(nextWeapon.name);
    elements.text.innerText += `\nIn your inventory you have: ${state.inventory.join(
      ", "
    )}`;

    if (state.currentWeapon >= 4) {
      elements.text.innerText += "\n\nThis is a powerful magical weapon!";
    }
    if (state.currentWeapon >= 8) {
      elements.text.innerText +=
        "\nYou feel immense power flowing through you!";
    }

    if (state.currentWeapon < weapons.length - 1) {
      const newNextWeapon = weapons[state.currentWeapon + 1];
      const newWeaponPrice = getWeaponPrice(state.currentWeapon + 1);

      elements.text.innerText += `\n\nNext available weapon: ${newNextWeapon.name}`;
      elements.text.innerText += `\nPower: ${newNextWeapon.power}`;
      elements.text.innerText += `\nPrice: ${newWeaponPrice} gold`;

      elements.button1.innerText = `Buy ${newNextWeapon.name} (${newWeaponPrice} gold)`;
      elements.button1.onclick = () =>
        purchaseWeapon(newNextWeapon, newWeaponPrice);
    } else {
      elements.text.innerText = "You already have the most powerful weapon!";
      elements.button1.innerText = "Sell weapon";
      elements.button2.innerText = "View inventory";
      elements.button3.innerText = "Go back";
      elements.button4.style.display = "none";
      elements.button5.style.display = "none";

      elements.button1.onclick = sellWeapon;
      elements.button2.onclick = viewInventory;
      elements.button3.onclick = goStore;
    }
  } else {
    elements.text.innerText = `You don't have enough gold to buy ${nextWeapon.name}. You need ${weaponPrice} gold.`;
  }
}

export function sellWeapon() {
  if (state.inventory.length > 1) {
    state.gold += 15;
    elements.goldText.innerText = state.gold;
    let currentWeapon = state.inventory.shift();
    elements.text.innerText = "You sold a " + currentWeapon + ".";
    elements.text.innerText +=
      " In your inventory you have: " + state.inventory;
  } else {
    elements.text.innerText = "Don't sell your only weapon!";
  }
}

export function viewWeaponStats() {
  elements.text.innerText = "Current weapon:\n";
  elements.text.innerText += `${weapons[state.currentWeapon].name}\n`;
  elements.text.innerText += `Power: ${weapons[state.currentWeapon].power}\n`;
  elements.text.innerText += `Description: ${
    weapons[state.currentWeapon].description
  }\n\n`;

  if (state.currentWeapon < weapons.length - 1) {
    const nextWeapon = weapons[state.currentWeapon + 1];
    elements.text.innerText += "Next available weapon:\n";
    elements.text.innerText += `${nextWeapon.name}\n`;
    elements.text.innerText += `Power: ${nextWeapon.power}\n`;
    elements.text.innerText += `Description: ${nextWeapon.description}`;
  }
}

export function viewInventory() {
  elements.text.innerText = "Your inventory:\n";
  state.inventory.forEach((item, index) => {
    elements.text.innerText += `${index + 1}. ${item}\n`;
  });
}

export function viewArmorStats() {
  const currentArmor = armors[state.armor];
  elements.text.innerText = "Current armor:\n";
  elements.text.innerText += `${currentArmor.name}\n`;
  elements.text.innerText += `Defense: ${currentArmor.defense}\n`;
  elements.text.innerText += `Description: ${currentArmor.description}\n\n`;

  if (state.armor < armors.length - 1) {
    const nextArmor = armors[state.armor + 1];
    elements.text.innerText += "Next available armor:\n";
    elements.text.innerText += `${nextArmor.name}\n`;
    elements.text.innerText += `Defense: ${nextArmor.defense}\n`;
    elements.text.innerText += `Description: ${nextArmor.description}`;
  }
}

export function compareArmors() {
  elements.text.innerText = "Armor comparison:\n\n";
  armors.forEach((armor, index) => {
    elements.text.innerText += `${armor.name}\n`;
    elements.text.innerText += `Defense: ${armor.defense}\n`;
    elements.text.innerText += `Price: ${armor.price} gold\n\n`;
  });
}

export function viewCurrentArmor() {
  const currentArmor = armors[state.armor];
  elements.text.innerText = `Current armor: ${currentArmor.name}\n`;
  elements.text.innerText += `Defense: ${currentArmor.defense}\n`;
  elements.text.innerText += `Description: ${currentArmor.description}`;
}

export function purchaseArmor(nextArmor) {
  if (state.gold >= nextArmor.price) {
    state.gold -= nextArmor.price;
    state.armor++;
    elements.goldText.innerText = state.gold;
    elements.text.innerText = `You bought ${nextArmor.name} for ${nextArmor.price} gold.\n`;
    elements.text.innerText += nextArmor.description;

    elements.armorText.innerText = armors[state.armor].defense;

    // actualizar al momento las opciones de compra
    if (state.armor < armors.length - 1) {
      const newNextArmor = armors[state.armor + 1];

      elements.text.innerText += `\n\nNext available armor: ${newNextArmor.name}`;
      elements.text.innerText += `\nDefense: ${newNextArmor.defense}`;
      elements.text.innerText += `\nPrice: ${newNextArmor.price} gold`;

      elements.button1.innerText = `Buy ${newNextArmor.name} (${newNextArmor.price} gold)`;
      elements.button2.innerText = "View armor stats";
      elements.button3.innerText = "Compare armors";
      elements.button4.innerText = "View current armor";
      elements.button5.innerText = "Go back";

      elements.button1.onclick = () => purchaseArmor(newNextArmor);
      elements.button2.onclick = viewArmorStats;
      elements.button3.onclick = compareArmors;
      elements.button4.onclick = viewCurrentArmor;
      elements.button5.onclick = goStore;
    } else {
      elements.text.innerText += "\n\nYou now have the best armor available!";
      elements.button1.innerText = "View armor stats";
      elements.button2.innerText = "Go back";
      elements.button3.style.display = "none";
      elements.button4.style.display = "none";
      elements.button5.style.display = "none";

      elements.button1.onclick = viewArmorStats;
      elements.button2.onclick = goStore;
    }
  } else {
    elements.text.innerText = `You don't have enough gold to buy ${nextArmor.name}. You need ${nextArmor.price} gold.`;
  }
}

function displayWeaponShop() {
  const nextWeapon = weapons[state.currentWeapon + 1];
  const weaponPrice = getWeaponPrice(state.currentWeapon + 1);

  showWeaponInfo(nextWeapon, weaponPrice);
  setupWeaponButtons(nextWeapon, weaponPrice);
}

function showWeaponInfo(weapon, price) {
  elements.text.innerText = `Available weapons:\n`;
  elements.text.innerText += `Current weapon: ${
    weapons[state.currentWeapon].name
  } (Power: ${weapons[state.currentWeapon].power})\n\n`;
  elements.text.innerText += `Next weapon: ${weapon.name}\n`;
  elements.text.innerText += `Power: ${weapon.power}\n`;
  elements.text.innerText += `Price: ${price} gold\n`;
  elements.text.innerText += weapon.description;
}

function setupWeaponButtons(weapon, price) {
  elements.button1.innerText = `Buy ${weapon.name} (${price} gold)`;
  elements.button2.innerText = "View weapon stats";
  elements.button3.innerText = "Sell weapon";
  elements.button4.innerText = "View inventory";
  elements.button5.innerText = "Go back";

  elements.button1.onclick = () => purchaseWeapon(weapon, price);
  elements.button2.onclick = viewWeaponStats;
  elements.button3.onclick = sellWeapon;
  elements.button4.onclick = viewInventory;
  elements.button5.onclick = goStore;
}

function displayMaxWeaponMessage() {
  elements.text.innerText = "You already have the most powerful weapon!";
  elements.button1.innerText = "Sell weapon";
  elements.button2.innerText = "View inventory";
  elements.button3.innerText = "Go back";
  elements.button4.style.display = "none";
  elements.button5.style.display = "none";

  elements.button1.onclick = sellWeapon;
  elements.button2.onclick = viewInventory;
  elements.button3.onclick = goStore;
}

function displayArmorShop() {
  elements.button4.style.display = "inline-block";
  elements.button5.style.display = "inline-block";

  if (state.armor < armors.length - 1) {
    const nextArmor = armors[state.armor + 1];

    elements.text.innerText = "Available armor:\n";
    elements.button1.innerText = `Buy ${nextArmor.name} (${nextArmor.price} gold)`;
    elements.button2.innerText = "View armor stats";
    elements.button3.innerText = "Compare armors";
    elements.button4.innerText = "View current armor";
    elements.button5.innerText = "Go back";

    elements.button1.onclick = () => purchaseArmor(nextArmor);
    elements.button2.onclick = viewArmorStats;
    elements.button3.onclick = compareArmors;
    elements.button4.onclick = viewCurrentArmor;
    elements.button5.onclick = goStore;
  } else {
    elements.text.innerText = "You already have the best armor!";
    elements.button1.innerText = "View armor stats";
    elements.button2.innerText = "Go back";
    elements.button3.style.display = "none";
    elements.button4.style.display = "none";
    elements.button5.style.display = "none";

    elements.button1.onclick = viewArmorStats;
    elements.button2.onclick = goStore;
  }
}

function displayMaxArmorMessage() {
  elements.text.innerText = "You already have the best armor!";
  elements.button1.innerText = "View armor stats";
  elements.button2.innerText = "Go back";
  elements.button3.style.display = "none";
  elements.button4.style.display = "none";
  elements.button5.style.display = "none";

  elements.button1.onclick = viewArmorStats;
  elements.button2.onclick = goStore;
}

function setupHealingButtons(healingOptions) {
  elements.button4.style.display = "inline-block";
  elements.button5.style.display = "inline-block";

  healingOptions.forEach((option, index) => {
    elements[`button${index + 1}`].onclick = () => processHealing(option);
  });
  elements.button5.onclick = goStore;
}
