import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const productListing = new ProductList(category, dataSource, element);

const topProductsTitle = document.querySelector(".title");
const titleCategory = category.charAt(0).toUpperCase() + category.slice(1);
topProductsTitle.textContent += titleCategory;

productListing.init();
