import {Component, OnInit} from '@angular/core';

import { Http, Response } from '@angular/http';

import { ItemBundleService } from '../../itemBundle.service';
import { ItemBundle } from '../../itemBundle';
import { Item } from '../../item';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class Home implements OnInit {
    itemsBundles: ItemBundle[];
    errorMessage: string;

    constructor(private itemBundleService: ItemBundleService, private http: Http) { }

    getItemsBundles() {
      console.log('Load items bundles');
      this.itemBundleService.getItemsBundles()
                      .subscribe(
                         //itemsBundles => this.itemsBundles = itemsBundles,
                         itemsBundles => this.parseItemsBundles(this, itemsBundles),
                         error =>  this.errorMessage = <any>error);
    }
    
    parseItemsBundles(home: Home, itemsBundles: ItemBundle[]) {
        for (let itemBundle of itemsBundles) {
            for (let item of itemBundle.items) {
                home.getItemStatus(home, item);
            }
        }
        home.itemsBundles = itemsBundles;
    }
    
    getItemStatus(home: Home, item: Item) {
        if (item.statusUrl) {
            item.statusObserver.subscribe(
                                    status => item.status = status,
                                    error =>  home.errorMessage = <any>error);
        }        
    }
        
    ngOnInit() {
      var me = this;
      this.getItemsBundles();
      //setInterval(function(){ me.getItemsBundles(); }, 5000);
    }   
    
    clickAction(item: Item) {
        var me = this;
        this.http.get(item.actionUrl).map(function(res) { 
            //console.log(res);
            me.getItemStatus(me, item)
        }).subscribe();
    } 
}
