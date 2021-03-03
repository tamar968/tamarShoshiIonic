import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ShopService } from '../services/shop.service';
import { Search } from '../models/Search';
import { WebResult } from '../models/WebResult';
import { SearchService } from '../services/search.service';
import { SearchDetailsForUser } from '../models/search-details-for-user';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { Category } from '../models/Category';
import { ShopDetailsForUsers } from '../models/ShopDetailsForUsers';
import { LocationsService } from '../services/locations.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { User } from '../models/user';
import { ModalController } from '@ionic/angular';
// import { NewSearchComponent } from '../new-search/new-search.component';
import { EStatus } from '../models/EStatus';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  currentImage: any;
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
  uniqueDeviceID = new UniqueDeviceID();
  uuid: any;

  constructor(private shopService: ShopService, private photoService: PhotoService, private modalCtrl: ModalController, public searchService: SearchService,
    private locationsService: LocationsService, private alertCtrl: AlertController,public actionSheetController: ActionSheetController, private toastCtrl: ToastController) {
    this.customPickerOptions = {
      buttons: [{
        text: 'Save',
        handler: () => console.log('Clicked Save!')
      }, {
        text: 'Log',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    };
    this.updateAllSearchStatus();
    this.locationsService.distance();
    this.uniqueDeviceID.get()
      .then((uuid: any) => this.uuid = uuid);
  }





  ngOnInit() {
    this.initializeCategories();
    this.photoService.loadSaved();
    this.updateAllSearchStatus();
    this.getAll();
  }
  getAll() {
    this.searchService.getHistoryForUser().subscribe((res: WebResult<SearchDetailsForUser[]>) => {
      this.searchService.searchesForHistory = res.Value;
      this.searchService.changeStatusToString();

    })
  }
  getFound() {
    this.searchService.getFound().subscribe((res: WebResult<SearchDetailsForUser[]>) => {
      this.searchService.searchesForHistory = res.Value;
      this.searchService.changeStatusToString();
    })
  }
  getNotFound() {
    this.searchService.getNotFound().subscribe((res: WebResult<SearchDetailsForUser[]>) => {
      this.searchService.searchesForHistory = res.Value;
      this.searchService.changeStatusToString();
    })
  }
  getTimeWait(){
      this.searchService.getByStatus(EStatus.TimeWait).subscribe((res: WebResult<SearchDetailsForUser[]>) => {
        this.searchService.searchesForHistory = res.Value;
        this.searchService.changeStatusToString();
      })
  }
   getTimeOver(){
      this.searchService.getByStatus(EStatus.TimeOver).subscribe((res: WebResult<SearchDetailsForUser[]>) => {
        this.searchService.searchesForHistory = res.Value;
        this.searchService.changeStatusToString();
      })
  }
  getByStatus(status){
    this.searchService.getByStatus(status);
  }
  updateAllSearchStatus() {
    this.searchService.updateAllSearchStatus();
    console.log("updateAllSearchStatus");
  }
  async remove(item: SearchDetailsForUser) {
    const alert = await this.alertCtrl.create(<AlertOptions>{
      title: 'מחיקת מטלה',
      message: `<h3> האם אתה בטוח במחיקת המטלה: ${item.NameProduct}?</h3>`,
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
            this.searchService.Delete(item.CodeSearch).subscribe((res: WebResult<any>) => {
              console.log("after delete" + res.Message);
              this.getAll();
            });

          }
        }
      ]
    });
    await alert.present();
  }

  async showDetails(item: SearchDetailsForUser) {
    const alert = await this.alertCtrl.create(<AlertOptions>{
      title: item.nameProduct,
      message: `
      <h3>פרטים נוספים</h3>
      <div class="ta-start">
     <label class="title-info">מטלה:</label><label>${item.NameProduct}</label><br/>
     <label class="title-info">תאריך התחלה:</label><label>${item.dateStart}</label><br/>
     <label class="title-info">תאריך סיום:</label><label>${item.dateEnd}</label><br/>
     <label class="title-info">סטטוס:</label><label>${this.searchService.statusDict[item.Status]}</label><br/>
    </div>
      `,
      buttons: [
        {
          text: 'סגירה',
          handler: () => {
            console.log('מתחרט');
          }
        }
      ]
    });
    await alert.present();
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
  }
  searchItem() {
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
        search.dateStart = this.dateStart;
        search.dateEnd = this.dateEnd;
        this.searchService.runSearch(search).subscribe((res: WebResult<any>) => {
          if (res.Status == true) {
            this.presentToastSuccess();
            this.searchService.getHistoryForUser().subscribe((res: WebResult<any>) => {
              this.searchService.searchesForHistory = res.Value;
              this.searchService.changeStatusToString();
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
      color: "primary",
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'סינון',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'נמצאו',
         
        icon: 'search',
        handler: () => {
         this.getFound();
        }
      },{
        text: 'לא נמצאו',
         
        icon: 'search',
        handler: () => {
         this.getNotFound();
        }
      }, {
        text: 'פג תוקף',
         
        icon: 'search',
        handler: () => {
         this.getTimeOver();
        }
      },{
        text: 'בהמתנה',
         
        icon: 'search',
        handler: () => {
         this.getTimeWait();
        }
      },{
        text: 'הכל',
         
        icon: 'search',
        handler: () => {
         this.getAll();
        }
      }, {
        text: 'סגור',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}