// ==========================================
// JFEJ School - Script de la page de Profil
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const loggedView = document.getElementById("profile-logged-view");
  const guestView = document.getElementById("profile-guest-view");
  const currentUserRaw = sessionStorage.getItem("jfej_current_user");

  if (!currentUserRaw) {
    // Si aucun utilisateur n'est connecté : afficher l'écran invité
    if (loggedView) loggedView.style.display = "none";
    if (guestView) guestView.style.display = "block";
    return;
  }

  // Utilisateur connecté
  if (loggedView) loggedView.style.display = "flex";
  if (guestView) guestView.style.display = "none";

  const user = JSON.parse(currentUserRaw);
  renderUserProfile(user);

  // Gestion du formulaire d'édition
  const editForm = document.getElementById("profile-edit-form");
  if (editForm) {
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      saveProfileChanges(user);
    });
  }

  // Boutons de déconnexion rapide
  const quickLogoutBtn = document.getElementById("btn-quick-logout");
  if (quickLogoutBtn) {
    quickLogoutBtn.addEventListener("click", performLogout);
  }

  const navAuthBtn = document.getElementById("nav-auth-btn");
  if (navAuthBtn) {
    navAuthBtn.addEventListener("click", (e) => {
      e.preventDefault();
      performLogout();
    });
  }
});

// Affiche les informations de l'utilisateur sur la page
function renderUserProfile(user) {
  const prenom = user.prenom || "Élève";
  const nom = user.nom || "";
  const email = user.email || "eleve@jfej.fr";
  const classe = user.classe || "1ère Générale";
  const specialite = user.specialite || "Numérique et Sciences Informatiques (NSI)";
  const bio = user.bio || "";

  // 1. Initiales pour l'avatar
  const pInit = prenom.charAt(0).toUpperCase();
  const nInit = nom.charAt(0).toUpperCase() || "J";
  const avatarElem = document.getElementById("avatar-initials");
  if (avatarElem) avatarElem.textContent = `${pInit}${nInit}`;

  // 2. En-tête
  const nameElem = document.getElementById("profile-display-name");
  if (nameElem) nameElem.textContent = `${prenom} ${nom}`;

  const emailElem = document.getElementById("profile-display-email");
  if (emailElem) emailElem.textContent = email;

  const badgeClasse = document.getElementById("badge-classe");
  if (badgeClasse) badgeClasse.textContent = `${classe}`;

  const badgeSpe = document.getElementById("badge-specialite");
  if (badgeSpe) {
    let shortSpe = specialite;
    if (specialite.includes("NSI")) shortSpe = "NSI";
    else if (specialite.includes("Math")) shortSpe = "Mathématiques";
    else if (specialite.includes("Physique")) shortSpe = "Physique-Chimie";
    else if (specialite.includes("SVT") || specialite.includes("Terre")) shortSpe = "SVT";
    badgeSpe.textContent = shortSpe;
  }

  // 3. Détails
  setElementText("info-prenom", prenom);
  setElementText("info-nom", nom);
  setElementText("info-email", email);
  setElementText("info-classe", classe);
  setElementText("info-specialite", specialite);

  // 4. Pré-remplissage du formulaire d'édition
  const editBio = document.getElementById("edit-bio");
  if (editBio) editBio.value = bio;

  const editSpe = document.getElementById("edit-specialite");
  if (editSpe && specialite) editSpe.value = specialite;

  const editClasse = document.getElementById("edit-classe");
  if (editClasse && classe) editClasse.value = classe;
}

// Sauvegarde des modifications
function saveProfileChanges(currentUser) {
  const newBio = document.getElementById("edit-bio").value.trim();
  const newSpe = document.getElementById("edit-specialite").value;
  const newClasse = document.getElementById("edit-classe").value;

  currentUser.bio = newBio;
  currentUser.specialite = newSpe;
  currentUser.classe = newClasse;

  // Mise à jour de la session courante
  sessionStorage.setItem("jfej_current_user", JSON.stringify(currentUser));

  // Mise à jour dans le tableau global des utilisateurs (localStorage)
  const users = JSON.parse(localStorage.getItem("jfej_users") || "[]");
  const userIndex = users.findIndex((u) => u.email.toLowerCase() === currentUser.email.toLowerCase());
  if (userIndex !== -1) {
    users[userIndex] = currentUser;
    localStorage.setItem("jfej_users", JSON.stringify(users));
  }

  // Rafraîchir l'affichage
  renderUserProfile(currentUser);

  // Notification utilisateur
  alert("Votre profil a été mis à jour avec succès !");
}

// Déconnexion
function performLogout() {
  if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
    sessionStorage.removeItem("jfej_current_user");
    window.location.href = "index.html";
  }
}

function setElementText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
