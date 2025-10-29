const container = document.querySelector(".container"),
    btnEl = document.querySelector(".btn");

btnEl.addEventListener("click",() => {
    imgNum = 10;
    addImages();
})

function addImages() {
    for(let index = 0; index < imgNum; index++){
        const newImg = document.createElement("img");
        newImg.src = `https://picsum.photos/200?random=${Math.floor(Math.random()*2000)}`;
        container.appendChild(newImg);
        // const html = `<img src="https://picsum.photos/200?random=${Math.floor(Math.random()*2000)}">`
        // container.innerHTML += html;
    }
    
}