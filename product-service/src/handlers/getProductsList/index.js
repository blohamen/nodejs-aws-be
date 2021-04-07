import {mockProducts} from "../../mocks/products";
import createResponse from "../../utils/createResponse";

export const getProductsList = async (event) => {
    return createResponse({body: mockProducts});
}
