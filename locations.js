// @ts-nocheck
import {
  state,
  elements,
  restart,
  locationImages,
  updateImage,
  updateUI,
} from "./gameState.js";
import {
  buyHealth,
  buyWeapon,
  buyArmor,
  viewWeaponStats,
  viewInventory,
  viewArmorStats,
  compareArmors,
  viewCurrentArmor,
} from "./shop.js";
import { attack, dodge, goFight, lose } from "./combat.js";

export const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "Buy health",
      "Buy weapon",
      "Buy armor",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, buyArmor, goTown],
    text: "You enter the store. What would you like to buy?",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "This fight is going to be so EPIC!",
  },
  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the FINAL BOSS! YOU WIN THE GAME! &#x1F389;",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  },
  {
    name: "dark forest",
    "button text": [
      "Fight skeleton warrior",
      "Fight dark wizard",
      "Go to town square",
    ],
    "button functions": [fightSkeleton, fightWizard, goTown],
    text: "You enter the mysterious dark forest. A forest shrouded in ash and thick fog, filled with withered trees and dark paths. Ancient evil creatures await.",
  },
  {
    name: "The forgotten hollow",
    "button text": [
      "Fight ancient dragon",
      "Fight ancient dragon",
      "Go to town square",
    ],
    "button functions": [fightAncientDragon, fightAncientDragon, goTown],
    text: "In the heart of the Forgotten Hollow, ruins crumble beneath a sky of swirling ash. Glowing eyes pierce the darkness as the Ancient Dragon rises, obsidian scales gleaming with molten veins. With a thunderous roar, it spreads its wings and engulfs the land in fire.",
  },
  {
    name: "crystal caverns",
    "button text": [
      "Fight crystal sentinel",
      "Fight gem serpent",
      "Go to town square",
    ],
    "button functions": [fightCrystalSentinel, fightGemSerpent, goTown],
    text: "You enter the crystal caverns. A glimmering cave system filled with colorful crystals, glowing pools of water, and echoes that make every sound feel otherworldly.",
  },
  {
    name: "the shimmering abyss",
    "button text": [
      "Fight prism leviathan",
      "Fight prism leviathan",
      "Go to town square",
    ],
    "button functions": [fightPrismLeviathan, fightPrismLeviathan, goTown],
    text: "You emerge into a vast chamber, its walls covered in dazzling crystals that reflect light in every direction. A deep pool lies at the center, its surface eerily still and unnaturally clear, revealing an abyss that seems to stretch forever. As you approach, the water ripples, and a massive crystalline shape rises from the depths. The Prism Leviathan's body gleams with every color of the spectrum, its many eyes glowing with ancient fury as it roars, shaking the cavern around you.",
  },
  {
    name: "abyssal depths",
    "button text": [
      "Fight abyss crab",
      "Fight shadow eel",
      "Go to town square",
    ],
    "button functions": [fightAbyssCrab, fightShadowEel, goTown],
    text: "A vast underwater expanse cloaked in darkness, illuminated by glowing corals and inhabited by strange, bioluminescent creatures.",
  },
  {
    name: "the sunken trench",
    "button text": [
      "Fight kraken of the deep",
      "Fight kraken of the deep",
      "Go to town square",
    ],
    "button functions": [fightKrakenOfTheDeep, fightKrakenOfTheDeep, goTown],
    text: "The ocean floor descends into a deep trench, its edges lined with jagged rocks and glowing corals. The water here feels colder, heavier, and darker than before. As you swim closer to the trench's edge, the ground trembles, and enormous tentacles burst forth, coiling around the rocks. The Kraken's massive form emerges from the shadows, its glowing eyes fixed on you as it lets out a deafening, underwater roar.",
  },
  {
    name: "skyward peaks",
    "button text": [
      "Fight thunder hawk",
      "Fight sky elemental",
      "Go to town square",
    ],
    "button functions": [fightThunderHawk, fightSkyElemental, goTown],
    text: "You find yourself in floating mountains surrounded by clouds, lightning storms, and winds that carry the faint echoes of ancient chants.",
  },
  {
    name: "the eye of the storm",
    "button text": [
      "Fight tempest titan",
      "Fight tempest titan",
      "Go to town square",
    ],
    "button functions": [fightTempestTitan, fightTempestTitan, goTown],
    text: "You ascend a staircase of floating rocks, each platform buffeted by fierce winds. Lightning crackles in the distance, illuminating a swirling storm that dominates the horizon. At the center of the storm, a massive platform of stone floats, carved with ancient runes that glow faintly. As you step onto the platform, the winds intensify, and a booming voice echoes around you. The Tempest Titan materializes from the clouds, his colossal form surrounded by crackling lightning as he prepares to unleash his fury.",
  },
];

// xp para cada localización
export const locationRequirements = [
  { name: "Dark Forest", xp: 100 },
  { name: "Dragon Mountain", xp: 200 },
  { name: "Crystal Caverns", xp: 300 },
  { name: "Shimmering Abyss", xp: 400 },
  { name: "Abyssal Depths", xp: 500 },
  { name: "Sunken Trench", xp: 600 },
  { name: "Skyward Peaks", xp: 700 },
  { name: "Eye of the Storm", xp: 800 },
];

