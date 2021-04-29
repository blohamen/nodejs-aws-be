import StockModel from "../models/Stock";

class ProductService {
    constructor(productModel) {
        this.model = productModel;
    }

    getProductById(id) {
        return this.model.findOne({
            where: {id},
            attributes: [
                'id', 'title', 'description', 'price', 'stock.count'
            ],
            include: [{ model: StockModel, attributes: []}],
            raw: true,
        });
    }

    getAllProducts() {
        return this.model.findAll({
            attributes: [
                'id', 'title', 'description', 'price', 'stock.count'
            ],
            include: [{ model: StockModel, attributes: []}],
            raw: true,
        });
    }

    addProduct(productData, transaction) {
        return this.model.create({...productData}, {transaction});
    }

    async updateProduct(productData,  transaction) {
        const { id, description, title, price } = productData;

        return this.model.update({description, title, price}, {where: {id}}, {transaction});
    }

}

export default ProductService;
