import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { HttpClient } from '@angular/common/http';
import { Search } from '../models/Search';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  public categoriesForShop: Category[];

  private baseUrl = 'http://localhost:55505/';
  constructor(private myHttp: HttpClient) { }
  ngOninit() { }

  getAllCategories() {
    return this.myHttp.get(`${this.baseUrl}WebService/Shops/GetAllCategories`);
  };




  runSearch(search:Search){
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/RunSearch`,search);
  }

  getHistoryForUser(){
    return this.myHttp.get(`${this.baseUrl}WebService/Searches/GetHistory`);
  }

}