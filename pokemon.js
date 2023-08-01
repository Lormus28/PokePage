const $containerPokemons = document.querySelector(".container-pokemons");

const $linksPrevNext = document.querySelector(".links-prev-next");

let activeFilter= "all";

let APIpokemon = "https://pokeapi.co/api/v2/pokemon/";
let APITypes = "https://pokeapi.co/api/v2/type";

async function pokemonData(url) {

  if (localStorage.getItem("selectType") === null) {
    localStorage.setItem("selectType", "all");
  }

  try {
    $containerPokemons.innerHTML = `<img class="loader" src="./assets/loader.svg" alt="Loading...">`;

    let typerute =
      localStorage.getItem("selectType") === "all"
        ? url
        : `${APITypes}/${localStorage.getItem("selectType")}`;

    let res = await fetch(typerute),
      json = await res.json(),
      $template = "",
      $prevLink,
      $nextLink;

    let pokemonjson =
      localStorage.getItem("selectType") === "all"
        ? json.results
        : json.pokemon;

    for (let i = 0; i < pokemonjson.length; i++) {
      try {
        let res = await fetch(
            localStorage.getItem("selectType") === "all"
              ? pokemonjson[i].url
              : pokemonjson[i].pokemon.url
          ),
          pokemon = await res.json();
        // console.log (res, pokemon);

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        $template += `
        <div class="pokeCard">
            <div class="name">
              <p><b>${pokemon.name}</b></p>
              <i class="fa-regular fa-heart"></i>
            </div>
            <div class="backCard">
              <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            </div>
            <div class="powerLevel">
             <p><b>${pokemon.base_experience}</b></p>
             <button>Buy</button>
            </div>
          </div>
        `;
      } catch (err) {
        // console.log(err);
        let message = err.statusText || "Unexpected error";
        $template.innerHTML = `<div class="pokeCard">
                    <div class="name">
                      <p><b>Name</b></p>
                      <i class="fa-regular fa-heart"></i>
                    </div>
                    <div class="backCard">
                      <p>Error ${err.status}: ${message}</p>
                    </div>
                    <div class="powerLevel">
                     <p><b>Power Level</b></p>
                     <button>Buy</button>
                    </div>
                  </div>`;
      }
    }

    $containerPokemons.innerHTML = $template;

    $nextLink = json.next
      ? `<a class="nextPrevButton" href="${json.next}">➡️</a>`
      : "";
    $prevLink = json.previous
      ? `<a class= "nextPrevButton" href="${json.previous}">⬅️</a>`
      : "";
    $linksPrevNext.innerHTML = $prevLink + " " + $nextLink;
  } catch (err) {
    let message = err.statusText || "Unexpected error";
    $containerPokemons.innerHTML = `<p> Error ${err.status}:${message}</p>`;
  }
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".links-prev-next a")) {
    e.preventDefault();
    pokemonData(e.target.getAttribute("href"));
  }
});

document.addEventListener("DOMContentLoaded", (e) => pokemonData(APIpokemon));

// function filterByType(type){
//   localStorage.setItem('selectType', type)
//   pokemonData(APITypes)
// }

document.addEventListener("click", (e) => {
  if (e.target.matches(".pokemonTypes a")) {
    localStorage.setItem("selectType", e.target.id);
  }
});



