const inputEl = document.getElementById("input");
const infoText = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEL = document.getElementById("audio");

async function fetchAPI(word){

    try {
        infoText.style.display = "block";
        meaningContainer.style.display = "none";

        infoText.innerText =`Searching the meaning of "${word}"`;

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json());

        if(result.title){
            titleEl.innerText = word;
            meaningEl.innerText = "N/A";
            audioEL.style.display = "none";
            meaningContainer.style.display = "block";
            infoText.style.display = "none";
        } else{
            infoText.style.display = "none";
            meaningContainer.style.display = "block";
            audioEL.style.display = "inline-flex";
            titleEl.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEL.src = result[0].phonetics[0].audio;
        }

    } catch (error) {
        console.log(error);
        infoText.innerText =`an error happened, try again later`;
    }
}

inputEl.addEventListener("keyup", (e) =>{
    if(e.target.value && e.key === "Enter"){
        fetchAPI(e.target.value);
    }
});