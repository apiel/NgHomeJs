import {Component, OnInit} from '@angular/core';

import { ItemBundleService } from '../../itemBundle.service';
import { ItemBundle } from '../../itemBundle';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class Home implements OnInit {
    itemsBundles: ItemBundle[];
    errorMessage: string;

    constructor(private itemBundleService: ItemBundleService) { }

    getItemsBundles() {
      this.itemBundleService.getItemsBundles()
                      .subscribe(
                         //itemsBundles => this.itemsBundles = itemsBundles,
                         itemsBundles => this.parseItemsBundles(this, itemsBundles),
                         error =>  this.errorMessage = <any>error);
    }
    
    parseItemsBundles(home: Home, itemsBundles: ItemBundle[]) {
        for (let itemBundle of itemsBundles) {
            for (let item of itemBundle.items) {
                if (item.statusUrl) {
                    item.statusObserver.subscribe(
                                            status => item.status = status,
                                            error =>  this.errorMessage = <any>error);
                }
            }
        }
        home.itemsBundles = itemsBundles;
    }
        
    ngOnInit() {
      this.getItemsBundles();
    }    
}
