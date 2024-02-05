import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const register = document.querySelector(".register-box");
const closeBtn = document.querySelector("#close");

let countVisit = getLocalStorage("ls-count") || 0;

if (countVisit < 1) {
  displayForm();
}
countVisit++;
setLocalStorage("ls-count", countVisit);

function displayForm() {
  register.classList.add("show-register");
}

closeBtn.addEventListener("click", () => {
  register.classList.add("hide");
  register.classList.remove("show-register");
});
