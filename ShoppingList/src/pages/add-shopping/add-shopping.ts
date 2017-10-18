import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.shoppingItemRef$ = this.database.list('shopping-list');
  }

  addShoppingItem(shoppingItem: ShoppingItem) {
    //: Creates new object and converts itemNumber to a number.
    this.shoppingItemRef$.push({
      itemName:this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });

    //: Reset shoppingItem
    this.shoppingItem = {} as ShoppingItem;

    //:Go back to ShoppingListPage
    this.navCtrl.pop();

    console.log(shoppingItem);
  }

}
