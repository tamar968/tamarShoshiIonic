import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
// import { NewSearchModule } from '../new-search/new-saerch.module';
import { Calendar } from '@ionic-native/calendar';
// import { NgCalendarModule } from 'ionic2-calendar';


// Calendar UI Module
import { CalendarModule } from 'ion2-calendar';
import { NewSearchComponent } from '../new-search/new-search.component';
import { NewSearchModule } from '../new-search/new-saerch.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // NgCalendarModule,
    NewSearchModule,
    CalendarModule,
    NewSearchModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  entryComponents:[NewSearchComponent],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
