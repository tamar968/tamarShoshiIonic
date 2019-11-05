import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShopDetailsForUsers } from '../models/ShopDetailsForUsers';
import { Search } from '../models/Search';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  private baseUrl = 'http://localhost:55505/';
  constructor(private myHttp: HttpClient) { }

  GetCategories(){
    return this.myHttp.get(`${this.baseUrl}WebService/Searches/GetCategories`);
  }
  getShopsForCategory(codeCategory:number) {
    return this.myHttp.get(`${this.baseUrl}WebService/Searches/getShopsForCategory?codeCategory=${codeCategory}`);
  };
  runSearch(search:Search){
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/RunSearch`,search);
  }

  getHistoryForUser(){
    return this.myHttp.get(`${this.baseUrl}WebService/Searches/GetHistory`);
  }

  getFound(){
    return this.myHttp.get(`${this.baseUrl}WebService/Searches/GetHistoryFound`);
  }

  getNotFound(){
    return this.myHttp.get(`${this.baseUrl}WebService/Searches/GetHistoryNotFound`);
  }
}
