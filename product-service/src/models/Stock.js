import { DataTypes, Model } from 'sequelize';
import { initDB } from '../loaders';

const sequelize = initDB();

class Stock extends Model {}

Stock.init({
    'productId': {
        type: DataTypes.UUID,
        primaryKey: true,
        foreignKey: true,
        field: 'product_id'
    },
    count: {
        type: DataTypes.INTEGER,
    },
}, {
    timestamps: false,
    sequelize,
    modelName: 'stock'
});

export default Stock;
