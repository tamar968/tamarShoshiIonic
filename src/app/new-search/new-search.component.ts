import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../services/shop.service';
import { Category } from '../models/Category';
import { WebResult } from '../models/WebResult';
import { Search } from '../models/Search';
import { SearchService } from '../services/search.service';
import { ShopDetailsForUsers } from '../models/ShopDetailsForUsers';
import { LocationsService } from '../services/locations.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { SearchModalService } from '../services/search-modal.service';
//calender is: https://www.positronx.io/ionic-calendar-ui-tutorial-examples-from-scratch/

@Component({
  selector: 'app-new-search',
  templateUrl: './new-search.component.html',
  styleUrls: ['./new-search.component.scss']
})
export class NewSearchComponent implements OnInit {

  @Input() fromCalendar = true;
  @Input() dateFrom: Date;
  @Input() dateTo: Date;

  shopsFromSearch: ShopDetailsForUsers[];
  Categories: Category[];
  distance: number = 50;
  nameProduct: string = "";
  nameCategory: string;
  category: Category;
  dateStart: Date;
  dateEnd: Date;

  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;
  monthShortNames: any;
  monthNames: string[];
  dayNames: any;


  constructor(private shopService: ShopService, private searchService: SearchService, private searchModalService: SearchModalService,
    private locationsService: LocationsService, private alertCtrl: AlertController, private toastCtrl: ToastController) {
      this.dateStart = this.dateFrom;
      console.log(this.dateStart);
      this.dateEnd = this.dateTo;
    this.customPickerOptions = {
      buttons: [{
        text: 'שמירה',
        handler: () => console.log('נשמר')
      }, {
        text: 'ביטול',
        handler: () => {
          console.log('בוטל');
          return false;
        }
      }]
    }
    this.monthNames = [
      'ינואר',
      'פברואר',
      'מרץ',
      'אפריל',
      'מאי',
      'יוני',
      'יולי',
      'אוגוסט',
      'ספטמבר',
      'אוקטובר',
      'נובמבר',
      'דצמבר'
    ]
    this.dayNames = ['א','ב','ג','ד','ה','ו','ש']

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
    this.initializeCategories();
    this.dateStart = this.dateFrom;
    console.log(this.dateStart);
    this.dateEnd = this.dateTo;
  }
  categorySelected() {
    this.category = new Category;
    this.category.nameCategory = this.nameCategory.substr(0, this.nameCategory.length - 1);
    this.Categories.forEach((cat) => {
      if (cat.nameCategory == this.category.nameCategory) {
        this.category = cat;
      }
    });
  }
  closeModal(){
    this.searchModalService.myModal.dismiss();
  }
  searchItem() {
    this.searchModalService.myModal.dismiss();
    if (this.nameProduct == "" || this.category == null) {
      this.presentToastDanger("לא הוזנו נתונים מספיקים");
      return;
    }

    this.searchService.getShopsForCategory(this.category.codeCategory).subscribe((res: WebResult<any>) => {
      if (res.Value != null) {
        this.shopService.shopDetailForUsers = res.Value;
        this.shopsFromSearch = res.Value;

        var search = new Search();
        search.codeCategory = this.category.codeCategory;
        search.nameProduct = this.nameProduct;
        search.status = 0;
        search.distance = this.distance;
        search.dateStart=this.dateFrom;
        search.dateEnd = this.dateTo;
        this.searchService.runSearch(search).subscribe((res: WebResult<any>) => {
          if (res.Status == true) {
            this.presentToastSuccess();
            this.searchService.getHistoryForUser().subscribe((res: WebResult<any>) => {
              this.searchService.searchesForHistory = res.Value;
              debugger;
              //this.searchService.changeStatusToString();

            })
            //reset the form
            this.category = null;
            this.distance = 50;
            this.nameCategory = "";
            this.nameProduct = "";

          }
          else
            this.presentToastDanger(res.Message);
        })
      }
      else {
        this.presentToastDanger(res.Message);
        // reset the form
        this.category = null;
        this.distance = 50;
        this.nameCategory = "";
        this.nameProduct = "";
      }

    })
  }
  async presentToastSuccess() {
    const toast = await this.toastCtrl.create({
      message: 'חיפוש הופעל',
      color: "success",
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
  async presentToastDanger(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: "danger",
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

}
