import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  isAlertOpen: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }


  signInForm = new FormGroup({
    'firstName' : new FormControl('', Validators.required),
    'lastName' : new FormControl('', Validators.required),
    'gender' : new FormControl('', Validators.required),
    'email' : new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    'username' : new FormControl('', Validators.required),
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    ]),
    'terms': new FormControl(false, Validators.pattern('true'))
  })

    validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' }
    ],
    'firstName': [
      { type: 'required', message: 'First name is required.' }
    ],
    'lastName': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'gender': [
      { type: 'required', message: 'Gender is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

  ngOnInit() {
  }

  createAcc(value: any) {
    this.auth.signin(value).subscribe({
      next: res => {
        this.presentAlert();
        this.signInForm.reset();
      },
      error: err => {
        if (err.status = 500) {
          this.presentToast("Uh oh! Something went wrong.")
        }
      }
    })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
  

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      message: 'You\'re account is successfully registered! Proceed to login to continue.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Okay',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ],
    });

    await alert.present();
  }

}
