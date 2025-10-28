let count = 0;

const countEle = document.getElementById('count');
const incBtn = document.querySelector('#increase');
const decBtn = document.getElementById('decrease');

incBtn.addEventListener('click',() => {
    count++;
    countEle.textContent = count;
});

decBtn.addEventListener('click',() => {
    count--;
    countEle.innerHTML = count;
});
