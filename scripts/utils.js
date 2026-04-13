function capitalize(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function getBackgroundClasses(types) {
    if (!types || types.length === 0) return "split-bg";
    if (types.length === 1) {
        return `split-bg single-type bg-bg-${types[0].type.name}`;
    }
    return `split-bg bg-bg-${types[0].type.name} bg-bg2-${types[1].type.name}`;
}

function getPokemonName(pokemon) {
    return capitalize(pokemon.name);
}

function getPokemonImageUrl(pokemon) {
    return pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
}

function prepareStatsData(pokemon) {
    const statNames = ['hp', 'attack', 'defense', 'speed'];
    return statNames.map(name => {
        const stat = pokemon.stats.find(s => s.stat.name === name);
        return {
            name: capitalize(name),
            value: stat ? stat.base_stat : 0
        };
    });
}

function prepareAboutData(pokemon) {
    return {
        height: (pokemon.height / 10).toFixed(1),
        weight: (pokemon.weight / 10).toFixed(1),
        category: pokemon.types.map(t => capitalize(t.type.name)).join(', '),
        abilities: pokemon.abilities.map(a => capitalize(a.ability.name)).join(', ')
    };
}

function prepareGalleryData(pokemon, index) {
    return {
        id: pokemon.id,
        name: getPokemonName(pokemon),
        bgClasses: getBackgroundClasses(pokemon.types),
        imgUrl: getPokemonImageUrl(pokemon),
        typesHtml: getPokemonTypesHtml(pokemon.types),
        index: index
    };
}

function prepareDialogData(pokemon, currentArrayPosition, totalCount) {
    const aboutData = prepareAboutData(pokemon);
    const statsData = prepareStatsData(pokemon);
    
    return {
        id: pokemon.id,
        name: getPokemonName(pokemon),
        bgClasses: getBackgroundClasses(pokemon.types),
        imgUrl: getPokemonImageUrl(pokemon),
        typesHtml: getPokemonTypesHtml(pokemon.types),
        currentArrayPosition: currentArrayPosition,
        totalCount: totalCount,
        aboutHtml: getAboutHtml(aboutData),
        statsHtml: getStatsHtml(statsData)
    };
}
