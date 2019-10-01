import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Category } from '../models/Category';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  searchQuery: string = '';
  Categories: any;
  distance: number;
  item: string;
  category:Category;
  constructor(private service: ShopService) {
    this.initializeCategories();

    console.log(this.distance);

  }

  initializeCategories() {
    this.Categories = [
      'בגדי נשים',
      'בגדי ילדים',
      'כלי נגינה',
      'מכשירי כתיבה',
      'מוצרי מזון',
      'תכשיטים',
      'אומנות',
      'כלי עבודה',
      'לתינוק ולילד',
      'יודאיקה',
      'מחשבים וציוד נלווה',
      'מצלמות וצילום',
      'בגדי גברים',
      'הנעלה',
      'שעונים ותכשיטים',
      'קוסמטיקה וטיפוח',
      'סלולרי',
      'מוצרי חשמל',
    ];
    // this.service.getAllCategories().subscribe(res => {
    //   this.Categories = res.toString();
    // });
  }
  getCategories(ev: any) {
    // Reset items back to all of the items
    this.initializeCategories();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.Categories = this.Categories.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }
  cateegorySelected(item: any) {
    this.category=item;
  }
  searchItem() {
    console.log("distance:  " + this.distance);
    console.log("item to search:  " + this.item);
    console.log("category:  " + this.category);
  }
}
