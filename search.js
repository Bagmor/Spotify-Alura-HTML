/*const resultArtist = document.getElementById('result-artist');
const playlistContainer = document.getElementById('result-playlists');
const searchInput = document.getElementById('search-input');

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((result) => displayResults(result));
}

function displayResults(result) {
  hidePlaylists();
  const artistImage = document.getElementById('artist-img');
  const artistName = document.getElementById('artist-name');

  results.forEach((element) => {
    artistImage.src = element.urlImg;
    artistName.innerText = element.name;
  });
  resultArtist.classList.remove('hidden');
}

function hidePlaylists() {
  playlistContainer.classList.add('hidden');
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add('hidden');
    playlistContainer.classList.remove('hidden');
    return;
  }
  requestApi(searchTerm);
});*/


const resultArtist = document.getElementById('result-artist');
const playlistContainer = document.getElementById('result-playlists');
const searchInput = document.getElementById('search-input');
const gridContainer = document.querySelector('.grid-container'); // Onde os artistas serão adicionados

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((results) => {
      displayResults(results, searchTerm);
    })
    .catch((error) => console.error("Erro ao buscar artistas:", error));
}

function displayResults(results, searchTerm) {
  // Filtrar apenas artistas cujo nome contenha o termo buscado
  const filteredResults = results.filter((artist) => 
    artist.name.toLowerCase().includes(searchTerm)
  );

  // Se não houver resultados, volta para a página principal
  if (filteredResults.length === 0) {
    resultArtist.classList.add('hidden');
    playlistContainer.classList.remove('hidden');
    return;
  }

  hidePlaylists();

  // Limpa os resultados anteriores
  gridContainer.innerHTML = "";

  // Adiciona cada artista filtrado na grade
  filteredResults.forEach((artist) => {
    const artistCard = document.createElement("div");
    artistCard.classList.add("artist-card");

    artistCard.innerHTML = `
      <div class="card-img">
        <img src="${artist.urlImg}" alt="${artist.name}" class="artist-img">
        <div class="play">
          <span class="fa fa-solid fa-play"></span>
        </div>
      </div>
      <div class="card-text">
        <span class="artist-name">${artist.name}</span>
        <span class="artist-categorie">Artista</span>
      </div>
    `;

    gridContainer.appendChild(artistCard);
  });

  resultArtist.classList.remove('hidden');
}

function hidePlaylists() {
  playlistContainer.classList.add('hidden');
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    resultArtist.classList.add('hidden');
    playlistContainer.classList.remove('hidden');
    return;
  }
  
  requestApi(searchTerm);
});
