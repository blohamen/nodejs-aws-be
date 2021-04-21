import Product from "./Product";
import Stock from "./Stock";

Product.hasOne(Stock, {onDelete: 'CASCADE'});
Stock.belongsTo(Product);

export {Product, Stock};
