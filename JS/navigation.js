// Permet de gérer la persistance du thème sombre entre toutes les pages
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("dark-mode-toggle");
  if (!toggle) return;

  const savedTheme = localStorage.getItem("JFEJ-theme");
  const isDarkMode = savedTheme === "dark";
  const isLightMode = savedTheme === "light";
  toggle.checked = isDarkMode;
  toggle.checked = isLightMode ? false : isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  document.body.classList.toggle("light-mode", isLightMode);

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", toggle.checked);
    document.body.classList.toggle("light-mode", !toggle.checked);

    if (toggle.checked) {
      localStorage.setItem("JFEJ-theme", "dark");
    } else {
      localStorage.setItem("JFEJ-theme", "light");
    }
  });
});