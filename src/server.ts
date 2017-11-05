import * as Hapi from "hapi";
import * as path from "path";
import * as fs from "fs";
import container from "./libs/ioc";
import { IPlugin } from "./libs/plugins/interfaces";
import { IServerConfig } from "../configurations/interfaces";
import {models} from '../src/models';
const Inert = require('inert');
var cron = require('node-cron');

var cheerio = require("cheerio");
var cron = require('node-cron');
var date = require('date-and-time');
var rp = require('request-promise');


var FgGreen = "\x1b[32m";
var FgYellow = "\x1b[33m";
var FgBlue = "\x1b[34m";
var FgWhite = "\x1b[37m";
var Reset = "\x1b[0m";


const config = container.get<IServerConfig>("IServerConfig");
const port = process.env.port || config.get("server:port");

//log all promise rejections
process.on('unhandledRejection', function(error, promise) {
    console.error("UNHANDLED REJECTION", error.stack);
});

const server = new Hapi.Server();

server.connection({
    port: port,
    routes: {
        cors: true
    },
    labels: ['V1','CRMRoutes']
});

console.log("server going to run at : "+server.info.uri);

server.register(Inert);

//  Setup Hapi Plugins
const pluginsPath = __dirname + '/libs/plugins/';
const plugins = fs.readdirSync(pluginsPath).filter(file => fs.statSync(path.join(pluginsPath, file)).isDirectory());

plugins.forEach((pluginName: string) => {
    var plugin: IPlugin = (require("./libs/plugins/" + pluginName)).default();
    console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
    plugin.register(server);
});

var optionsBitCoinIndia = {
    uri: "https://bitcoin-india.org/",
    transform: function (body) {
        return cheerio.load(body);
    }
};

var optionsZebPay = {
    uri: "https://api.zebpay.com/api/v1/ticker?currencyCode=INR",
    json: true
};

var optionsCoinbase = {
    uri: "https://api.coinbase.com/v2/prices/spot?currency=INR",
    json: true
};

cron.schedule('*/10 * * * * *', function(){
    // rp(options)
    //     .then(function ($) {
    //         const buyValue = $("#buyvalue").html();
    //         const sellValue = $("#sellvalue").html();
    //         const buyValueInInteger = parseInt(buyValue, 10);
    //         const sellValueInInteger = parseInt(sellValue, 10);
    //
    //         var now = new Date();
    //
    //         var time = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    //         console.log(FgBlue, "buy: ", buyValue," ",time);
    //         console.log(FgGreen, "sell:", sellValue," ",time);
    //         console.log(Reset, "********************");
    //             models.btcindia.create({
    //                 buy: buyValue,
    //                 sell: sellValue
    //             });
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     });



    var bciBuy, bciSell, zebBuy, zebsell, coinbaseBuy;
    var bci = rp(optionsBitCoinIndia)
        .then(function ($) {
            bciBuy = $("#buyvalue").html();
            bciSell = $("#sellvalue").html();
            models.btcindia.create({
                buy: bciBuy,
                sell: bciSell
            });
        })
        .catch(function (err) {
            console.log(err);
        });

    var zeb =  rp(optionsZebPay)
        .then(function (obj) {
            zebBuy = obj.buy;
            zebsell = obj.sell;
            models.zebpay.create({
                buy: zebBuy,
                sell: zebsell
            });
        })
        .catch(function (err) {
            console.log(err);
        });

    var coinbase =  rp(optionsCoinbase)
        .then(function (obj) {
            coinbaseBuy = obj.data.amount;
            models.coinbase.create({
                buy: coinbaseBuy,
            });
        })
        .catch(function (err) {
            console.log(err);
        });

    Promise.all([bci, zeb, coinbase])
        .then(values => {

            console.log(FgWhite, "bcibuy: ", bciBuy, "  bciSell: ", bciSell);
            console.log(FgGreen, "zebBuy:  ", zebBuy, "  zebsell:  ", zebsell);
            console.log(FgWhite, "coinbaseBuy: ", coinbaseBuy);
            console.log(Reset, "*********************************************");
            var time = new Date().getTime();

            // objDump.coinbase.buy.push(getInt(coinbaseBuy, time));
            // objDump.zebpay.buy.push(getInt(zebBuy, time));
            // objDump.zebpay.sell.push(getInt(zebsell, time));
            // objDump.bci.buy.push(getInt(bciBuy, time));
            // objDump.bci.sell.push(getInt(bciSell, time));
            // fs.writeFileSync('./datadump.json', JSON.stringify(objDump, null, 2) , 'utf-8');
        });


});

export default server;