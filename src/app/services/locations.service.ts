import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebResult } from '../models/WebResult';
import { UserAndLocation } from '../models/user-and-location';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { ShopDetailsForUsers } from '../models/ShopDetailsForUsers';
import { SearchInShop } from '../models/search-in-shop';
import { SearchDetailsForUser } from '../models/search-details-for-user';
import { SearchService } from './search.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private baseUrl = 'http://localhost:55505/';
  
  Locations  = [
    {lat:32.0884274, lng:34.836800499999981},
    {lat:32.0819798, lng:34.832418899999993},
    {lat:32.086637, lng:34.829819999999927},
    {lat:32.4718343, lng:34.995714700000008},
  ];
  lng = this.Locations[0].lng;
  lat = this.Locations[0].lat;
  locationChange: Subject<{lat,lng}> = new Subject<{lat,lng}>();
  strings: string;
  
  constructor(private myHttp: HttpClient, private alertCtrl: AlertController, private searchService: SearchService ) { }
  
  checkDistance(lng, lat) {
    var locationAndUser: UserAndLocation = new UserAndLocation();
    locationAndUser.uuid = localStorage.getItem('user');
    locationAndUser.lng = lng;
    locationAndUser.lat = lat;

    return this.myHttp.post(`${this.baseUrl}WebService/Searches/CheckDistance`, locationAndUser);
  }
  distance() {
    // if (navigator) {
    //   navigator.geolocation.watchPosition(pos => {
    //     this.lng = +pos.coords.longitude;
    //     this.lat = +pos.coords.latitude;
       
    //       console.log(this.lat + " " + this.lng);
    //       this.checkDistance(this.lng, this.lat).subscribe((res: WebResult<SearchInShop[]>) => {
    //         //if res.value is not null, then we found a shop

    //         if (res.Value.length > 0) {
    //           console.log(res.Value);
    //           res.Value.forEach(searchFound => {
    //             this.presentAlert(searchFound);
    //           });
              
    //         }
    //       })
    //   });
    // }
    
    setInterval(()=>{
      var rand = Math.floor((Math.random() * 4));
      this.lng = this.Locations[rand].lng;
      this.lat = this.Locations[rand].lat;
      this.checkDistance(this.lng,this.lat).subscribe((res:WebResult<SearchInShop[]>)=>{
        if(res.Value.length>0){         
          this.presentAlert(res.Value);           
        }
        this.locationChange.next({lng:this.lng,lat:this.lat});
      })
    },10000);
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
