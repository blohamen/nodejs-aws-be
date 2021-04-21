import ProductService from "../../services/ProductService";
import StockService from '../../services/StockService';
import {Product as ProductModel, Stock as StockModel} from "../../models";
import createResponse from "../../utils/createResponse";
import {initDB} from "../../loaders";

const sequelize = initDB();
const productService = new ProductService(ProductModel);
const stockService = new StockService(StockModel);

export const addProduct = async (event) => {
    try {
        const { body } = event;

        if (!body) {
            return createResponse({statusCode: 400, body: {message: 'Bad request'}});
        }

        const parsedBody = typeof body === 'object' ? body : JSON.parse(body);
        const {description, title, price, count, id } = parsedBody;

        console.log('Income request addProduct with id, price, title, description, count', parsedBody);

        if (!description || !title || !price || !count) {
            return createResponse({statusCode: 400, body: {message: 'Bad request: invalid body'}});
        }

        const transaction = await sequelize.transaction();

        if(id) {
            console.log('Update product with id: ', id);

            await productService.updateProduct({description, title, price, id}, transaction);
            await stockService.updateStock({productId: id, count}, transaction);
            await transaction.commit();

            return createResponse({body: {id}});
        } else {
            console.log('Add product');

            const product = await productService.addProduct({description, title, price}, transaction);
            const stock = await stockService.addStock({productId: product.id, count}, transaction);
            await transaction.commit();

            return createResponse({body: {...product, ...stock}});
        }
    } catch (e) {
        console.log(e);
        return createResponse({statusCode: 500, body: {message: 'Internal server error'}});
    }
}
