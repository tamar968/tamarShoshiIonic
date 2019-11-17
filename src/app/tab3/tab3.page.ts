import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
declare var google;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  @ViewChild('map') mapElement: ElementRef;
  private afterViewInitSubject: Subject<any> = new Subject();

  ngAfterViewInit() {
    this.afterViewInitSubject.next(true);
  }
  constructor() {
    this.ionViewDidLoad()

  }
  map: any;
  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let latLng;// = new google.maps.LatLng(-34.9290, 138.6010);
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        // alert(latLng)
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        if (this.mapElement) {
          /* ... */
          this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        } else {
          this.afterViewInitSubject.subscribe(() => {
            /* ... */
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
          });
        }
      })
    }
    setTimeout(() => {
      this.addMarker();
    }, 3000);

  }
  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    let content;
    if (3 < 5) {
      content = "<h4>YOU ARE HERE</h4>";
    }
    else {
      content = "<h4>YOU ARE THERE</h4>";
    }

    this.addInfoWindow(marker, content);

  }
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
}
