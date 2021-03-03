import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShopDetailsForUsers } from '../models/ShopDetailsForUsers';
import { Search } from '../models/Search';
import { User } from '../models/user';
import { SearchDetailsForUser } from '../models/search-details-for-user';
// import { NewSearchComponent } from '../new-search/new-search.component';
import { ModalController } from '@ionic/angular';
import { EStatus } from '../models/EStatus';


@Injectable({
  providedIn: 'root'
})

export class SearchService {


  private baseUrl = 'http://localhost:55505/';
  myModal: HTMLIonModalElement;
  statusDict={
    0:"מחפש",
    1:"נמצא",
    2:"נמחק",
    3:"בהמתנה",
    4:"פג תוקף"
  }
  constructor(private myHttp: HttpClient, private modalCtrl: ModalController) {

  }
  currentUserPassword() {
    let userDetailsJson =  localStorage.getItem('userDetails');
    if(!userDetailsJson){
      return "123456";
    }
    let userDetails: User = JSON.parse(userDetailsJson);
    return userDetails.passwordUser;
  }
  searchesForHistory: SearchDetailsForUser[];
  arrayStatus: string[] = [];

  GetCategories() {
    return this.myHttp.get(`${this.baseUrl}WebService/Searches/GetCategories`);
  }
  getShopsForCategory(codeCategory: number) {
    return this.myHttp.get(`${this.baseUrl}WebService/Searches/getShopsForCategory?codeCategory=${codeCategory}`);
  };
  runSearch(search: Search) {
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/RunSearch`, { search: search, passwordUser: this.currentUserPassword() });
  }
  updateSearchStatus(codeSearch, status, mailShop) {
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/UpdateSearchStatus`, { codeSearch: codeSearch, status: status, mailShop: mailShop });
  }
  updateAllSearchStatus() {
    return this.myHttp.get(`${this.baseUrl}WebService/Searches/UpdateAllSearchStatus`);
  }
  getHistoryForUser() {

    return this.myHttp.post(`${this.baseUrl}WebService/Searches/GetHistory`, this.currentUserPassword());
  }

  getFound() {
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/GetHistoryFound`, this.currentUserPassword());
  }

  getNotFound() {
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/GetHistoryNotFound`, this.currentUserPassword());
  }
  Delete(codeSearch: number) {
    return this.myHttp.get(`${this.baseUrl}WebService/Searches/Delete?codeSearch=${codeSearch}`);

  }
  getByStatus(status: number) {
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/SearchByStatus`,
      {
        userPassword: this.currentUserPassword(),
        status: status
      });
  }
  register(user: User) {
    return this.myHttp.post(`${this.baseUrl}WebService/User/Register`, user);
  }
  changeStatusToString() {
    this.arrayStatus = [];
    this.searchesForHistory.forEach(element => {
      switch (element.status) {
        case EStatus.NotFound: {
          this.arrayStatus.push("מחפש");
          break;
        }
        case EStatus.Found: {
          this.arrayStatus.push("נמצא");
          break;
        }
        case EStatus.TimeOver: {
          this.arrayStatus.push("פג תוקף");
          break;
        }
        case EStatus.TimeWait: {
          this.arrayStatus.push("בהמתנה");
          break;
        }
        default:;
      }

    });
  }
  // async openNewSearchModal(dateStart: Date,dateEnd:Date) {

  //    this.myModal = await this.modalCtrl.create({
  //     component: NewSearchComponent
  //     //, componentProps: { dateStart, dateEnd }
  //   });

  //   this.myModal.present();
  //   // setTimeout(function () {
  //   //   myModal.dismiss();
  //   // }, 5000)
  //   const event: any = await this.myModal.onDidDismiss();

  // }
}
