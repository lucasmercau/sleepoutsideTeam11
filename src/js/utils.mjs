// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// helper to get parameter strings
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// function to take a list of objects and a template and insert the objects as HTML into the DOM
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderWithTemplate(templateFn, parentElement, data, callback) {
  
  parentElement.insertAdjacentHTML("afterbegin", templateFn);
  if (callback){
    callback(data);
  }
}

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../partials/header.html");
const footerTemplate = await loadTemplate("../partials/footer.html");
const headerElement = document.querySelector("#main-header");
const footerElement = document.querySelector("#main-footer");
renderWithTemplate(headerTemplate, headerElement);
renderWithTemplate(footerTemplate, footerElement);

}

async function loadTemplate(path){
  const response = await fetch(path);
  const template = await response.text();
  return template;
}