import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Category } from '../models/Category';
import { WebResult } from '../models/WebResult';
import { Search } from '../models/Search';
import { SearchService } from '../services/search.service';
import { ShopDetailsForUsers } from '../models/ShopDetailsForUsers';
import { LocationsService } from '../services/locations.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  shopsFromSearch: ShopDetailsForUsers[];
  Categories: Category[];
  distance: number = 50;
  nameProduct: string;
  nameCategory: string;
  category: Category;
  constructor(private shopService: ShopService, private searchService: SearchService, private locationsService: LocationsService) {
    this.initializeCategories();
    console.log(this.distance);
    this.locationsService.distance();

  }
  initializeCategories() {
    this.searchService.GetCategories().subscribe((res: WebResult) => {
      this.Categories = res.Value;
    })
  }

  ngOnInit() { }

  getCategories(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.Categories = this.Categories.filter((item) => {
        return (item.nameCategory.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })

    }
    else {
      // Reset items back to all of the items
      this.initializeCategories();
    }

  }
  categorySelected(item: Category) {
    this.category = item;
    this.nameCategory = item.nameCategory;
  }
  searchItem() {
    console.log("distance:  " + this.distance);
    console.log("item to search:  " + this.nameProduct);
    console.log("name of category:  " + this.category.nameCategory + "\ncode of category: " + this.category.codeCategory);

    this.searchService.getShopsForCategory(this.category.codeCategory).subscribe((res: WebResult) => {
      if (res.Value != null) {
        this.shopsFromSearch = res.Value;
        this.shopsFromSearch.forEach(element => {
          console.log("\n" + element.NameShop + " PhoneShop " + element.PhoneShop);
          console.log("\n" + element.NameShop + " Longitude " + element.Longitude);
          console.log("\n" + element.NameShop + " Latitude " + element.Latitude);
          console.log("\n" + element.NameShop + " FromHour " + element.FromHour);
          console.log("\n" + element.NameShop + " ToHour " + element.ToHour);
          console.log("\n" + element.NameShop + " AddressString " + element.AddressString);
        });
      }
      else{
        alert(res.Message)
      }
    })

    var search = new Search();
    search.codeCategory = this.category.codeCategory;
    search.nameProduct = this.nameProduct;
    search.status = 0;
    this.searchService.runSearch(search).subscribe((res: WebResult) => {
      if (res.Status == true)
        alert("Succeed");
      else
        alert("Failed");
    })
  }

}
