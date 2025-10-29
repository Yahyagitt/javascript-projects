const container = document.querySelector('.container');
    about = ["Student", "WebDev", "VibeCoder", "Explorer"];


let abtIndex = 0;
let charIndex = 0;

function changeText() {
    charIndex++;
    container.innerHTML = `
    <h2>I am ${about[abtIndex].slice(0,1) === "E" ? "an":"a"} ${about[abtIndex].slice(0,charIndex)}</h2>
    `
    if(charIndex === about[abtIndex].length){
        abtIndex++;
        charIndex = 0;
    }

    if(abtIndex === about.length){
        charIndex = 0;
        abtIndex = 0;
    }
    setTimeout(changeText, 500);
}

changeText();