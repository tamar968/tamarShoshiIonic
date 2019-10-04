import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Category } from '../models/Category';
import { WebResult } from '../models/WebResult';
import { Search } from '../models/Search';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  searchQuery: string = '';
  Categories: Category[];
  distance: number=50;
  nameProduct: string;
  category: Category;
  constructor(private service: ShopService) {
    this.initializeCategories();
    console.log(this.distance);

  }
  initializeCategories() {
    this.service.getAllCategories().subscribe((res: WebResult) => {
      this.Categories = res.Value;
    })
  }

  ngOnInit() {

  }


  getCategories(ev: any) {
    // Reset items back to all of the items
    this.initializeCategories();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.Categories = this.Categories.filter((item) => {
        return (item.nameCategory.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }
  categorySelected(item: Category) {
    this.category = item;
  }
  searchItem() {
    console.log("distance:  " + this.distance);
    console.log("item to search:  " + this.nameProduct);
    console.log("category:  " + this.category);
    var search = new Search();
    search.codeCategory = this.category.codeCategory;
    search.nameProduct = this.nameProduct;
    search.status = 0;
    this.service.runSearch(search).subscribe((res: WebResult) => {
      if (res.Status == true)
        alert("Succeed");
      else
        alert("Failed");
    })
  }
}
