import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.quantity,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }
  calculateItemSummary() {
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    const itemQuantities = this.list.map((item) => item.quantity);
    let quatities = itemQuantities.reduce((sum, item) => sum + item);
    itemNumElement.innerText = quatities;
    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice * item.quantity);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = "$" + this.itemTotal;
  }
  calculateOrdertotal() {
    const itemQuantities = this.list.map((item) => item.quantity);
    let quatities = itemQuantities.reduce((sum, item) => sum + item);
    this.shipping = 10 + (quatities - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  }
  async checkout() {
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await services.checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
}
// export function GetShippingPrice() {
//     const cartPrice = localStorage.getItem("so-cart");

//     const cartItem = JSON.parse(cartPrice);

//     let shipping = 0;
//     cartItem.forEach(item => {
//         const price = item.quantity * 2 - 2 + 10;
//         shipping += price;
//     })

//     return shipping;
// }

// export function GetTax() {
//     const cartPrice = localStorage.getItem("so-cart");

//     const cartItem = JSON.parse(cartPrice);

//     let tax = 0;
//     cartItem.forEach(item => {
//         const price = item.FinalPrice * item.quantity;
//         tax += price;
//     })
//     tax * 0.06;
//     return tax;
// }
