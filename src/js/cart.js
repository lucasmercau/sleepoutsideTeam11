import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();


// document.addEventListener("click", function(event){
//   if (event.target.classList.contains("deleteBtn")){
//     const itemid = event.target.getAttribute("data-id");
//     removeItem(itemid);
//   }
// })

// function removeItem(itemid){
//   let cart = getLocalStorage("so-cart");
//   cart = cart.filter(x => x.Id !== itemid);
//   localStorage.setItem("so-cart", JSON.stringify(cart));
//   renderCartContents();
// }