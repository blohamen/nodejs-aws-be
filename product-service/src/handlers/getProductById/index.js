import {getProductById as getProductByIdService} from "../../services/products";
import createResponse from "../../utils/createResponse";

export const getProductById = async (event) => {
    const id = event && event.pathParameters && event.pathParameters.id;
    const product = getProductByIdService(id);

    if (!id || typeof id !== 'string') {
        return createResponse({statusCode: 400, body: {message: 'Id is not provided'}});
    }

    if (!product) {
        return createResponse({statusCode: 404, body: {message: 'Product not found'}});
    }

    return createResponse({body: product});
}
