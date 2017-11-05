import * as ORM from "sequelize";
import {Sequelize} from 'sequelize';

export function coinbase(sequelize: Sequelize) {
    return sequelize.define('coinbase', {
        id: {
            type: ORM.STRING,
            primaryKey: true
        },
        buy: {
            type: ORM.INTEGER
        },
        sell: {
            type: ORM.INTEGER
        }
        ,
        timestamp: {
            type: ORM.BIGINT
        }
    });
}

