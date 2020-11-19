import { Injectable } from '@angular/core';
import { Calendar } from '@ionic-native/calendar';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
private calandar :Calendar;
  constructor() { }
}
