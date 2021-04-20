import {getProductById} from "./index";
import {mockProducts} from "../../mocks/products";

const id = '7567ec4b-b10c-48c5-9345-fc73c48a80aa';
const wrongId = '123';
const mockEvent = {
    pathParameters: {
        id,
    }
}
const wrongEvent = {
    pathParameters: {
        id: wrongId,
    }
}

describe('getProductById', () => {
    it('should return product if correct id passed', async () => {
        const {body,statusCode} = await getProductById(mockEvent);
        const product = JSON.parse(body);
        expect(product).toStrictEqual(mockProducts[0]);
        expect(statusCode).toBe(200);
    });
    it('should return error if there is no id provided', async () => {
        const {body,statusCode} = await getProductById({});
        const error = JSON.parse(body);
        expect(statusCode).toBe(400);
        expect(error).toEqual({ message: 'Id is not provided' })
    });
    it('should return error if there is no product found', async () => {
        const {body,statusCode} = await getProductById(wrongEvent);
        const error = JSON.parse(body);
        expect(statusCode).toBe(404);
        expect(error).toEqual({ message: 'Product not found' })
    })
})
