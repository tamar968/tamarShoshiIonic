import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ShopService } from '../services/shop.service';
import { Search } from '../models/Search';
import { WebResult } from '../models/WebResult';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentImage: any;
  searches: Search[];

  constructor(public photoService: PhotoService, private service: ShopService) {  }

  ngOnInit() {
    this.photoService.loadSaved();
    this.getHistory();
  }
  getHistory() {
    this.service.getHistoryForUser().subscribe((res:WebResult)=>{
      this.searches=res.Value;
    })
  }


}