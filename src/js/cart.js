import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();

const showTotal = getLocalStorage("so-cart");
if (showTotal.length !== 0) {
    // show our checkout button and total if there are items in the cart.
    document.querySelector(".cart-footer").classList.remove("hide");
    const cartPrice = localStorage.getItem("so-cart");

    const cartItem = JSON.parse(cartPrice);

    let totalPrice = 0;
    cartItem.forEach(item => {
        const price = item.FinalPrice * item.quantity;
        totalPrice += price;
    })

    document.querySelector(".cart-total").textContent += ` $${totalPrice.toFixed(2)}`;
}



let delIndex = ""; //declare a variable to store the index of the item to be deleted
const cartItems = getLocalStorage("so-cart"); // get cart content from localStorage and store in cartItems variable

document.addEventListener("click", function(event){
    if (event.target.classList.contains("deleteBtn")){
        let tagItem = event.target.id; //target the id of the clicked button which shares same id as product id
        const newItems = cartItems.filter(function(product){ return product.Id != tagItem});         
        setLocalStorage("so-cart", newItems);     //replace localstarage with the new cartItems array 
        window.location.reload();              // use location reload to display a fresh page.
    }
})