import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ShopService } from '../services/shop.service';
import { Search } from '../models/Search';
import { WebResult } from '../models/WebResult';
import { SearchService } from '../services/search.service';
import { SearchDetailsForUser } from '../models/search-details-for-user';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentImage: any;
  searches: SearchDetailsForUser[];

  constructor(public photoService: PhotoService, private searchService: SearchService) {  }

  ngOnInit() {
    this.photoService.loadSaved();
    this.getAll();
  }
  getAll() {
    this.searchService.getHistoryForUser().subscribe((res:WebResult<SearchDetailsForUser[]>)=>{
      this.searches=res.Value;
      console.log(this.searches);
    })
  }
  getFound(){
    this.searchService.getFound().subscribe((res:WebResult<SearchDetailsForUser[]>)=>{
      this.searches = res.Value;
      console.log(this.searches);
    })
  }
  getNotFound(){
    this.searchService.getNotFound().subscribe((res:WebResult<SearchDetailsForUser[]>)=>{
      this.searches = res.Value;
      console.log(this.searches);
    })
  }



}