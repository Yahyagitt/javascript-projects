const inputEl = document.querySelector('.input'),
    body = document.querySelector('body')

inputEl.addEventListener("input",() => {
    changeBg();
    saveBG();
})

inputEl.checked = JSON.parse(localStorage.getItem("mode"));
changeBg();

function changeBg() {
    if(inputEl.checked){
        body.style.backgroundImage = "url('../imgs/toggleOff.svg')";

    } else {
        body.style.backgroundImage = "url('../imgs/toggleOn.svg')";
    }
}

function saveBG(){
    localStorage.setItem("mode",
        JSON.stringify(inputEl.checked)
    );
}