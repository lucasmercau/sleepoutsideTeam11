import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const productListing = new ProductList(category, dataSource, element);

const topProductsTitle = document.querySelector(".title");
const titleCategory = category.charAt(0).toUpperCase() + category.slice(1);
topProductsTitle.textContent += titleCategory;

productListing.init();