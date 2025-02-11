// @ts-nocheck
import { updateLocationsList, goTown } from "./locations.js";

// estado del juego
export let state = {
  xp: 0,
  health: 100,
  gold: 50,
  currentWeapon: 0,
  fighting: null,
  monsterHealth: 0,
  inventory: ["Rusty Dagger"],
  armor: 0,
};

// referencias a elementos del DOM
export const elements = {
  button1: document.querySelector("#button1"),
  button2: document.querySelector("#button2"),
  button3: document.querySelector("#button3"),
  button4: document.querySelector("#button4"),
  button5: document.querySelector("#button5"),
  text: document.querySelector("#text"),
  xpText: document.querySelector("#xpText"),
  healthText: document.querySelector("#healthText"),
  goldText: document.querySelector("#goldText"),
  monsterStats: document.querySelector("#monsterStats"),
  monsterName: document.querySelector("#monsterName"),
  monsterHealthText: document.querySelector("#monsterHealth"),
  sceneImage: document.querySelector("#scene-image"),
  armorText: document.querySelector("#armorText"),
};

// Datos del juego
// armas
export const weapons = [
  {
    name: "Rusty Dagger",
    power: 5,
    description: "An old rusty dagger, barely sharp enough to cut bread.",
  },
  {
    name: "Wooden Club",
    power: 15,
    description: "A solid oak club. Simple but effective.",
  },
  {
    name: "Steel Shortsword",
    power: 30,
    description: "A well-crafted steel sword, reliable and sharp.",
  },
  {
    name: "Crystal Bow",
    power: 45,
    description: "A bow made of magical crystals that never needs arrows.",
  },
  {
    name: "Magic Staff",
    power: 60,
    description:
      "A staff humming with arcane energy, its crystal tip glows with power.",
  },
  {
    name: "Flame Gauntlet",
    power: 80,
    description: "Ancient gauntlets that channel the power of fire itself.",
  },
  {
    name: "Thunder Axe",
    power: 100,
    description:
      "An axe that crackles with lightning, said to be forged in a storm.",
  },
  {
    name: "Void Spear",
    power: 120,
    description:
      "A spear that seems to absorb light, its edge disappears into nothingness.",
  },
  {
    name: "Phantom Scythe",
    power: 150,
    description: "A ghostly scythe that phases through armor but cuts flesh.",
  },
  {
    name: "Ethereal Blade",
    power: 190,
    description:
      "A sword from another dimension, its blade shifts and changes like smoke.",
  },
  {
    name: "Starfall Hammer",
    power: 230,
    description:
      "A majestic hammer forged from a fallen star, it pulses with cosmic energy.",
  },
  {
    name: "Legendary Blade",
    power: 300,
    description:
      "The legendary blade of heroes past, its power is unmatched in all the realms.",
  },
];

// armaduras
export const armors = [
  {
    name: "Cloth Robe",
    defense: 2,
    price: 20,
    description: "A simple cloth robe.",
  },
  {
    name: "Leather Armor",
    defense: 5,
    price: 50,
    description: "Basic leather protection.",
  },
  {
    name: "Chain Mail",
    defense: 10,
    price: 100,
    description: "Sturdy chain mail armor.",
  },
  {
    name: "Steel Plate",
    defense: 15,
    price: 200,
    description: "Heavy but protective steel armor.",
  },
  {
    name: "Dragon Scale",
    defense: 25,
    price: 400,
    description: "Armor made from dragon scales.",
  },
  {
    name: "Crystal Aegis",
    defense: 35,
    price: 800,
    description: "Magical crystal armor that deflects attacks.",
  },
];

