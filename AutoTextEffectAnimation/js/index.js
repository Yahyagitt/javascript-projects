const container = document.querySelector('.container');
    careers = ["Student", "WebDev" ,"Vibecoder", "Explorer"]
let careerIndex = 0;
let characIndex = 0;


function changeText() {
    characIndex++;
    container.innerHTML = `
    <h1>
    I am ${careers[careerIndex].slice(0,1) === "E" ? "an" : "a"} ${careers[careerIndex].slice(0,characIndex)}
    </h1>
    `;
    
    if(characIndex === careers[careerIndex].length){
        careerIndex++;
        characIndex = 0;
    }

    setTimeout(changeText,500);
    if(careerIndex === careers.length){
        careerIndex = 0;
    }
}

changeText();