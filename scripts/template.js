function getBackgroundClasses(types) {
    if (types.length === 1) {
        return `split-bg single-type bg-bg-${types[0].type.name}`;
    } else {
        return `split-bg bg-bg-${types[0].type.name} bg-bg2-${types[1].type.name}`;
    }
}

function getHtmlForGalaryObject(i){
    const pokemon = myPokeDex[i];
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id;
    const imgUrl = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
    const bgClasses = getBackgroundClasses(pokemon.types);
    
    let typesHtml = '';
    for (let j = 0; j < pokemon.types.length; j++) {
        let typeNameUpper = pokemon.types[j].type.name.charAt(0).toUpperCase() + pokemon.types[j].type.name.slice(1);
        typesHtml += `<img class="typeIcon" src="./assets/type_styles_small/Type=${typeNameUpper}.svg" alt="${typeNameUpper}" />\n`;
    }

    return `
    <div class="itemCard" onclick="openDialog(${i})">
        <div class="cardHeader">
            <p>#${id} ${name}</p>
        </div>
        <div class="cardImg ${bgClasses}">
            <img src="${imgUrl}" alt="${name}">
        </div>
        <div class="elemntStyle">
            ${typesHtml}
        </div>
    </div>
    `;
}

function getHtmlForDialog(i){
    const pokemon = myPokeDex[i];
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id;
    const imgUrl = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
    const bgClasses = getBackgroundClasses(pokemon.types);
    
    let typesHtml = '';
    for (let j = 0; j < pokemon.types.length; j++) {
        let typeNameUpper = pokemon.types[j].type.name.charAt(0).toUpperCase() + pokemon.types[j].type.name.slice(1);
        typesHtml += `<img class="typeIcon" src="./assets/type_styles_small/Type=${typeNameUpper}.svg" alt="${typeNameUpper}" />\n`;
    }
    
    // About
    const heightMeters = (pokemon.height / 10).toFixed(1);
    const weightKg = (pokemon.weight / 10).toFixed(1);
    const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
    const category = pokemon.types.map(t => t.type.name).join(', '); 
    
    // Stats
    const hp = pokemon.stats.find(s => s.stat.name === 'hp').base_stat;
    const attack = pokemon.stats.find(s => s.stat.name === 'attack').base_stat;
    const defense = pokemon.stats.find(s => s.stat.name === 'defense').base_stat;
    const speed = pokemon.stats.find(s => s.stat.name === 'speed').base_stat;
    
    return `
    <div class="dialogHeaderBg">
        <div class="cardHeader">
            <p>#${id} ${name}</p>
            <button class="closeXBtn" onclick="closeDialog()">X</button>
        </div>
        <div class="cardImg ${bgClasses}">
            <img src="${imgUrl}" alt="${name}">
        </div>
    </div>
    <div class="elemntStyleDialog">
        ${typesHtml}
    </div>
    <div class="cardMain">
        <div class="top">
            <button id="about" class="menuBtn" onclick="showTab('aboutContent')">About</button>
            <button id="stats" class="menuBtn" onclick="showTab('statsContent')">Stats</button>
            <button id="evolution" class="menuBtn" onclick="showTab('evolutionContent')">Evolution</button>
        </div>
        <div id="bottom" class="bottom">
            <div id="aboutContent" class="contentMenu">
                <p>Height: <span>${heightMeters} m</span></p>
                <p>Weight: <span>${weightKg} kg</span></p>
                <p>Category: <span>${category}</span></p>
                <p>Abilities: <span>${abilities}</span></p>
            </div>
            <div id="statsContent" class="contentMenu" style="display: none;">
                <div class="statRow"><span class="statName">HP:</span> <progress value="${hp}" max="150"></progress> <span>${hp}</span></div>
                <div class="statRow"><span class="statName">Attack:</span> <progress value="${attack}" max="150"></progress> <span>${attack}</span></div>
                <div class="statRow"><span class="statName">Defense:</span> <progress value="${defense}" max="150"></progress> <span>${defense}</span></div>
                <div class="statRow"><span class="statName">Speed:</span> <progress value="${speed}" max="150"></progress> <span>${speed}</span></div>
            </div>
            <div id="evolutionContent" class="contentMenu" style="display: none;">
                <img src="" alt="" srcset="">
            </div>
            <div class="btnMenu">
                <button id="previousBtn" onclick="previousCard()"><img src="./assets/button/arrow_left.svg" alt="Previous"></button>
                <div id="pageNumber">Page: ${currentArrayPosition + 1}/${currentDisplayedPokemon.length}</div>
                <button id="nextBtn" onclick="nextCard()"><img src="./assets/button/arrow_right.svg" alt="Next"></button>
            </div>
        </div>
    </div>
    `;
}