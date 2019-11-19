import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ShopDetailsForUsers } from '../models/ShopDetailsForUsers';
import { ShopService } from '../services/shop.service';
import { SearchService } from '../services/search.service';
import { WebResult } from '../models/WebResult';
import { Category } from '../models/Category';
import { LocationsService } from '../services/locations.service';
declare var google;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  latitude: number = this.locationsService.lat;
  longitude: number = this.locationsService.lng;
  zoom: number = 15;
  shopsForCategory: ShopDetailsForUsers[];
  Categories: Category[];
  nameProduct: string;
  nameCategory: string;
  category: Category;
  currentShop: ShopDetailsForUsers=new ShopDetailsForUsers;
  constructor(private searchService: SearchService, private locationsService: LocationsService) {
    this.initializeCategories();
    this.setCurrentLocation();
  }

  ngOnInit() {

  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if (navigator) {
      navigator.geolocation.watchPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;


      });
    }
  }
  initializeCategories() {
    this.searchService.GetCategories().subscribe((res: WebResult<Category[]>) => {
      this.Categories = res.Value;
    })
  }
  categorySelected(item) {
    this.category = new Category;
    this.category.nameCategory = this.nameCategory.substr(0, this.nameCategory.length - 1);
    this.Categories.forEach((cat) => {
      if (cat.nameCategory == this.category.nameCategory) {
        this.category = cat;
      }
    });
    this.searchService.getShopsForCategory(this.category.codeCategory).subscribe((res: WebResult<any>) => {
      this.shopsForCategory = res.Value;
    });
  }
  clickedMarker(locationItem: ShopDetailsForUsers) {
    this.currentShop = locationItem;
    console.log( this.currentShop)
  }
}
