import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Search } from '../models/Search';
import { NewSearchComponent } from './new-search.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // RouterModule.forChild([{ path: '', component: NewSearchComponent }])
  ],
  declarations: [NewSearchComponent]
})
export class NewSearchModule {}
