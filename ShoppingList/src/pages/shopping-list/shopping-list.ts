import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navigateToAddShoppingPage() {
    this.navCtrl.push(AddShoppingPage);
  }

}
