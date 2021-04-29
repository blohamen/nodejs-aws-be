import ProductService from "../../services/ProductService";
import {Product as ProductModel} from '../../models';
import createResponse from "../../utils/createResponse";

const productService = new ProductService(ProductModel);

export const getProductById = async (event) => {
    try {
        const id = event && event.pathParameters && event.pathParameters.id;

        console.log('Income request getProductById with id: ', id);

        if (!id || typeof id !== 'string') {
            return createResponse({statusCode: 400, body: {message: 'Id is not provided'}});
        }

        const product = await productService.getProductById(id);

        console.log('Return product: ', product);

        if (!product) {
            return createResponse({statusCode: 404, body: {message: 'Product not found'}});
        }

        return createResponse({body: product});
    } catch (e) {
        console.log(e);
        return createResponse({statusCode: 500, body: {message: 'Internal server error'}});
    }
}
