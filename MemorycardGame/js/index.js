const section = document.querySelector("section");
const playerLivesCount = document.querySelector(".playerLivesCount");
let playerLives = 8;

playerLivesCount.textContent = playerLives;

const getData = () => [
  { imgSrc: "../imgs/jinwoo.jpg", name: "jinwoo" },
  { imgSrc: "../imgs/Lelouch.jpg", name: "Lelouch" },
  { imgSrc: "../imgs/Light.jpg", name: "Light" },
  { imgSrc: "../imgs/LiarGame.jpg", name: "LiarGame" },
  { imgSrc: "../imgs/Conan.jpg", name: "Conan" },
  { imgSrc: "../imgs/Naruto.jpg", name: "Naruto" },
  { imgSrc: "../imgs/Onepiece.jpg", name: "Onepiece" },
  { imgSrc: "../imgs/Sosuke.jpg", name: "Sosuke" },

  { imgSrc: "../imgs/jinwoo.jpg", name: "jinwoo" },
  { imgSrc: "../imgs/Lelouch.jpg", name: "Lelouch" },
  { imgSrc: "../imgs/Light.jpg", name: "Light" },
  { imgSrc: "../imgs/LiarGame.jpg", name: "LiarGame" },
  { imgSrc: "../imgs/Conan.jpg", name: "Conan" },
  { imgSrc: "../imgs/Naruto.jpg", name: "Naruto" },
  { imgSrc: "../imgs/Onepiece.jpg", name: "Onepiece" },
  { imgSrc: "../imgs/Sosuke.jpg", name: "Sosuke" },
];

const Randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

const checkCards = (e) => {
  const clickedCard = e.currentTarget;
  clickedCard.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');
  const toggleCards = document.querySelectorAll('.toggleCard');
  console.log(clickedCard)

  if(flippedCards.length === 2){
    if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
      console.log("match");
      setTimeout(() => {alert("MATCH!!!!!!!")},100);
      flippedCards.forEach(card =>{
        card.classList.remove('flipped');
        card.style.pointerEvents = "none";
      })
    } else {
      console.log("Wrong");
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        setTimeout(() => {card.classList.remove('toggleCard')},1000);
      });
      playerLives--;
      playerLivesCount.textContent = `${playerLives}`
      setTimeout(() => {
        if(playerLives === 0){
          Restart("Game Over!!");
        }
      },1000);
    }
  }
  setTimeout(() => {
    if(toggleCards.length === 16){
      Restart("You win!!");
    }
  },1000);
}


const CardGenerator = () => {
  const cardData = Randomize();
  cardData.forEach((item) => {
    const card = document.createElement("div"),
      face = document.createElement("img"),
      back = document.createElement("div");

    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle('toggleCard');
      checkCards(e);
    })
  });
};

const Restart = (text) => {
  cardData = Randomize();
  const cards = document.querySelectorAll('.card');
    faces = document.querySelectorAll('.face');
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard');
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute('name',item.name);
      section.style.pointerEvents="all";
    },1000)
    
  });
  playerLives = 8;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => {alert(text)},100);
};

CardGenerator();