// función para actualizar la guia de ubicaciones
export function updateLocationsList() {
  const locationsList = document.querySelector("#locations-list");
  locationsList.innerHTML = "";

  locationRequirements.forEach((loc) => {
    const isUnlocked = state.xp >= loc.xp;
    const locationElement = document.createElement("div");
    locationElement.className = isUnlocked
      ? "unlocked-location"
      : "locked-location";
    locationElement.innerHTML = `${loc.name} - Required XP: ${loc.xp} ${
      isUnlocked ? "✓" : "🔒"
    }`;
    locationsList.appendChild(locationElement);
  });
}

export function update(location) {
  elements.monsterStats.style.display = "none";
  setupButtons(location);
  elements.text.innerHTML = location.text;

  if (locationImages[location.name]) {
    updateImage(locationImages[location.name], location.name);
  }
}

function setupButtons(location) {
  // configurar botones principales
  for (let i = 0; i < 3; i++) {
    elements[`button${i + 1}`].innerText = location["button text"][i];
    elements[`button${i + 1}`].onclick = location["button functions"][i];
  }

  // configurar botones adicionales
  setupAdditionalButton(elements.button4, location, 3);
  setupAdditionalButton(elements.button5, location, 4);
}

function setupAdditionalButton(button, location, index) {
  if (location["button text"][index]) {
    button.style.display = "inline-block";
    button.innerText = location["button text"][index];
    button.onclick = location["button functions"][index];
  } else {
    button.style.display = "none";
  }
}

export function goTown() {
  elements.monsterStats.style.display = "none";

  updateUI();
  update(locations[0]);
  updateLocationsList();
  updateButtons();
}

function updateButtons() {
  if (state.xp >= 100) {
    elements.button2.innerText = "Go to dark forest";
    elements.button2.onclick = goDarkForest;
  }
  if (state.xp >= 200) {
    elements.button3.innerText = "Go to dragon mountain";
    elements.button3.onclick = goDragonMountain;
  }
  if (state.xp >= 300) {
    elements.button2.innerText = "Go to crystal caverns";
    elements.button2.onclick = goCrystalCaverns;
  }
  if (state.xp >= 400) {
    elements.button3.innerText = "Go to shimmering abyss";
    elements.button3.onclick = goShimmeringAbyss;
  }
  if (state.xp >= 500) {
    elements.button2.innerText = "Go to abyssal depths";
    elements.button2.onclick = goAbyssalDepths;
  }
  if (state.xp >= 600) {
    elements.button3.innerText = "Go to sunken trench";
    elements.button3.onclick = goSunkenTrench;
  }
  if (state.xp >= 700) {
    elements.button2.innerText = "Go to skyward peaks";
    elements.button2.onclick = goSkywardPeaks;
  }
  if (state.xp >= 800) {
    elements.button3.innerText = "Go to eye of the storm";
    elements.button3.onclick = goEyeOfTheStorm;
  }
}

export function goStore() {
  elements.button4.style.display = "inline-block";
  elements.button5.style.display = "inline-block";
  update(locations[1]);
}

export function goCave() {
  update(locations[2]);
}

export function fightSlime() {
  state.fighting = 0;
  goFight();
}

export function fightBeast() {
  state.fighting = 1;
  goFight();
}

export function fightDragon() {
  state.fighting = 2;
  goFight();
}

export function fightSkeleton() {
  state.fighting = 3;
  goFight();
}

export function fightWizard() {
  state.fighting = 4;
  goFight();
}

export function fightAncientDragon() {
  state.fighting = 5;
  goFight();
}

export function fightCrystalSentinel() {
  state.fighting = 6;
  goFight();
}

export function fightGemSerpent() {
  state.fighting = 7;
  goFight();
}

export function fightPrismLeviathan() {
  state.fighting = 8;
  goFight();
}

export function fightAbyssCrab() {
  state.fighting = 9;
  goFight();
}

export function fightShadowEel() {
  state.fighting = 10;
  goFight();
}

export function fightKrakenOfTheDeep() {
  state.fighting = 11;
  goFight();
}

export function fightThunderHawk() {
  state.fighting = 12;
  goFight();
}

export function fightSkyElemental() {
  state.fighting = 13;
  goFight();
}

export function fightTempestTitan() {
  state.fighting = 14;
  goFight();
}

export function easterEgg() {
  update(locations[7]);
}

export function pickTwo() {
  pick(2);
}

export function pickEight() {
  pick(8);
}

export function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }

  elements.text.innerText =
    "You picked " + guess + ". Here are the random numbers:\n";

  for (let i = 0; i < 10; i++) {
    elements.text.innerText += numbers[i] + "\n";
  }

  if (numbers.includes(guess)) {
    elements.text.innerText += "Right! You win 20 gold!";
    state.gold += 20;
    elements.goldText.innerText = state.gold;
  } else {
    elements.text.innerText += "Wrong! You lose 10 health!";
    state.health -= 10;
    elements.healthText.innerText = state.health;
    if (state.health <= 0) {
      lose();
    }
  }
}

export function goDarkForest() {
  update(locations[8]);
}

export function goDragonMountain() {
  update(locations[9]);
}

export function goCrystalCaverns() {
  update(locations[10]);
}

export function goShimmeringAbyss() {
  update(locations[11]);
}

export function goAbyssalDepths() {
  update(locations[12]);
}

export function goSunkenTrench() {
  update(locations[13]);
}

export function goSkywardPeaks() {
  update(locations[14]);
}

export function goEyeOfTheStorm() {
  update(locations[15]);
}
