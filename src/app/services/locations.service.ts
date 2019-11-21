import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebResult } from '../models/WebResult';
import { UserAndLocation } from '../models/user-and-location';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { ShopDetailsForUsers } from '../models/ShopDetailsForUsers';
import { SearchInShop } from '../models/search-in-shop';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private baseUrl = 'http://localhost:55505/';
  lng: any;
  lat: any;
  strings: string
  constructor(private myHttp: HttpClient, private alertCtrl: AlertController, ) { }

  checkDistance(lng, lat) {
    var locationAndUser: UserAndLocation = new UserAndLocation();
    locationAndUser.uuid = localStorage.getItem('user');
    locationAndUser.lng = lng;
    locationAndUser.lat = lat;
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/CheckDistance`, locationAndUser);
  }
  async distance() {
    if (navigator) {
      navigator.geolocation.watchPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;

        console.log(this.lat + " " + this.lng);
        this.checkDistance(this.lng, this.lat).subscribe((res: WebResult<any>) => {
          //if res.value is not null, then we found a shop
          if (res.Value.length > 0) {
            debugger
            console.log(res.Value);
            this.presentAlert(res.Value);
          }
        })
      });
    }
  }

  //popup for finding shop
  async presentAlert(searchInShop: SearchInShop[]) {
    this.strings = "";
    searchInShop.forEach(element => {
      this.strings += element.NameProduct;
      this.strings += " ";
    });
    const alert = await this.alertCtrl.create(<AlertOptions>{
      header: ' קנה כאן!' + searchInShop[0].NameShop,
      message: this.strings,
      buttons: [
        {
          text: 'לא עכשיו',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'קניתי',
          handler: () => {
            console.log('Buy clicked');
            searchInShop.forEach(element => {
              this.foundSearch(element.CodeSearch, element.MailShop).subscribe((res: WebResult<any>) => {
                console.log("Bought" + res.Value);
              });
            });

          }
        }
      ]
    });
    await alert.present();
  }
  foundSearch(codeSearch, mailShop) {
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/Found`, { codeSearch: codeSearch, mailShop: mailShop });
  }
}
