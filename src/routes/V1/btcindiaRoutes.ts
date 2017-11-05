import * as Joi from 'joi';
import {BtcController} from "../../controllers/btcController";

export = [
    {
        method: 'GET',
        path: '/data',
        handler: BtcController.getAddressByID,
        config:{
            auth: false,
            tags: ['api', 'btcindia'],
            description: 'get btcindia by ID',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '400': {description: 'Bad Request'}
                    }
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/chart.html',
        handler: {
            file: '../../../assets/chart.html'
        },
        config:{
            auth: false,
            tags: ['api', 'btcindia'],
            description: 'get btcindia by ID',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '400': {description: 'Bad Request'}
                    }
                }
            }
        }
    }

];

