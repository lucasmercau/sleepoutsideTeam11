import { getLocalStorage, setLocalStorage } from "./utils.mjs"; // This script file will contain the code to dynamically produce the product detail pages.

function productDetailsTemplate(product) {
    console.log(product);
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Image || product.Images.PrimaryExtraLarge}"
        alt="${product.NameWithoutBrand}"
      />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
      ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div></section>`;
}


export default class ProductDetails {
    constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails("main");
        document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    }

    addToCart() {
        let cart = getLocalStorage("so-cart") || [];
        let isProductInCart = cart.some(item => item.Id === this.product.Id); //boolean to see if the product is in the array.
        if (isProductInCart) {
            const index = cart.findIndex(item => item.Id === this.product.Id); //Find the index where the quantity needs to be changed.
            cart[index].quantity += 1; //Adds to the quantity
        } else {
            this.product.quantity = 1; // Set quantity to 1
            cart.unshift(this.product);} // Add product to the array of cart
        setLocalStorage("so-cart", cart);
        // setLocalStorage("so-cart", this.product);
    }

    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
            "afterBegin",
            productDetailsTemplate(this.product)
        );
    }
}
  