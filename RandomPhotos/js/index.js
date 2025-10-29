const container = document.querySelector(".container");
const btnEl = document.querySelector(".btn");

btnEl.addEventListener("click",() => {
    imgNum = 10;
    getImgs();
})

function getImgs() {
    for(let index = 0; index < imgNum; index++){
        const newImg = document.createElement("img");
        newImg.src = `https://picsum.photos/200/300?random=${Math.floor(Math.random()*2000)}`;
        container.appendChild(newImg);

        // const html = `<img src="https://picsum.photos/200/300?random=${Math.floor(Math.random()*2000)}">`;
        // container.innerHTML += html
    }
}