import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { qs, setClick } from "./utils.mjs";


function deleteItem() {
    let cart = Array.from(getLocalStorage("so-cart"));
    cart = cart.filter(item.Id !== qs("#data-id"));
    setLocalStorage("so-cart", cart);
}
setClick(qs(".deleteBtn"), deleteItem)