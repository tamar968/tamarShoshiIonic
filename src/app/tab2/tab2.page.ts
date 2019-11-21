import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ShopService } from '../services/shop.service';
import { Search } from '../models/Search';
import { WebResult } from '../models/WebResult';
import { SearchService } from '../services/search.service';
import { SearchDetailsForUser } from '../models/search-details-for-user';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentImage: any;
  
  arrayStatus: string[] = [];;
  constructor(public photoService: PhotoService, private searchService: SearchService, private alertCtrl: AlertController) { 
 
  }

  ngOnInit() {
    this.photoService.loadSaved();
       this.getAll();
  }
  getAll() {
    this.searchService.getHistoryForUser().subscribe((res: WebResult<SearchDetailsForUser[]>) => {
      this.searchService.searchesForHistory = res.Value;
      console.log("before reverse :");
      console.log(this.searchService.searchesForHistory);
      this.searchService.searchesForHistory.reverse();
      console.log("after  reverse: ");
      this.changeStatusToString();
    })
  }
  getFound() {
    this.searchService.getFound().subscribe((res: WebResult<SearchDetailsForUser[]>) => {
      this.searchService.searchesForHistory = res.Value;
      debugger
      this.changeStatusToString();

    })
  }
  getNotFound() {
    this.searchService.getNotFound().subscribe((res: WebResult<SearchDetailsForUser[]>) => {
      this.searchService.searchesForHistory = res.Value;
      this.changeStatusToString();

    })
  }
  changeStatusToString() {
    while ( this.arrayStatus.length) {
      this.arrayStatus.pop();
    }
    this.searchService.searchesForHistory.forEach(element => {
      if (element.status == 1) {
        this.arrayStatus.push("נמצא");
      }
      else {
        this.arrayStatus.push("מחפש");
      }
    });
  }
  async remove(item: Search) {
    const alert = await this.alertCtrl.create(<AlertOptions>{
      title: 'מחיקת חיפוש',
      message: `<h3> האם אתה בטוח במחיקת חיפוש ה${item.nameProduct}?</h3>`,
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
            this.searchService.Delete(item.codeSearch).subscribe((res: WebResult<any>) => {
              console.log("after delete" + res.Message);
              this.getAll();
            });

          }
        }
      ]
    });
    await alert.present();
  }



}