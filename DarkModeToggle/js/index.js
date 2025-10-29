const inputEl = document.querySelector('.input'),
    body = document.querySelector('body');

inputEl.addEventListener("input", () => {
    changeBG();
    saveBG();
})

inputEl.checked = JSON.parse(localStorage.getItem("mode")) || false;
changeBG();

function changeBG() {
    if(inputEl.checked){
        body.style.backgroundImage = "url('../imgs/toggleOn.svg')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";

    } else {
        body.style.backgroundImage = "url('../imgs/toggleOff.svg')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";

    }
}

function saveBG() {
    localStorage.setItem("mode",
        JSON.stringify(inputEl.checked)
    );
}