import { Component, OnInit } from '@angular/core';

import { Platform, AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './models/user';
import { WebResult } from './models/WebResult';
import { SearchService } from './services/search.service';
import { AlertOptions } from '@ionic/core';
import { LocationsService } from './services/locations.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    
  }
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private searchService: SearchService,
    private alertCtrl: AlertController,
    private locationsService: LocationsService,
    public toastController: ToastController
  ) {
    
    this.initializeApp();
    if (localStorage.getItem("user") == null)
      this.presentAlert();
    else
      this.locationsService.distance();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }
  //For register!!!!!!!!!!!---------------------------
  user: User = new User();
  async presentAlert() {
    const alert = await this.alertCtrl.create(<AlertOptions>{
      title: 'הרשמה',
      header: 'הרשמה',
      enableBackdropDismiss: false,
      backdropDismiss: false,
      inputs: [
        {
          name: 'nameUser',
          placeholder: 'שם משתמש'
        },
        {
          name: 'mailUser',
          placeholder: 'כתובת מייל',
          type: 'email'
        },
        {
          name: 'phoneUser',
          placeholder: 'טלפון'
        },
        {
          name: 'passwordUser',
          placeholder: 'סיסמה',
          type: 'password'
        }
      ],
      buttons: [

        {
          text: 'הרשם',
          handler: data => {
            if (data.nameUser && data.mailUser && data.phoneUser && data.passwordUser) {
              // logged in!
              localStorage.setItem('user', data.passwordUser);
              console.log(localStorage.user);
              this.user.nameUser = data.nameUser;
              this.user.mailUser = data.mailUser;
              this.user.phoneUser = data.phoneUser;
              this.user.passwordUser = data.passwordUser;
              this.searchService.register(this.user)
                .subscribe((res: WebResult<User>) => {
                  console.log(res.Value);
                  //הפעלת הפונקציה שבודקת כל הזמן
                  this.locationsService.distance();
                });
            } else {
              // invalid login
              this.presentToast();
              return false;
            }

          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'מלא את השדות',
      color: "primary",
      duration: 2000
    });
    toast.present();
  }

}
