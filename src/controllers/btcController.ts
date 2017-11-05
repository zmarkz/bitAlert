import * as Hapi from 'hapi';
import BaseController from "./baseController";
import {AddressService} from "../services/btcService";
export class BtcController extends BaseController{
    public static getAddressByID(request: Hapi.Request, reply: Hapi.IReply) {
        AddressService.getbtcindiaTop100(request.params['id']).then((data)=> {
            reply(data);
        }).catch((err)=> {
            reply(err);
        });
    }
}