// enemigos
export const monsters = [
  {
    name: "slime",
    level: 5,
    health: 15,
  },
  {
    name: "fanged beast",
    level: 10,
    health: 60,
  },
  {
    name: "dragon",
    level: 25,
    health: 300,
  },
  {
    name: "skeleton warrior",
    level: 10,
    health: 120,
  },
  {
    name: "dark wizard",
    level: 20,
    health: 200,
  },
  {
    name: "ancient dragon",
    level: 35,
    health: 500,
  },
  {
    name: "crystal sentinel",
    level: 20,
    health: 250,
  },
  {
    name: "gem serpent",
    level: 30,
    health: 400,
  },
  {
    name: "prism leviathan",
    level: 50,
    health: 700,
  },
  {
    name: "abyss crab",
    level: 35,
    health: 500,
  },
  {
    name: "shadow eel",
    level: 50,
    health: 600,
  },
  {
    name: "kraken of the deep",
    level: 70,
    health: 900,
  },
  {
    name: "thunder hawk",
    level: 50,
    health: 700,
  },
  {
    name: "sky elemental",
    level: 70,
    health: 900,
  },
  {
    name: "tempest titan",
    level: 100,
    health: 1200,
  },
];

export const locationImages = {
  "town square": "./images/places/town-square.jpg",
  store: "./images/places/store.jpg",
  cave: "./images/places/cave.jpg",
  "dark forest": "./images/places/dark-forest.jpg",
  "forgotten hollow": "./images/places/forgotten-hollow.jpg",
  "crystal caverns": "./images/places/crystal-caverns.jpg",
  "shimmering abyss": "./images/places/shimmering-abyss.jpg",
  "abyssal depths": "./images/places/abyssal-depths.jpg",
  "sunken trench": "./images/places/sunken-trench.jpg",
  "skyward peaks": "./images/places/skyward-peaks.jpg",
  "eye of the storm": "./images/places/eye-of-storm.jpg",
};

export const monsterImages = {
  slime: "./images/monsters/slime.jpg",
  "fanged beast": "./images/monsters/fanged-beast.jpg",
  dragon: "./images/monsters/dragon.jpg",
  "skeleton warrior": "./images/monsters/skeleton.jpg",
  "dark wizard": "./images/monsters/wizard.jpg",
  "ancient dragon": "./images/monsters/ancient-dragon.jpg",
  "crystal sentinel": "./images/monsters/crystal-sentinel.jpg",
  "gem serpent": "./images/monsters/gem-serpent.jpg",
  "prism leviathan": "./images/monsters/prism-leviathan.jpg",
  "abyss crab": "./images/monsters/abyss-crab.jpg",
  "shadow eel": "./images/monsters/shadow-eel.jpg",
  "kraken of the deep": "./images/monsters/kraken.jpg",
  "thunder hawk": "./images/monsters/thunder-hawk.jpg",
  "sky elemental": "./images/monsters/sky-elemental.jpg",
  "tempest titan": "./images/monsters/tempest-titan.jpg",
};

// funciones para guardar y cargar la partida
export function saveGame() {
  const gameData = {
    xp: state.xp,
    health: state.health,
    gold: state.gold,
    currentWeapon: state.currentWeapon,
    armor: state.armor,
    inventory: state.inventory,
    fighting: state.fighting,
    monsterHealth: state.monsterHealth,
  };
  localStorage.setItem("gameData", JSON.stringify(gameData));
}

export function loadGame() {
  const savedGame = localStorage.getItem("gameData");
  if (savedGame) {
    const gameData = JSON.parse(savedGame);
    Object.assign(state, gameData);
    updateUI();
  }
}

// actualización de UI
export function updateUI() {
  elements.xpText.innerText = state.xp;
  elements.healthText.innerText = state.health;
  elements.goldText.innerText = state.gold;
  elements.armorText.innerText = armors[state.armor].defense;
}

export function restart() {
  state.xp = 0;
  state.health = 100;
  state.gold = 50;
  state.currentWeapon = 0;
  state.armor = 0;
  state.inventory = ["Rusty Dagger"];
  state.fighting = null;
  state.monsterHealth = 0;
  updateUI();
  updateLocationsList();
  goTown();
}

// función para manejar imágenes
export function updateImage(imagePath, altText) {
  try {
    elements.sceneImage.src = imagePath;
    elements.sceneImage.alt = altText;
    elements.sceneImage.onerror = () => {
      console.log(`Error loading image: ${imagePath}`);
      elements.sceneImage.src = "./images/places/town-square.jpg";
      elements.sceneImage.alt = "Image not available";
    };
  } catch (error) {
    console.log("Error handling image:", error);
    elements.sceneImage.src = "./images/places/town-square.jpg";
    elements.sceneImage.alt = "Error loading image";
  }
}
