let addBtn = document.querySelector('.addbtn');
let removeBtn = document.querySelector('.removebtn');
let modelbox = document.querySelector('.model-box');
let modeltextarea = document.querySelector('.model-textarea');
let maincont = document.querySelector('.main-cont');
let priorityColorAll = document.querySelectorAll('.priorityColor');

let addBtnFlag = false;
let removeBtnFlag = false;
let lockBtnFlag = true;
let lockBtnClass = 'fa-lock';
let unlockBtnClass = 'fa-unlock';

let colors = ['lightpink' , 'lightblue' , 'lightgreen' , 'black']
let priorityColor = colors[colors.length-1];




priorityColorAll.forEach((priorityColorElem)=>{
    priorityColorElem.addEventListener('click', (e)=>{
        priorityColorAll.forEach((prioElem)=>{
            prioElem.classList.remove('border');
        })
        priorityColorElem.classList.add('border');
        priorityColor = priorityColorElem.classList[0];
    })
    
})


addBtn.addEventListener('click' , (e)=>{
    if(addBtnFlag){
       addBtn.style.backgroundColor = "#06182c";
       modelbox.style.display = 'flex';
    }else {
        addBtn.style.backgroundColor = "rgb(42, 63, 84)";
        modelbox.style.display = 'none';
    }
    addBtnFlag = !addBtnFlag;
})

removeBtn.addEventListener('click' , (e)=>{
    removeBtnFlag = !removeBtnFlag;
    if(removeBtnFlag){
        removeBtn.style.backgroundColor = "#06182c";
    }else {
        removeBtn.style.backgroundColor = "rgb(42, 63, 84)";
    }

    
})

function handleRemove(ticket) {
    ticket.addEventListener('click' , (e)=>{
        if(removeBtnFlag){
            ticket.remove();
        }
    })
}

modelbox.addEventListener('keydown', (e)=>{
    let key = e.key;
    if(key === 'Shift'){
        let modeltextareaValue = modeltextarea.value;
        createTicket(priorityColor , shortid() , modeltextareaValue);
        addBtn.style.backgroundColor = "rgb(42, 63, 84)";
        modelbox.style.display = 'none';
        addBtnFlag = false;
        modeltextarea.value = '';
    }
})

function createTicket(ticketColor , ticketId , ticketText){
    let ticket = document.createElement('div');
    ticket.classList.add('ticket');
    ticket.innerHTML = 
    `<div class="ticket">
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${ticketId}</div>
        <div class="ticket-text">${ticketText}</div>
        <div class="ticket-lock">
            <i class="fas fa-lock"></i>
        </div>
    </div>`

    maincont.appendChild(ticket);
    handleRemove(ticket);
    handleLockBtn(ticket);
    
}


function handleLockBtn(ticket) {
        let lockBtnCont = ticket.querySelector('.ticket-lock');
        let taskarea = ticket.querySelector('.ticket-text');

        lockBtnCont.addEventListener('click' , (e)=>{
            let lockIco = lockBtnCont.children[0];
            if(lockBtnFlag){
                lockIco.classList.add(lockBtnClass);
                lockIco.classList.remove(unlockBtnClass);
                lockIco.style.color = 'black';
                taskarea.contentEditable = false;
            }else{
                lockIco.classList.add(unlockBtnClass);
                lockIco.classList.remove(lockBtnClass);
                lockIco.style.color = 'green';
                taskarea.contentEditable = true;

            }
            lockBtnFlag = !lockBtnFlag;
        })
}


