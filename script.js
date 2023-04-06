let addBtn = document.querySelector(".addbtn");
let removeBtn = document.querySelector(".removebtn");
let modelbox = document.querySelector(".model-box");
let modeltextarea = document.querySelector(".model-textarea");
let maincont = document.querySelector(".main-cont");
let priorityColorAll = document.querySelectorAll(".priorityColor");

const allTicketsArr = [];
let selectCont = document.querySelectorAll(".filter-btn");
let selectedColor;
for (let i = 0; i < selectCont.length; i++) {
  selectCont[i].addEventListener("click", (e) => {
    selectedColor = selectCont[i].classList[0];
    const filteredArr = allTicketsArr.filter((ticket) => {
      return selectedColor === ticket.ticketColor;
    });

    let tickets = document.querySelectorAll(".ticket");
    tickets.forEach((ticket) => {
      ticket.remove();
    });

    filteredArr.forEach((ticket) => {
      createTicket(ticket.ticketColor, ticket.ticketText, ticket.ticketId);
    });
  });

  selectCont[i].addEventListener("dblclick", (e) => {
    let tickets = document.querySelectorAll(".ticket");
    tickets.forEach((ticket) => {
      ticket.remove();
    });

    allTicketsArr.forEach((ticket) => {
      createTicket(ticket.ticketColor, ticket.ticketText, ticket.ticketId);
    });
  });
}

let addBtnFlag = false;
let removeBtnFlag = false;
let lockBtnFlag = true;
let lockBtnClass = "fa-lock";
let unlockBtnClass = "fa-unlock";

const colors = ["lightpink", "lightgreen", "lightblue", "black"];
let priorityColor = colors[colors.length - 1];

priorityColorAll.forEach((priorityColorElem) => {
  priorityColorElem.addEventListener("click", (e) => {
    priorityColorAll.forEach((prioElem) => {
      prioElem.classList.remove("border");
    });
    priorityColorElem.classList.add("border");
    priorityColor = priorityColorElem.classList[0];
  });
});

addBtn.addEventListener("click", (e) => {
  if (addBtnFlag) {
    addBtn.style.backgroundColor = "#06182c";
    modelbox.style.display = "flex";
  } else {
    addBtn.style.backgroundColor = "rgb(42, 63, 84)";
    modelbox.style.display = "none";
  }
  addBtnFlag = !addBtnFlag;
});

removeBtn.addEventListener("click", (e) => {
  removeBtnFlag = !removeBtnFlag;
  if (removeBtnFlag) {
    removeBtn.style.backgroundColor = "#06182c";
  } else {
    removeBtn.style.backgroundColor = "rgb(42, 63, 84)";
  }
});

function handleRemove(ticket) {
  ticket.addEventListener("click", (e) => {
    if (removeBtnFlag) {
      ticket.remove();
    }
  });
}

modelbox.addEventListener("keydown", (e) => {
  let key = e.key;
  if (key === "Shift") {
    let modeltextareaValue = modeltextarea.value;
    createTicket(priorityColor, modeltextareaValue);
    addBtn.style.backgroundColor = "rgb(42, 63, 84)";
    addBtnFlag = false;
    setModalDefault();
  }
});

function createTicket(ticketColor, ticketText, ticketId) {
  let id = ticketId || shortid();
  let ticket = document.createElement("div");
  ticket.classList.add("ticket");
  ticket.innerHTML = `<div class="ticket">
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${id}</div>
        <div class="ticket-text">${ticketText}</div>
        <div class="ticket-lock">
            <i class="fas fa-lock"></i>
        </div>
    </div>`;

  if (!ticketId) {
    allTicketsArr.push({
      ticketColor,
      ticketText,
      ticketId: id,
    });
  }

  maincont.appendChild(ticket);
  handleRemove(ticket);
  handleLockBtn(ticket);
  handleColors(ticket);
}

function handleLockBtn(ticket) {
  let lockBtnCont = ticket.querySelector(".ticket-lock");
  let taskarea = ticket.querySelector(".ticket-text");

  lockBtnCont.addEventListener("click", (e) => {
    let lockIco = lockBtnCont.children[0];
    if (lockBtnFlag) {
      lockIco.classList.add(lockBtnClass);
      lockIco.classList.remove(unlockBtnClass);
      lockIco.style.color = "black";
      taskarea.contentEditable = false;
    } else {
      lockIco.classList.add(unlockBtnClass);
      lockIco.classList.remove(lockBtnClass);
      lockIco.style.color = "green";
      taskarea.contentEditable = true;
    }
    lockBtnFlag = !lockBtnFlag;
  });
}

function handleColors(ticket) {
  let colCont = ticket.querySelector(".ticket-color");
  colCont.addEventListener("click", (e) => {
    let currcolor = colCont.classList[1];
    let currcolorIdx = colors.findIndex((color) => {
      return color === currcolor;
    });

    currcolorIdx++;
    let newcolIdx = currcolorIdx % colors.length;
    let newColor = colors[newcolIdx];

    colCont.classList.remove(currcolor);
    colCont.classList.add(newColor);
  });
}

function setModalDefault() {
  modelbox.style.display = "none";
  modeltextarea.value = "";
  priorityColor = colors[colors.length - 1];
  priorityColorAll.forEach((prioElem) => {
    prioElem.classList.remove("border");
  });
  priorityColorAll[priorityColorAll.length - 1].classList.add("border");
}
