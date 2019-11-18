import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebResult } from '../models/WebResult';
import { UserAndLocation } from '../models/user-and-location';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { ShopDetailsForUsers } from '../models/ShopDetailsForUsers';
import { SearchInShop } from '../models/search-in-shop';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private baseUrl = 'http://localhost:55505/';
  lng: any;
  lat: any;
  lastLng: any = 0;
  lastLat: any = 0;
  constructor(private myHttp: HttpClient, private alertCtrl: AlertController,) { }
  checkDistance(lng, lat) {
    var locationAndUser: UserAndLocation = new UserAndLocation();
    locationAndUser.uuid = localStorage.getItem('user');
    locationAndUser.lng = lng;
    locationAndUser.lat = lat;
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/CheckDistance`, locationAndUser);
  }
  async distance() {
    //setInterval(function(){
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        //if the location changed from last time       
        if (this.lng != this.lastLng || this.lat != this.lastLat) {
          console.log(this.lat + " " + this.lng);
          this.checkDistance(this.lng, this.lat).subscribe((res: WebResult<any>) => {
            //if res.value is not null, then we found a shop
            if (res.Value) {
              console.log(res.Value);
              this.presentAlert(res.Value);
            }
            this.lastLng = this.lng;
            this.lastLat = this.lat;
          })
        }
      });
    }
    //}, 3000);
  }

  //popup for finding shop
  async presentAlert(searchInShop: SearchInShop) {
    const alert = await this.alertCtrl.create(<AlertOptions>{
      header: ' קנה כאן!'+searchInShop.NameProduct,
      message: searchInShop.NameShop,
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
            console.log('Buy clicked'+searchInShop.MailShop);
            this.foundSearch(searchInShop.CodeSearch, searchInShop.MailShop).subscribe(res=>{
              console.log("Bought");
            });
          }
        }
      ]
    });
    await alert.present();
  }
  foundSearch(codeSearch, mailShop){
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/Found`, {codeSearch:codeSearch, mailShop:mailShop});
  }
}
