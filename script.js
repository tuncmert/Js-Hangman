const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetters_el=document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message2_el = document.getElementById('message');
const BtnPlayAgain = document.getElementById('play-again');
// const popupArea = document.getElementById('.popup');

function getRandomWord() {
    const words = ["javascript", "java", "python" ,"helloworld"];

    return words[Math.floor(Math.random() * words.length)];
}

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function displayWord() {

    word_el.innerHTML = `${selectedWord.split("").map(letter => `<div class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
            </div>`).join('')}`;
    // console.log(word_el.innerText.replace(/\n/g,''))

    const w = word_el.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        // popupArea.style.backgroundColor = 'green';
        message_el.innerText = ('Congratulations You Won!!')
    }
}
function updateWrongLetters() {
    wrongLetters_el.innerHTML =`
    ${wrongLetters.length>0?'<h3>Wrong Letters</h3>':''}
    ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `;

    items.forEach((item,index)=>{
        const errorCount =wrongLetters.length;
        if(index<errorCount){
            item.style.display="block";
        }else{
            item.style.display="none";
        }
    });

    if(wrongLetters.length === items.length){
        popup.style.display = 'flex';
        // popupArea.style.backgroundColor = 'red';
        message_el.innerText = ('Lost!!')
    }

}
function displayMessage(){
    message2_el.classList.add("show");
    
    setTimeout(function(){
        message2_el.classList.remove("show");
    },2000)
}

BtnPlayAgain.addEventListener('click',function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord =getRandomWord();

    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';
})

window.addEventListener('keydown', function (e) {

    if (e.keyCode >= 65 && e.keyCode <= 90) { // Letters A to Z

        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }else{
                displayMessage();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();

            }else{
                displayMessage();
            }
        }
    }
})

displayWord();