import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Category } from '../models/Category';
import { WebResult } from '../models/WebResult';
import { Search } from '../models/Search';
import { SearchService } from '../services/search.service';
import { ShopDetailsForUsers } from '../models/ShopDetailsForUsers';
import { LocationsService } from '../services/locations.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { User } from '../models/user';


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
  constructor(private shopService: ShopService, private searchService: SearchService,
    private locationsService: LocationsService, private alertCtrl: AlertController) {
    this.initializeCategories();
    console.log(this.distance);
    //this.locationsService.distance();
    //     this.uniqueDeviceID.get()
    //   .then((uuid: any) => this.uuid=uuid)
    //  ;

  }
  initializeCategories() {
    this.searchService.GetCategories().subscribe((res: WebResult<Category[]>) => {
      this.Categories = res.Value;
    })
  }

  ngOnInit() {

  }
  categorySelected(item) {
    this.category = new Category;
    this.category.nameCategory = this.nameCategory.substr(0, this.nameCategory.length - 1);
    this.Categories.forEach((cat) => {
      if (cat.nameCategory == this.category.nameCategory) {
        this.category = cat;
      }
    });
  }
  searchItem() {
    console.log("distance:  " + this.distance);
    console.log("item to search:  " + this.nameProduct);
    console.log("category: " + this.category);

    this.searchService.getShopsForCategory(this.category.codeCategory).subscribe((res: WebResult<any>) => {
      if (res.Value != null) {
        this.shopService.shopDetailForUsers = res.Value;
        debugger;
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
      else {
        alert(res.Message);
      }
      var search = new Search();
      search.codeCategory = this.category.codeCategory;
      search.nameProduct = this.nameProduct;
      search.status = 0;
      search.distance = this.distance;
      this.searchService.runSearch(search).subscribe((res: WebResult<any>) => {
        if (res.Status == true) {
          alert("Succeed");
          this.searchService.getHistoryForUser().subscribe((res: WebResult<any>) => {
            this.searchService.searchesForHistory = res.Value;
            this.locationsService.distance();
          })

        }
        else
          alert(res.Message);
      })
    })


  }

}
