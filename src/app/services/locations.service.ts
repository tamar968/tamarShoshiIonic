import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebResult } from '../models/WebResult';
import { UserAndLocation } from '../models/user-and-location';

@Injectable({
  providedIn: 'root'
})
export class LocationsService{
  

  private baseUrl = 'http://localhost:55505/';
  lng:any;
  lat:any;
  lastLng:any=0;
  lastLat:any=0;
  constructor(private myHttp: HttpClient) { }
  checkDistance(lng,lat){
    var locationAndUser: UserAndLocation = new UserAndLocation();
    locationAndUser.uuid = "456";
    locationAndUser.lng = lng;
    locationAndUser.lat = lat;
    return this.myHttp.post(`${this.baseUrl}WebService/Searches/CheckDistance`,locationAndUser);
  }
  distance() { 
    //setInterval(function(){
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude; 
        //if the location changed from last time       
        if(this.lng!=this.lastLng||this.lat!=this.lastLat){
          console.log(this.lat + " " + this.lng);
          this.checkDistance(this.lng, this.lat).subscribe((res: WebResult) => {
            //if res.value is not null, then we found a shop
            if(res.Value){
              console.log(res.Value);
            }

            this.lastLng = this.lng;
            this.lastLat = this.lat;
          })
        }
        
      });
      
    }
   //}, 3000);
    
  }
  
}
