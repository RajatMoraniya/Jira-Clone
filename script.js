let addBtn = document.querySelector(".addbtn");
let removeBtn = document.querySelector(".removebtn");
let modelbox = document.querySelector(".model-box");
let modeltextarea = document.querySelector(".model-textarea");
let maincont = document.querySelector(".main-cont");
let priorityColorAll = document.querySelectorAll(".priorityColor");


let addBtnFlag = false;
let removeBtnFlag = false;
let lockBtnFlag = true;
let lockBtnClass = "fa-lock";
let unlockBtnClass = "fa-unlock";

const colors = ["lightpink", "lightgreen", "lightblue", "black"];
let priorityColor = colors[colors.length - 1];


let allTicketsArr = [];
let selectCont = document.querySelectorAll(".filter-btn");
let selectedColor;

if (allTicketsArr.length <= 0) {
  allTicketsArr = JSON.parse(localStorage.getItem("Jira_DB"));
  allTicketsArr.forEach((ticket) => {
    createTicket(ticket.ticketColor, ticket.ticketText, ticket.ticketId);
  });
}

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

function handleRemove(ticket, id) {
  let idx = getIndex(id);
  ticket.addEventListener("click", (e) => {
    if (removeBtnFlag) {
      ticket.remove();
      allTicketsArr.splice(idx, 1);
      localStorage.setItem("Jira_DB", JSON.stringify(allTicketsArr));
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

    localStorage.setItem("Jira_DB", JSON.stringify(allTicketsArr));
  }

  maincont.appendChild(ticket);
  handleRemove(ticket, id);
  handleLockBtn(ticket, id);
  handleColors(ticket, id);
}

function handleLockBtn(ticket, id) {
  let lockBtnCont = ticket.querySelector(".ticket-lock");
  let taskarea = ticket.querySelector(".ticket-text");
  let lockIco = lockBtnCont.children[0];

  lockIco.addEventListener("click", (e) => {
    let idx = getIndex(id);
    if (lockIco.classList.contains(unlockBtnClass)) {
      lockIco.classList.add(lockBtnClass);
      lockIco.classList.remove(unlockBtnClass);
      lockIco.style.color = "black";
      taskarea.contentEditable = false;
    } else {
      taskarea.contentEditable = true;
      lockIco.style.color = "green";
      lockIco.classList.add(unlockBtnClass);
      lockIco.classList.remove(lockBtnClass);

    }
    lockBtnFlag = !lockBtnFlag;
    allTicketsArr[idx].ticketText = taskarea.innerText;
    localStorage.setItem("Jira_DB", JSON.stringify(allTicketsArr));
  });
}

function handleColors(ticket, id) {
  let colCont = ticket.querySelector(".ticket-color");
  colCont.addEventListener("click", (e) => {
    let idx = getIndex(id);
    let currcolor = colCont.classList[1];
    let currcolorIdx = colors.findIndex((color) => {
      return color === currcolor;
    });

    currcolorIdx++;
    let newcolIdx = currcolorIdx % colors.length;
    let newColor = colors[newcolIdx];

    colCont.classList.remove(currcolor);
    colCont.classList.add(newColor);

    allTicketsArr[idx].ticketColor = newColor;
    localStorage.setItem("Jira_DB", JSON.stringify(allTicketsArr));
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

function getIndex(id) {
  allTicketsArr.findIndex((ticket) => {
    return ticket.ticketID === id;
  });
}
