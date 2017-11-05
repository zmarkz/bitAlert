import {IPlugin, IPluginInfo} from "../interfaces";
import * as Hapi from "hapi";

export default (): IPlugin => {
    return {
        register: (server: Hapi.Server) => {
            server.register([
                require('inert'),
                require('vision'),
                {
                    register: require('hapi-swagger'),
                    options: {
                        info: {
                            title: 'Bitcoin Price tracker',
                            description: 'Track bitcoin price in realtime from multiple websites.',
                            version: '1.0'
                        },
                        securityDefinitions: {
                            'Bearer': {
                                'type': 'apiKey',
                                'name': 'Authorization',
                                'in': 'header'
                            }
                        },
                        tags: [
                            {
                                'name': 'bitalert',
                                'description': 'bitalert'
                            }
                        ],
                        documentationPath: '/docs',
                        pathPrefixSize: 2,
                        sortTags: 'name'
                    }
                }
            ]
                , (error) => {
                    if (error) {
                        console.log('error', error);
                    }
                });
        },
        info: () => {
            return {
                name: "Swagger Documentation",
                version: "1.0.0"
            };
        }
    };
};