import AWS from 'aws-sdk';
import {initDB} from "../../loaders";
import ProductService from "../../services/ProductService";
import {Product as ProductModel, Stock as StockModel} from "../../models";
import StockService from "../../services/StockService";
import createResponse from "../../utils/createResponse";

const sequelize = initDB();
const productService = new ProductService(ProductModel);
const stockService = new StockService(StockModel);

export const catalogBatchProcess = async (event) => {
    const sns = new AWS.SNS({region: 'eu-west-1'});
    console.log('Event records: ', event.Records);
    const productsRecords = event.Records.map(({body}) => JSON.parse(body));

    const transaction = await sequelize.transaction();

    try {
        const productsTitles = [];
        for (const product of productsRecords) {
            const {description, title, price, count} = product;
            console.log('product', product);
            productsTitles.push(title);

            const productRecord = await productService.addProduct({description, title, price: parseInt(price)}, transaction);
            console.log('Product added', productRecord);

            await stockService.addStock({productId: productRecord.id, count: parseInt(count)}, transaction);
            await transaction.commit();
        }
        console.log('Publish start', productsTitles);
        const status = +productsTitles[0][4] % 2 === 0  ? 'true' : 'false'; // example of filter policy
        const promise = new Promise((resolve, reject) => {
            sns.publish({
                Subject: 'Products were added',
                Message: `Products with titles: ${productsTitles.join(',')} were added`,
                TopicArn: process.env.SNS_ARN,
                MessageAttributes: {
                    status: {
                        DataType: 'String',
                        StringValue: status
                    }
                }
            }, (err, data) => {
                if (err) {
                    console.log('Error while publish', err);
                    reject(err);
                }
                console.log('Sent information', data);
                resolve();
            })
        })
        await promise;
        return createResponse({body: {message: 'Products added'}});
    } catch (e) {
        console.log(e);
        return createResponse({statusCode: 500, body: {message: 'Internal Server Error'}});
    }
}
