export function updateUI(elements, state) {
  elements.xpText.innerText = state.xp;
  elements.healthText.innerText = state.health;
  elements.goldText.innerText = state.gold;
  elements.armorText.innerText = state.armor;
}

export function showMessage(element, message) {
  element.innerText = message;
}

export function setupButton(button, text, onClick, display = true) {
  button.innerText = text;
  button.onclick = onClick;
  button.style.display = display ? "inline-block" : "none";
}
