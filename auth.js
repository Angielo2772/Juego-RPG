import pb from "./pocketbase.js";

export async function registerUser(username, email, password) {
  try {
    console.log("Registrando usuario:", { username, email });
    const data = {
      username,
      email,
      password,
      passwordConfirm: password,
      emailVisibility: true,
    };

    const user = await pb.collection("users").create(data);
    console.log("Usuario registrado:", user);
    return user;
  } catch (error) {
    console.error("Error detallado del registro:", error);
    throw new Error(error.data?.message || error.message);
  }
}

export async function loginUser(email, password) {
  try {
    console.log("Intentando login con:", email);
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);

    if (authData) {
      localStorage.setItem("username", authData.record.username);
      return authData;
    }
    throw new Error("Error de autenticación");
  } catch (error) {
    console.error("Error detallado:", error);
    throw new Error(error.data?.message || error.message);
  }
}

export function isAuthenticated() {
  return pb.authStore.isValid;
}

export function logout() {
  pb.authStore.clear();
  localStorage.removeItem("authToken");
  localStorage.removeItem("username");
  localStorage.removeItem("gameData");
  window.location.reload();
}
