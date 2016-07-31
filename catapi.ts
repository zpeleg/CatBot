import * as request from 'request';
import {parseString}  from 'xml2js';

export enum IsMoving { Moving, Static };
export interface GotCat {
    (catUrl: string): void;
}
export class CatApiRetriever {
    getCat(moving: IsMoving, callback: GotCat) {
        var options: request.Options = {
            baseUrl: 'http://thecatapi.com',
            uri: 'api/images/get',
            qs: {
                format: 'xml',
                results_per_page: 1,
                type: moving == IsMoving.Moving ? 'gif' : 'png,jpg'
            }
        }
        request(options,
            function (error, response, body) {
                if (error) {
                    throw error;
                }
                parseString(body,function(err,res){
                    var caturl = res.response.data[0].images[0].image[0].url[0];
                    callback(caturl);
                })

            });
    }
}
