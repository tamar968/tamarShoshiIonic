import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Category } from '../models/Category';
import { WebResult } from '../models/WebResult';
import { Search } from '../models/Search';
import { SearchService } from '../services/search.service';
import { ShopDetailsForUsers } from '../models/ShopDetailsForUsers';
import { LocationsService } from '../services/locations.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { User } from '../models/user';
// import { CalendarComponent } from "ionic2-calendar";
import { NewSearchComponent } from '../new-search/new-search.component';
// import { Calendar } from '@ionic-native/calendar';
import { CalendarComponentOptions, CalendarComponent, CalendarResult } from 'ion2-calendar'
import { CalendarService } from 'ion2-calendar/dist/services/calendar.service';
import { from } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchModalService } from '../services/search-modal.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  dateRange: { from: Date; to: Date; };
  type: 'string';
  calendar = new CalendarComponent(new CalendarService())
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
  };
  
  from: Date;
  to: Date;

  // shopsFromSearch: ShopDetailsForUsers[];
  // Categories: Category[];
  // distance: number = 50;
  // nameProduct: string = "";
  // nameCategory: string;
  // category: Category;

  // customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  // customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  // customPickerOptions: any;


  constructor(private alertCtrl: AlertController,public searchModalService: SearchModalService, public searchService: SearchService, private modalCtrl: ModalController) { }
  ngOnInit() {
    this.calendar.options = { pickMode: 'range' };

  }
  async addEvent(dStart: Date, dEnd: Date) {
    let search: Search = {
      codeSearch: 78,
      codeUser: 3,
      nameProduct: 'string',
      status: 0,
      codeCategory: 2,
      dateStart: dStart,
      dateEnd: dEnd
    }
    const alert = await this.alertCtrl.create(<AlertOptions>{
      title: ' חיפוש',
      message: `גגגג`,
      buttons: [
        {
          text: 'לא',
          handler: () => {
            console.log('מתחרט');
          }
        },
        {
          text: 'כן',
          handler: () => {
            console.log('מתחרט לא');
            // this.addEvent(this.from,this.to);
            this.searchService.runSearch(search).subscribe((res: WebResult<any>) => {
              if (res.Status == true) {
                this.searchService.getHistoryForUser().subscribe((res: WebResult<any>) => {
                  this.searchService.searchesForHistory = res.Value;
                  this.searchService.changeStatusToString();

                })
              }
            })
          }
        }
      ]
    });
    await alert.present();


    console.log(search);
  }
  // selectStart(e) {
  //   console.log(e);
  //   this.from = e.dateObj;
  // }
  // selectEnd(e) {
  //   console.log(e);
  //   this.to = e.dateObj;
  //   // this.addEvent(this.from, this.to);

  // }
  // select(e) {
  //   console.log(e);
  // }
  onChange(e) {
    this.openModal(e.from._d, e.to._d);
  }
  // constructor(private shopService: ShopService, private searchService: SearchService,
  //   private locationsService: LocationsService, private alertCtrl: AlertController, private toastCtrl: ToastController) {

  //     this.customPickerOptions = {
  //       buttons: [{
  //         text: 'Save',
  //         handler: () => console.log('Clicked Save!')
  //       }, {
  //         text: 'Log',
  //         handler: () => {
  //           console.log('Clicked Log. Do not Dismiss.');
  //           return false;
  //         }
  //       }]
  //     } 



  //   //this.locationsService.distance();
  //   //     this.uniqueDeviceID.get()
  //   //   .then((uuid: any) => this.uuid=uuid)
  //   //  ;

  // }

  // initializeCategories() {
  //   this.searchService.GetCategories().subscribe((res: WebResult<Category[]>) => {
  //     this.Categories = res.Value;
  //   })
  // }

  // ngOnInit() {
  //   this.initializeCategories();
  // }
  // categorySelected(item) {
  //   this.category = new Category;
  //   this.category.nameCategory = this.nameCategory.substr(0, this.nameCategory.length - 1);
  //   this.Categories.forEach((cat) => {
  //     if (cat.nameCategory == this.category.nameCategory) {
  //       this.category = cat;
  //     }
  //   });
  // }
  // searchItem() {
  //   if (this.nameProduct == "" || this.category == null) {
  //     this.presentToastDanger("לא הוזנו נתונים מספיקים");
  //     return;
  //   }

  //   this.searchService.getShopsForCategory(this.category.codeCategory).subscribe((res: WebResult<any>) => {
  //     if (res.Value != null) {
  //       this.shopService.shopDetailForUsers = res.Value;
  //       this.shopsFromSearch = res.Value;

  //       var search = new Search();
  //       search.codeCategory = this.category.codeCategory;
  //       search.nameProduct = this.nameProduct;
  //       search.status = 0;
  //       search.distance = this.distance;
  //       this.searchService.runSearch(search).subscribe((res: WebResult<any>) => {
  //         if (res.Status == true) {
  //           this.presentToastSuccess();
  //           this.searchService.getHistoryForUser().subscribe((res: WebResult<any>) => {
  //             this.searchService.searchesForHistory = res.Value;
  //             this.searchService.changeStatusToString();

  //           })
  //           //reset the form
  //           this.category = null;
  //           this.distance = 50;
  //           this.nameCategory = "";
  //           this.nameProduct = "";

  //         }
  //         else
  //           this.presentToastDanger(res.Message);
  //       })
  //     }
  //     else {
  //       this.presentToastDanger(res.Message);
  //       // reset the form
  //       this.category = null;
  //       this.distance = 50;
  //       this.nameCategory = "";
  //       this.nameProduct = "";
  //     }

  //   })
  // }
  // async presentToastSuccess() {
  //   const toast = await this.toastCtrl.create({
  //     message: 'חיפוש הופעל',
  //     color: "success",
  //     duration: 2000,
  //     position: 'top',
  //   });
  //   toast.present();
  // }
  // async presentToastDanger(message) {
  //   const toast = await this.toastCtrl.create({
  //     message: message,
  //     color: "danger",
  //     duration: 2000,
  //     position: 'top',
  //   });
  //   toast.present();
  // }

  
  async openModal(dateStart: Date,dateEnd:Date) {
   
this.dateRange.from=new Date();
this.dateRange.to= new Date();

    const myModal = await this.modalCtrl.create({
      component: NewSearchComponent,
      componentProps: { dateFrom:dateStart, dateTo:dateEnd }
    });

    myModal.present();

    setTimeout(function () {
      myModal.dismiss();
    }, 600000)

    this.searchModalService.setModal(myModal);
    const event: any = await myModal.onDidDismiss();
  }
}
