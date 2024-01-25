const btn = document.querySelector("#btn");
// const btnLocal = document.querySelector("#btn-local");
const input = document.querySelector("#task");
const list = document.querySelector("#list");
const alert = document.querySelector("#alert");
const alertFunction = (title, message) => `
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>${title}</strong> ${message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;
// btnLocal.addEventListener("click", function () {
//   localStorage.clear();
// });

document.addEventListener("DOMContentLoaded", function () {
  loadList();
});

function loadList() {
  const storedList = localStorage.getItem("myList");
  if (storedList) {
    list.innerHTML = storedList;
  }
}

function saveList() {
  localStorage.setItem("myList", list.innerHTML);
}

function addClick() {
  btn.addEventListener("click", function () {
    let inputValue = input.value;
    if (inputValue == "" || inputValue == null) {
      alert.innerHTML = alertFunction(
        "Boş bilgi girdiniz",
        "Tekrar deneyiniz.."
      );
    } else if (!isVar(inputValue)) {
      let newLi = document.createElement("li");
      newLi.innerHTML = `
      
                <span>${inputValue}</span>
                <i class="fas fa-trash delete-icon" onclick="deleteTask(this)"></i>
            `;
      list.appendChild(newLi);
      saveList();
    } else {
      alert.innerHTML = alertFunction(
        "Aynı değeri girdiniz",
        "Başka bir şey deneyin"
      );
    }
  });
}

function isVar(value) {
  const allSpans = list.querySelectorAll("span");
  for (const span of allSpans) {
    if (span.textContent === value) {
      return true;
    }
  }
  return false;
}

list.addEventListener("click", function (event) {
  console.log(event.target.tagName);
  if (event.target.tagName == "LI") {
    event.target.classList.toggle("checked");
  } else if (event.target.tagName == "I") {
    event.target.classList.toggle("span");
  }
});

function deleteTask(deleteIcon) {
  const taskItem = deleteIcon.parentElement;
  list.removeChild(taskItem);
  saveList();
  alert.innerHTML = alertFunction("Görev SİLİNDİ", "Başka eklemek ister misin");
}


addClick();
