import createResponse from "../../utils/createResponse";
import ProductService from "../../services/ProductService";
import {Product as ProductModel} from "../../models";

const productService = new ProductService(ProductModel);

export const getProductsList = async () => {
    try {
        console.log('Get all products');
        const allProducts = await productService.getAllProducts();

        return createResponse({body: allProducts});
    } catch (e) {
        console.log(e);
        return createResponse({statusCode: 500, body: {message: 'Internal server error'}});
    }
}
