let myDialogContent = document.getElementById("dialogContent");
let myDialogOpener = document.getElementById("dialogFunction");
let currentArrayPosition = 0;

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = '';
}

function openDialog(i){  
    currentCard = i; 
    
    for (let j = 0; j < currentDisplayedPokemon.length; j++) {
        if (currentDisplayedPokemon[j] === i) {
            currentArrayPosition = j;
        }
    }
    
    myDialogContent.innerHTML = getHtmlForDialog(i);
    if (!myDialogOpener.open) {
        myDialogOpener.showModal();
    }
    disableScroll();
}

function closeDialog(){
    myDialogOpener.close();
    enableScroll();
} 

function protectionCloseDialog(event){
    event.stopPropagation();
}

function nextCard(){
    currentArrayPosition = currentArrayPosition + 1; 

    if(currentArrayPosition >= currentDisplayedPokemon.length){
        currentArrayPosition = 0; 
    }
    
    let nextIndex = currentDisplayedPokemon[currentArrayPosition];
    openDialog(nextIndex);
}

function previousCard(){
    currentArrayPosition = currentArrayPosition - 1; 
    
    if(currentArrayPosition < 0 ){
        currentArrayPosition = currentDisplayedPokemon.length - 1; 
    }
    
    let previousIndex = currentDisplayedPokemon[currentArrayPosition];
    openDialog(previousIndex);
}

function showTab(tabId) {
    document.getElementById('aboutContent').style.display = 'none';
    document.getElementById('statsContent').style.display = 'none';
    document.getElementById('evolutionContent').style.display = 'none';
    document.getElementById(tabId).style.display = 'block';
}