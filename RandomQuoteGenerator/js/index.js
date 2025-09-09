// https://dummyjson.com/quotes/random

const quoteEl = document.querySelector('.quote');
const authorEl = document.querySelector('.author');
const newQuoteBtn = document.querySelector('.new-quote-btn');
const twitterBtn = document.querySelector('.twt-button');
const saveQuoteBtn = document.querySelector('.save-quote-btn');
const cartList = document.querySelector('#quoteCart');


async function getQuote() {
    try{
        quoteEl.textContent = "Loading.....";
        authorEl.textContent = "";

        const res = await fetch("https://dummyjson.com/quotes/random");
        const data = await res.json();

        quoteEl.textContent =  data.quote;
        authorEl.textContent = "~" + data.author;

        setTweetBtnHref(data.quote, data.author);
    }catch(error){
        console.error("Error occured: ",error);
        quoteEl.textContent = "Oops! Something went wrong. ";
        authorEl.textContent = "";
    }
}

//Save Quote
saveQuoteBtn.addEventListener('click',() => {
    const quote = quoteEl.textContent;
    const author = authorEl.textContent;

    const li = document.createElement("li");
    li.textContent = `"~${quote}" - ${author}}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.addEventListener("click",() => {
        li.remove();
    });

    li.appendChild(removeBtn);
    cartList.appendChild(li);

})



//Twitter function

function setTweetBtnHref(quote, author){
    const twtTxt = `"~${quote}" - ${author}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twtTxt)}`;
    twitterBtn.setAttribute('href',url);
}

newQuoteBtn.addEventListener('click',getQuote);

getQuote();
