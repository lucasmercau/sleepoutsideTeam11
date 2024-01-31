import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";
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

let delIndex = ""; //declare a variable to store the index of the item to be deleted
const cartItems = getLocalStorage("so-cart"); // get cart content from localStorage and store in cartItems variable

document.addEventListener("click", function(event){
    if (event.target.classList.contains("deleteBtn")){
        let tagItem = event.target.id; //target the id of the clicked button which shares same id as product id
        cartItems.forEach((item)  => {
            if (item.id == tagItem){ //if the button id matches with product id
                delIndex = cartItems.findIndex((ele) => ele.id == tagItem) // get the index of item and assign it to earlier
                return delIndex;                                    //declared delIndex variable 
            }
        });
        cartItems.splice(delIndex, 1);      //use splice method to remove the product from the array
        localStorage.clear();            //clear the localstarage
        setLocalStorage("so-cart", cartItems);     //replace localstarage with the new cartItems array 
        window.location.reload();              // use location reload to display a fresh page.
    }
})