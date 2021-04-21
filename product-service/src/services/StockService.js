class StockService {
    constructor(model) {
        this.stockModel = model;
    }

    addStock(data, transaction) {
        return this.stockModel.create({...data}, {transaction});
    }

    updateStock(data, transaction) {
        const {productId, count} = data;

        return this.stockModel.update({count}, {
            where: {
                productId
            }
        }, {transaction})
    }

}

export default StockService;
