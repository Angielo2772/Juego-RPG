// @ts-nocheck
import { state, elements, loadGame } from "./gameState.js";
import {
  goTown,
  goCave,
  fightDragon,
  goStore,
  updateLocationsList,
} from "./locations.js";
import { loginUser, isAuthenticated, registerUser, logout } from "./auth.js";

// elementos del DOM
const loginContainer = document.querySelector("#login-container");
const gameContainer = document.querySelector("#game-container");

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");
  const registerButton = document.querySelector("#register-button");
  const errorMessage = document.querySelector("#error-message");
  const loggedUsername = document.querySelector("#logged-username");
  const logoutButton = document.querySelector("#logout-button");

  const savedUsername = localStorage.getItem("username");
  if (savedUsername) {
    loggedUsername.textContent = savedUsername;
  }

  if (isAuthenticated()) {
    showGame();
  } else {
    showLogin();
  }

  function showLogin() {
    loginContainer.style.display = "flex";
    gameContainer.style.display = "none";
    logoutButton.style.display = "none";
  }

  function showGame() {
    loginContainer.style.display = "none";
    gameContainer.style.display = "flex";
    logoutButton.style.display = "inline-block";
    initGame();
  }

  async function handleLogin(event) {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
      const authData = await loginUser(email, password);
      if (authData) {
        loggedUsername.textContent = authData.record.username;
        showGame();
        console.log("Login exitoso:", authData);
      }
    } catch (error) {
      console.error("Error login:", error);
      errorMessage.textContent = error.message;
      errorMessage.style.color = "#ff6b6b";
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
      await registerUser(username, email, password);
      errorMessage.textContent =
        "¡Registro exitoso! Ahora puedes iniciar sesión.";
      errorMessage.style.color = "#90EE90";
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.style.color = "#ff6b6b";
    }
  }

  function handleGuestLogin() {
    const guestUsername = "Invitado_" + Math.random().toString(36).substr(2, 9);
    loggedUsername.textContent = guestUsername;
    showGame();
  }

  function handleLogout() {
    logout();
    localStorage.removeItem("username");
    showLogin();

    // Limpiar datos del juego
    localStorage.removeItem("gameData");
    loggedUsername.textContent = "";
    errorMessage.textContent = "";
  }

  function initGame() {
    elements.button1.onclick = goStore;
    elements.button2.onclick = goCave;
    elements.button3.onclick = fightDragon;

    if (localStorage.getItem("gameData")) {
      loadGame();
    }

    updateLocationsList();
    goTown();
  }

  // Event Listeners
  loginForm?.addEventListener("submit", handleLogin);
  registerButton?.addEventListener("click", handleRegister);
  document
    .querySelector("#guest-button")
    .addEventListener("click", handleGuestLogin);
  logoutButton?.addEventListener("click", handleLogout);
});
