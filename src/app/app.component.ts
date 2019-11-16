import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './models/user';
import { WebResult } from './models/WebResult';
import { SearchService } from './services/search.service';
import { AlertOptions } from '@ionic/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private searchService: SearchService,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
    if(localStorage.getItem("user")==null)
      this.presentAlert()
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
             // if (User.isValid(data.username, data.password)) {
             //   // logged in!
             // } else {
             //   // invalid login
             //   return false;
             // }
             localStorage.setItem('user',data.passwordUser);
             console.log(localStorage.user);
             this.user.nameUser = data.nameUser;
             this.user.mailUser = data.mailUser;
             this.user.phoneUser = data.phoneUser;
             this.user.passwordUser = data.passwordUser;
             this.searchService.register(this.user)
             .subscribe((res: WebResult<User>) => { 
               console.log(res.Value);
              });
           }
         }
       ]
     });
     await alert.present();
   }

  
}
