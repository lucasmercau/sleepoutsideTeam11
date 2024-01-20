// This purpose of this script will be to generate a list of product cards in HTML from an array.
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }
    // renderList(list) {
    //     renderListWithTemplate(productCardTemplate, this.listElement, list);
    // }
    renderList(list) { // Stretch Activity Step 1
      let filteredList = this.showFourTents(list); // Stretch Activity Step 2
      const htmlStrings = filteredList.map(productCardTemplate);
      this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
    }
    showFourTents(list) { // Stretch Activity Step 2
        return list.filter(function(product){ return product.Id == "880RR" || product.Id == "985RF" || product.Id == "985PR" || product.Id == "344YJ"});
    } 
}

