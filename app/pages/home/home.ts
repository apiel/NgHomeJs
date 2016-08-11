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
                         itemsBundles => this.itemsBundles = itemsBundles,
                         error =>  this.errorMessage = <any>error);
    }
        
    ngOnInit() {
      this.getItemsBundles();
    }    
}
