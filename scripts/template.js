function getPokemonTypesHtml(types) {
    return types
        .map(type => {
            const typeName = capitalize(type.type.name);
            return `<img class="typeIcon" src="./assets/type_styles_small/Type=${typeName}.svg" alt="${typeName}" />`;
        })
        .join('\n');
}

function getAboutHtml(aboutData) {
    return `
        <p>Height: <span>${aboutData.height} m</span></p>
        <p>Weight: <span>${aboutData.weight} kg</span></p>
        <p>Category: <span>${aboutData.category}</span></p>
        <p>Abilities: <span>${aboutData.abilities}</span></p>
    `;
}

function getStatsHtml(statsData) {
    return statsData.map(stat => `
        <div class="statRow">
            <span class="statName">${stat.name}:</span> 
            <progress value="${stat.value}" max="150"></progress> 
            <span>${stat.value}</span>
        </div>
    `).join('');
}

function getHtmlForGalaryObject(data) {
    return `
    <div class="itemCard" onclick="openDialog(${data.index})">
        <div class="cardHeader">
            <p>#${data.id} ${data.name}</p>
        </div>
        <div class="cardImg ${data.bgClasses}">
            <img src="${data.imgUrl}" alt="${data.name}">
        </div>
        <div class="elemntStyle">
            ${data.typesHtml}
        </div>
    </div>
    `;
}

function getHtmlForDialog(data) {
    return `
    <div class="dialogHeaderBg">
        <div class="cardHeader">
            <p>#${data.id} ${data.name}</p>
            <button class="closeXBtn" onclick="closeDialog()">X</button>
        </div>
        <div class="cardImg ${data.bgClasses}">
            <img src="${data.imgUrl}" alt="${data.name}">
        </div>
    </div>
    <div class="elemntStyleDialog">
        ${data.typesHtml}
    </div>
    <div class="cardMain">
        <div class="top">
            <button id="about" class="menuBtn" onclick="showTab('aboutContent')">About</button>
            <button id="stats" class="menuBtn" onclick="showTab('statsContent')">Stats</button>
        </div>
        <div id="bottom" class="bottom">
            <div id="aboutContent" class="contentMenu">
                ${data.aboutHtml}
            </div>
            <div id="statsContent" class="contentMenu" style="display: none;">
                ${data.statsHtml}
            </div>
            <div class="btnMenu">
                <button id="previousBtn" onclick="previousCard()"><img src="./assets/button/arrow_left.svg" alt="Previous"></button>
                <div id="pageNumber">Page: ${data.currentArrayPosition + 1}/${data.totalCount}</div>
                <button id="nextBtn" onclick="nextCard()"><img src="./assets/button/arrow_right.svg" alt="Next"></button>
            </div>
        </div>
    </div>
    `;
}
