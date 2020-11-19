import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule} from '@angular/forms'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
// import { NewSearchComponent } from './new-search/new-search.component';
// import { Calendar } from '@ionic-native/calendar'

// Calendar UI Module
import { CalendarModule } from 'ion2-calendar';
// Calendar UI Module
// import { NgCalendarModule } from 'ionic2-calendar';
import { from } from 'rxjs';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      FormsModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxG3TDFOXmRB5XpG9Yfh40VCs5Aqr93jo',
      libraries: ['places']
    }),
CalendarModule,
    // NgCalendarModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    // Calendar,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
