const input = document.querySelector('#taskInput');
const addBtn = document.querySelector('#addBtn');
const list = document.querySelector('#taskList');

addBtn.addEventListener('click',() => {
    const insideVal = input.value.trim();
    if(!insideVal) return;

    const liEle = document.createElement('li');
    liEle.textContent = insideVal;

    liEle.addEventListener('click',() => {

        if(!liEle.querySelector('button')){
            const removebutton = document.createElement('button');
            removebutton.textContent = "REMOVE";
        
        
            removebutton.addEventListener('click',(e) => {
                e.stopPropagation();
                liEle.remove();
        });
        
        
        liEle.append(removebutton)
        }
        
    })

    list.appendChild(liEle)

    insideVal = "";
})