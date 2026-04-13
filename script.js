let myPokeDex = [];
let mainCollectionIndices = [];
let currentDisplayedPokemon = [];
let currentImage = 0;
let myPhotoDiv = document.getElementById("mainContent");
let currentOffset = 0;
const spinner = document.getElementById("spinnerContainer");

let allPokemonList = [];

async function init() {
    await getAllPokemonList();
    await getCharacters();
    renderGalaray();
}

async function getAllPokemonList() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000");
        const data = await response.json();
        allPokemonList = data.results;
    } catch (e) {
        console.error("error fetching all pokemon names", e);
    }
}

async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    return await response.json();
}

async function addPokemonByUrl(url) {
    const details = await fetchPokemonDetails(url);
    myPokeDex.push(details);
    mainCollectionIndices.push(myPokeDex.length - 1);
}

async function getCharacters() {
    startLoadingScreen();

    try {
        const cardSet = await (await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`)).json();
        for (const card of cardSet.results) {
            await addPokemonByUrl(card.url);
        }
    } catch (error) {
        console.error("fetch-fehler");
        const container = document.getElementById("mainContent");
        if (container) {
            container.innerHTML = "<p>SCHEIß SERVER</p>";
        }
    }

    renderGalaray();
    endLoadingScreen();
}

async function loadMore() {
    currentOffset += 20;
    await getCharacters();
}

function renderGalaray() {
    const myCardDiv = document.getElementById("mainContent");
    if (!myCardDiv) return;

    myCardDiv.innerHTML = "";
    currentDisplayedPokemon = [];

    for (const index of mainCollectionIndices) {
        const galleryData = prepareGalleryData(myPokeDex[index], index);
        myCardDiv.innerHTML += getHtmlForGalaryObject(galleryData);
        currentDisplayedPokemon.push(index);
    }
}

async function dexSearch() {
    const searchInput = document.getElementById("searchBar").value.toLowerCase().trim();
    const myCardDiv = document.getElementById("mainContent");

    if (searchInput.length > 0 && searchInput.length < 3) {
        myCardDiv.innerHTML = "<p class='searchError'>Bitte mindestens 3 Buchstaben eingeben.</p>";
        return;
    }

    if (searchInput.length === 0) {
        resetSearch();
        return;
    }

    startLoadingScreen();
    myCardDiv.innerHTML = "";
    currentDisplayedPokemon = [];
    await searchAndRenderMatches(searchInput, myCardDiv);
}

async function searchAndRenderMatches(searchInput, myCardDiv) {
    const matches = allPokemonList.filter(p => p.name.includes(searchInput)).slice(0, 30);

    if (matches.length === 0) {
        showNoSearchResults();
        endLoadingScreen();
        return;
    }

    for (const match of matches) {
        const index = await ensurePokemonInDex(match);
        if (index === -1) continue;
        const galleryData = prepareGalleryData(myPokeDex[index], index);
        myCardDiv.innerHTML += getHtmlForGalaryObject(galleryData);
        currentDisplayedPokemon.push(index);
    }

    document.getElementById("loadMoreBtn").classList.add("hidden");
    document.getElementById("resetSearchBtn").classList.remove("hidden");
    endLoadingScreen();
}

async function ensurePokemonInDex(match) {
    const existingIndex = myPokeDex.findIndex(p => p.name === match.name);
    if (existingIndex !== -1) return existingIndex;

    try {
        const detailJson = await fetchPokemonDetails(match.url);
        myPokeDex.push(detailJson);
        return myPokeDex.length - 1;
    } catch (e) {
        console.error("Error fetching details for " + match.name);
        return -1;
    }
}

function showNoSearchResults() {
    document.getElementById("mainContent").innerHTML = `
        <div class="noResultsContainer">
            <img src="./assets/images/Pokedex_Logo.png" alt="No Pokemon Found">
            <h2>Keine Pokémon gefunden!</h2>
            <p>Versuch es mit einem anderen Namen.</p>
        </div>`;
    document.getElementById("loadMoreBtn").classList.add("hidden");
    document.getElementById("resetSearchBtn").classList.remove("hidden");
}

function resetSearch() {
    document.getElementById("searchBar").value = "";
    document.getElementById("loadMoreBtn").classList.remove("hidden");
    document.getElementById("resetSearchBtn").classList.add("hidden");
    renderGalaray();
}

function startLoadingScreen() {
    spinner.classList.remove("hidden");
    document.body.style.overflow = 'hidden';
}

function endLoadingScreen() {
    spinner.classList.add("hidden");
    document.body.style.overflow = 'auto';
}
