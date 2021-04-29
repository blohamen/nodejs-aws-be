import { Sequelize } from 'sequelize';
import config from '../config/config';

const { db } = config;

let sequelize;

const initDB = () => {
    if (sequelize) {
        return sequelize;
    }

    sequelize = new Sequelize(db.database, db.username, db.password, {
        host: db.host,
        dialect: 'postgres',
        port: db.port,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

    return sequelize;
};

export {
    initDB
};
