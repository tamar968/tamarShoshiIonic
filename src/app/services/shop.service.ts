import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { HttpClient } from '@angular/common/http';
import { Search } from '../models/Search';
import { ShopDetailsForUsers } from '../models/ShopDetailsForUsers';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  public categoriesForShop: Category[];

  public shopDetailForUsers: ShopDetailsForUsers[]=[];


  private baseUrl = 'http://localhost:55505/';
  constructor(private myHttp: HttpClient) { }
  ngOninit() { }



}