import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestMethod, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  public categoriesForShop: Category[];

  private baseUrl = 'http://localhost:55505/';
  constructor(private myHttp: Http) { }
  ngOninit() { }

  getAllCategories() {
    return this.myHttp.get(`${this.baseUrl}WebService/Shops/GetAllCategories`);
  };
}




