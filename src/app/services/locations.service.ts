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
import { DisplayFound } from '../models/display-found';
import { red } from 'color-name';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private baseUrl = 'http://localhost:55505/';
  
// https://www.latlong.net/‏

  Locations  = [
    {lat:32.0884274, lng:34.836800499999981},//הושע 14
    {lat:32.0819798, lng:34.832418899999993},//דסלר 10
    {lat:32.086637, lng:34.829819999999927},//רבי עקיבא
    {lat:32.4718343, lng:34.995714700000008},//רחוב ירושלים
    {lat:32.091035, lng: 34.830035},//רמבם זבוטינסקי
    {lat: 32.078206, lng: 34.832622},//סמינר וולף
    {lat: 32.081425, lng: 34.840911},//עזרא כהנמן
    {lat: 32.081670, lng: 34.841010}//סמינר אלקיים
  ];
  lng = this.Locations[0].lng;
  lat = this.Locations[0].lat;
  locationChange: Subject<{lat,lng}> = new Subject<{lat,lng}>();
  display: DisplayFound[];
  alertIsPresent :boolean = false;
  
  constructor(private myHttp: HttpClient, private alertCtrl: AlertController, private searchService: SearchService ) {
    
   }
  
  checkDistance(lng, lat) {
    var locationAndUser: UserAndLocation = new UserAndLocation();
    locationAndUser.uuid ="123456"// localStorage.getItem('user');
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
    var rand = Math.floor((Math.random() * this.Locations.length));
    this.lng = this.Locations[rand].lng;
    this.lat = this.Locations[rand].lat;
    this.checkDistance(this.lng,this.lat).subscribe((res:WebResult<SearchInShop[]>)=>{
      
      if(res.Value && res.Value.length && !this.alertIsPresent){         
        this.presentAlert(res.Value);           
      }
      
      this.locationChange.next({lng:this.lng,lat:this.lat});
    })
    setTimeout(()=>{
     this.distance();
    },15000);
  }

  // //popup for finding shop
  //  async presentAlert(searchInShop: SearchInShop[]) {
  //   /* if (!searchInShop)
  //    {
  //     let alert = this.alertCtrl.create(<AlertOptions>{
  //       header: 'בצע מטלתך כאן!',
  //       //message: longString,
  //       inputs: [],
  //       buttons: [
  //         {
  //           text: 'לא עכשיו',
  //           role: 'cancel',
  //           handler: () => {
  //             console.log('NO');
  //           }
  //         },
  //         {
  //           text: 'ביצעתי',
  //           handler: () => {console.log('YES'); }
  //         }
  //       ]
  //     });
  //      (await alert).present();
  //    //this.alert.present();
  //     setTimeout(async ()=>{
  //       (await alert).dismiss();
  //     }, 5000);


  //    }*/
  //   this.display = [];
  //   searchInShop.forEach(element => {
  //     var found = this.display.find(f => f.nameShop == element.NameShop);
  //     if(found){
  //       found.productsInShop += element.NameProduct + " ";      
  //       found.codeSearchesInShop.push(element.CodeSearch);
  //     }
  //     else{
  //       var newDisplay = new DisplayFound();
  //       newDisplay.nameShop = element.NameShop;
  //       newDisplay.productsInShop = "";
  //       newDisplay.productsInShop += element.NameProduct + " ";
  //       newDisplay.mailShop = element.MailShop;
  //       newDisplay.codeSearchesInShop = [];
  //       newDisplay.codeSearchesInShop.push(element.CodeSearch);
  //       newDisplay.isChecked = false;
  //       this.display.push(newDisplay);
  //     }
  //   });
    

  //   const theNewInputs = [];
  //   for (let i = 0; i < this.display.length; i++) {
  //     theNewInputs.push(
  //       {
  //         label: this.display[i].nameShop + " : " +this.display[i].productsInShop,
  //         type: 'checkbox',
  //         color: red,
  //         checked: false,
  //         handler:(e)=>{
  //           this.display[i].isChecked = e.checked;
  //            console.info('value: ',e.checked)
  //         }
  //       }
  //     );
  //   }
  //   let alert;
  //   if (alert){
  //     console.log('there is an alert');
  //   }
  //   else{
  //     console.log('there is no alert');
  //   }

  //    alert = this.alertCtrl.create(<AlertOptions>{
  //     header: 'בצע מטלתך כאן!',
  //     //message: longString,
  //     inputs: theNewInputs,
  //     buttons: [
  //       {
  //         text: 'לא עכשיו',
  //         role: 'cancel',
  //         handler: () => {
            
  //         }
  //       },
  //       {
  //         text: 'ביצעתי',
  //         handler: () => {
  //           console.log('Buy clicked');
  //           this.display.forEach(shopBought => {
  //             if(shopBought.isChecked == true){
  //               shopBought.codeSearchesInShop.forEach(code =>{
  //                 this.foundSearch(code, shopBought.mailShop).subscribe((res: WebResult<any>) => {
  //                   console.log("Bought" + res.Value);    
  //                   this.searchService.getHistoryForUser().subscribe((res:WebResult<any>) =>{
  //                     if(res.Status == true){
  //                       this.searchService.searchesForHistory = res.Value;
  //                       this.searchService.changeStatusToString();
  //                     }
  //                   })               
  //                 });
  //               })              
  //             }
              
  //           });
            

  //         }
  //       }
  //     ]
  //   });
  //   //  this.alert.present();
  //  await alert.present();
  //   setTimeout(()=>{
  //     alert.dismiss();
  //   }, 50000);    
  // }
  //popup for finding shop
  async presentAlert(searchInShop: SearchInShop[]) {
    this.display = [];
    searchInShop.forEach(element => {
      var found = this.display.find(f => f.nameShop == element.NameShop);
      if(found){
        found.productsInShop += element.NameProduct + " ";      
        found.codeSearchesInShop.push(element.CodeSearch);
      }
      else{
        var newDisplay = new DisplayFound();
        newDisplay.nameShop = element.NameShop;
        newDisplay.productsInShop = "";
        newDisplay.productsInShop += element.NameProduct + " ";
        newDisplay.mailShop = element.MailShop;
        newDisplay.codeSearchesInShop = [];
        newDisplay.codeSearchesInShop.push(element.CodeSearch);
        newDisplay.isChecked = false;
        this.display.push(newDisplay);
      }
    });
    

    const theNewInputs = [];
    for (let i = 0; i < this.display.length; i++) {
      theNewInputs.push(
        {
          label: this.display[i].nameShop + " : " +this.display[i].productsInShop,
          type: 'checkbox',
          color: red,
          checked: false,
          handler:(e)=>{
            this.display[i].isChecked = e.checked;
             console.info('value: ',e.checked)
          }
        }
      );
    }
    

    const alert = await this.alertCtrl.create(<AlertOptions>{
      header: 'בצע מטלתך כאן!',
      //message: longString,
      inputs: theNewInputs,
      buttons: [
        {
          text: 'לא עכשיו',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'ביצעתי',
          handler: () => {
            console.log('Buy clicked');
            this.display.forEach(shopBought => {
              if(shopBought.isChecked == true){
                shopBought.codeSearchesInShop.forEach(code =>{
                  this.foundSearch(code, shopBought.mailShop).subscribe((res: WebResult<any>) => {
                    console.log("Bought" + res.Value);    
                    this.searchService.getHistoryForUser().subscribe((res:WebResult<any>) =>{
                      if(res.Status == true){
                        this.searchService.searchesForHistory = res.Value;
                        this.searchService.changeStatusToString();
                      }
                    })               
                  });
                })              
              }
              
            });
            

          }
        }
      ]
    });
    await alert.present();
    this.alertIsPresent = true;
    setTimeout(()=>{
      alert.dismiss();
      this.alertIsPresent = false;
    }, 5000);
    
    
  }
  UpdateSearchStatus(codeSearch,status, mailShop) {
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/Found`, { codeSearch: codeSearch,status:status, mailShop: mailShop });
  }
  foundSearch(codeSearch, mailShop) {
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/Found`, { codeSearch: codeSearch, mailShop: mailShop });
  }
}
