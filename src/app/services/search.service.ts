import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShopDetailsForUsers } from '../models/ShopDetailsForUsers';
import { Search } from '../models/Search';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl = 'http://localhost:55505/';
  constructor(private myHttp: HttpClient) {

   }

   currentUserPassword:string = localStorage.getItem('user');
  GetCategories(){
    return this.myHttp.get(`${this.baseUrl}WebService/Searches/GetCategories`);
  }
  getShopsForCategory(codeCategory:number) {
    return this.myHttp.get(`${this.baseUrl}WebService/Searches/getShopsForCategory?codeCategory=${codeCategory}`);
  };
  runSearch(search:Search){
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/RunSearch`,{search:search, passwordUser:this.currentUserPassword});
  }

  getHistoryForUser(){
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/GetHistory`,this.currentUserPassword);
  }

  getFound(){
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/GetHistoryFound`,this.currentUserPassword);
  }

  getNotFound(){
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/GetHistoryNotFound`,this.currentUserPassword);
  }
  
  register(user: User){
    return this.myHttp.post(`${this.baseUrl}WebService/User/Register`,user);
  }
}
