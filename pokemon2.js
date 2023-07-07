const $darkThemeButton = document.querySelector(".darkThemeButton");

function darktheme($darkThemeButton, classDarkMode){
  
  const $selectors = document.querySelectorAll("[data-dark]");


  const darkMode = () => {

    $selectors.forEach((el) => {
      el.classList.add(classDarkMode);
    });

    $darkThemeButton.textContent = "Light Mode";
    localStorage.setItem("theme", "dark");
  }

  const LightMode = () => {

    $selectors.forEach((el) => {
      el.classList.remove(classDarkMode);
    });

    $darkThemeButton.textContent = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
  // alert($darkThemeButton);

  document.addEventListener("Click", (e) => {

    if (e.target === $darkThemeButton)
    { if ($darkThemeButton.textContent === "Dark Mode"){
      darkMode();
    }else{
      LightMode();
    }}
});

document.addEventListener("DOMContentLoaded", (e) => {

  if (localStorage.getItem("theme") === null){

    localStorage.setItem("theme","light")

  }
  if (localStorage.getItem("theme") === "light"){
    LightMode();
  }

  if (localStorage.getItem("theme") === "dark"){
    darkMode();
  }})};
