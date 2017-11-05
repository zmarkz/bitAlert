import BaseService from "./baseService";
import { sequelize as ORM, models } from '../models';
export class AddressService extends BaseService {

    public static getbtcindiaTop100(addressID): Promise<any> {
        return new Promise((resolve, reject) => {
            models.btcindia.findAll({
                limit: 200,
                order: '"updatedAt" DESC' ,
                attributes: ['buy', 'sell','timestamp']
            }).then((btcindia) => {

                models.zebpay.findAll({
                    limit: 200,
                    order: '"updatedAt" DESC' ,
                    attributes: ['buy', 'sell','timestamp']
                }).then((zebpay) => {

                    models.coinbase.findAll({
                        limit: 200,
                        order: '"updatedAt" DESC' ,
                        attributes: ['buy', 'sell','timestamp']
                    }).then((coinbase) => {
                        var buy = new Array();
                        var sell = new Array();
                        btcindia.forEach(function(item) {
                            buy.push(
                                {
                                    "timestamp" : item.getDataValue("timestamp"),
                                    "price" : item.getDataValue("buy")
                                }
                            );
                            sell.push(
                                {
                                    "timestamp" : item.getDataValue("timestamp"),
                                    "price" : item.getDataValue("sell")
                                }
                            );
                        });
                        var bciData = {
                            "buy" : buy,
                            "sell" :sell
                        };
                        buy = new Array();
                        sell = new Array();
                        zebpay.forEach(function(item) {
                            buy.push(
                                {
                                    "timestamp" : item.getDataValue("timestamp"),
                                    "price" : item.getDataValue("buy")
                                }
                            );
                            sell.push(
                                {
                                    "timestamp" : item.getDataValue("timestamp"),
                                    "price" : item.getDataValue("sell")
                                }
                            );
                        });
                        var zebData = {
                            "buy" : buy,
                            "sell" :sell
                        };
                        buy = new Array();
                        coinbase.forEach(function(item) {
                            buy.push(
                                {
                                    "timestamp" : item.getDataValue("timestamp"),
                                    "price" : item.getDataValue("buy")
                                }
                            );
                        });
                        var coinbaseData = {
                            "buy" : buy
                        };

                        resolve({
                            coinbase: coinbaseData,
                            bci : bciData,
                            zebpay: zebData
                        });


                    }).catch((error) => {
                        reject(error.message);
                    });

                }).catch((error) => {
                    reject(error.message);
                });
            }).catch((error) => {
                reject(error.message);
            });
        });
    }
}