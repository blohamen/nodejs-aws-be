import {mockProducts} from "../mocks/products";

export const getProductById = (id) => mockProducts.find(product => product.id === id);
