import {getProductsList} from "./index";
import {mockProducts} from "../../mocks/products";

describe('getProductsList', () => {
    it('Should return all products', async () => {
        const {body} = await getProductsList();
        const allProducts = JSON.parse(body);

        expect(allProducts).toEqual(mockProducts);
    })
})
