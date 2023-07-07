function darktheme(darkThemeButton, classDarkMode) {
  console.log("Hola");
  const $selectors = document.querySelectorAll("[data-dark]"),
    $darkThemeButton = document.querySelector(".darkThemeButton");

  const darkMode = () => {
    $selectors.forEach((el) => {
      el.classList.add(classDarkMode);
    });

    $darkThemeButton.textContent = "Light Mode";
    localStorage.setItem("theme", "dark");
  };

  const lightMode = () => {
    $selectors.forEach((el) => {
      el.classList.remove(classDarkMode);
    });

    $darkThemeButton.textContent = "Dark Mode";
    localStorage.setItem("theme", "light");
  };

  document.addEventListener("click", (e) => {
    if (e.target.matches(darkThemeButton)) {
      if ($darkThemeButton.textContent === "Dark Mode") {
        darkMode();
      } else {
        lightMode();
      }
    }
  });

  document.addEventListener("DOMContentLoaded", (e) => {
    if (localStorage.getItem("theme") === null)
      localStorage.setItem("theme", "light");

    if (localStorage.getItem("theme") === "light") lightMode();

    if (localStorage.getItem("theme") === "dark") darkMode();
  });
}

darktheme(".darkThemeButton", "classDarkMode");
