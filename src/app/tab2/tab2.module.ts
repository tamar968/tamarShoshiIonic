import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { NewSearchComponent } from '../new-search/new-search.component';
import { NewSearchModule } from '../new-search/new-saerch.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NewSearchModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  entryComponents:[NewSearchComponent],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
