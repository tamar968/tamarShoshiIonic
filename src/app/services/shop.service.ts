import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  public categoriesForShop: Category[];
  httpOptions;
  private baseUrl = 'http://localhost:55505/';
  constructor(private myHttp: HttpClient) { }


  getAllCategories() {
    return this.myHttp.get(`${this.baseUrl}WebService/Shops/GetAllCategories`);
  }


  
}
