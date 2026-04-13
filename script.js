let myPokeDex = [];
let mainCollectionIndices = [];
let currentDisplayedPokemon = [];
let currentImage = 0;
let myPhotoDiv = document.getElementById("mainContent");
let currentOffset = 0;
const spinner = document.getElementById("spinnerContainer");


let allPokemonList = [];

async function init(){
    await getAllPokemonList();
    await getCharacters();
    renderGalaray ();
}

async function getAllPokemonList() {
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000");
        let data = await response.json();
        allPokemonList = data.results;
    } catch(e) {
        console.error("error fetching all pokemon names", e);
    }
}



async function getCharacters(){
    startLoadingScreen();
    try{
        const pokeCard =  await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`);
        let cardSet=  await pokeCard.json();
        console.log(pokeCard);
        for(let i = 0; i< cardSet.results.length; i++){
            
            const pokeCardDetails =  await fetch(cardSet.results[i].url);
            let pokeCardDetailsJson =  await pokeCardDetails.json();
            myPokeDex.push(pokeCardDetailsJson);
            mainCollectionIndices.push(myPokeDex.length - 1);
        }
    }
    catch(error){
        console.error("fetch-fehler");
        let container = document.getElementById("mainContent");
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

function renderGalaray(){
    let myCardDiv = document.getElementById("mainContent");
    if (!myCardDiv) return;
    
    myCardDiv.innerHTML = "";
    currentDisplayedPokemon = []; 
    
    for( let i = 0; i < mainCollectionIndices.length; i++){
        let index = mainCollectionIndices[i];
        myCardDiv.innerHTML += getHtmlForGalaryObject(index); 
        currentDisplayedPokemon.push(index); 
    }
}

async function dexSearch(){
    let searchbar = document.getElementById("searchBar");
    let searchInput = searchbar.value.toLowerCase().trim();
    let myCardDiv = document.getElementById("mainContent");
    
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

    let matches = allPokemonList.filter(p => p.name.includes(searchInput)).slice(0, 30);

    if (matches.length === 0) {
        myCardDiv.innerHTML = `
        <div class="noResultsContainer">
            <img src="./assets/images/Pokedex_Logo.png" alt="No Pokemon Found">
            <h2>Keine Pokémon gefunden!</h2>
            <p>Versuch es mit einem anderen Namen.</p>
        </div>`;
        document.getElementById("loadMoreBtn").classList.add("hidden");
        document.getElementById("resetSearchBtn").classList.remove("hidden");
        endLoadingScreen();
        return;
    }

    for (let i = 0; i < matches.length; i++) {
        let match = matches[i];
        // Check if already in myPokeDex
        let existingIndex = myPokeDex.findIndex(p => p.name === match.name);
        
        if (existingIndex === -1) {
            try {
                let detailRes = await fetch(match.url);
                let detailJson = await detailRes.json();
                myPokeDex.push(detailJson);
                existingIndex = myPokeDex.length - 1;
            } catch(e) {
                console.error("Error fetching details for " + match.name);
                continue;
            }
        }
        
        myCardDiv.innerHTML += getHtmlForGalaryObject(existingIndex);
        currentDisplayedPokemon.push(existingIndex);
    }
    
    document.getElementById("loadMoreBtn").classList.add("hidden");
    document.getElementById("resetSearchBtn").classList.remove("hidden");
    endLoadingScreen();
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
    