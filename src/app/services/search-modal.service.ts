import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShopDetailsForUsers } from '../models/ShopDetailsForUsers';
import { Search } from '../models/Search';
import { User } from '../models/user';
import { SearchDetailsForUser } from '../models/search-details-for-user';
// import { NewSearchComponent } from '../new-search/new-search.component';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
@NgModule(
  {
    // entryComponents:[NewSearchComponent]
  }
)
export class SearchModalService {
  private baseUrl = 'http://localhost:55505/';
  myModal: HTMLIonModalElement;
  constructor(private myHttp: HttpClient, private modalCtrl:ModalController) {

  }
  currentUserPassword()
  {
    // return localStorage.getItem('user');
    return "123456";
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

  getHistoryForUser() {

    return this.myHttp.post(`${this.baseUrl}WebService/Searches/GetHistory`, this.currentUserPassword());
  }

  getFound() {
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/GetHistoryFound`, this.currentUserPassword());
  }

  getNotFound() {
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/GetHistoryNotFound`, this.currentUserPassword());
  }
  Delete(codeSearch:number) {
    return this.myHttp.get(`${this.baseUrl}WebService/Searches/Delete?codeSearch=${codeSearch}`);

  }
  register(user: User) {
    return this.myHttp.post(`${this.baseUrl}WebService/User/Register`, user);
  }
 
  // async openNewSearchModal(dateStart: Date,dateEnd:Date) {

  //    this.myModal = await this.modalCtrl.create({
  //     component: NewSearchComponent
  //     , componentProps: { dateStart, dateEnd }
  //   });

  //   this.myModal.present();
  //   // setTimeout(function () {
  //   //   myModal.dismiss();
  //   // }, 5000)
  //   const event: any = await this.myModal.onDidDismiss();
 
  // }
  
  async setModal(modal:HTMLIonModalElement) {

    return this.myModal = modal ;
  //  const event: any = await this.myModal.onDidDismiss();
 }
 
}
