import { DataTypes, Model, Sequelize } from 'sequelize';
import { initDB } from '../loaders';

const sequelize = initDB();

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.INTEGER
    },
}, {
    timestamps: false,
    sequelize,
    modelName: 'product'
});

export default Product;
