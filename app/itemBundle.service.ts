import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import { ItemBundle } from './itemBundle';

@Injectable()
export class ItemBundleService {
    constructor (private http: Http) {}
    
    private itemsBundlesUrl = "mock/items.json";
    
    getItemsBundles() {
        return this.http.get(this.itemsBundlesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
    }
    
    private extractData(res: Response) {
        let body = res.json();
        let itemsBundles: ItemBundle[] = body || [];
        for(let itemBundle of itemsBundles) {
            for(let item of itemBundle.items) {
                console.log(item);
            }
        }
        return itemsBundles;
    }

    private handleError (error: any) {
      // In a real world app, we might use a remote logging infrastructure
      // We'd also dig deeper into the error to get a better message
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
    }
}