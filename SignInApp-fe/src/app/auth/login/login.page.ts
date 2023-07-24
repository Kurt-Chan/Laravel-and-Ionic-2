import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private auth: AuthService,   
    private token: TokenService,   
    private router: Router,
    private toastController: ToastController
  ) { }

    loginForm = new FormGroup({
    'username' : new FormControl('', Validators.required),
    'password' : new FormControl('', Validators.required),
  })


  ngOnInit() {
  }

    loginAcc(value: any) {
      this.auth.login(value).subscribe({
        next: res => {
          console.log("Success Login")
          this.token.saveToken(res.access_token)
          this.router.navigate(['/home']);
          this.loginForm.reset();
        },
        error: err => {
          if (err.status = 401) {
            this.presentToast("Invalid credentials. Please try again.")
          }
          else {
            this.presentToast("Something went wrong. PLease try again.")
          }
        }
    })
    }
  
    async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      color: 'danger',
      icon: 'alert-circle'
    });

    await toast.present();
  }


}
