import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: any = [];
  isLoaded: boolean = false;

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,) { }

  ngOnInit() {
    this.isLoaded = true;
    
    this.auth.isLoggedIn().subscribe({
      next: res => {
        console.log(res)
        this.user.push(res)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      icon: 'alert-circle'
    });

    await toast.present();
  }

    async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Logout',
      backdropDismiss: false,
      message: 'If you`d still go, I`ll understand and if you`ll stay, I`ll hold your hand.',
      buttons: [
        {
          text: 'I`m going',
          role: 'confirm',
          handler: () => {
            this.auth.logout().subscribe({
              next: res => {
                console.log(res)
                this.router.navigate(['/login'])
                this.token.clearLocalStorage()
              },
              error: err => {
                console.error(err)
              }
            })
          }
        },
        {
          text: 'I`ll stay',
          role: 'cancel',
        }
      ],
    });

    await alert.present();
  }

}
