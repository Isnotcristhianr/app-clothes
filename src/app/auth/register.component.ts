import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'ns-register',
  template: `
    <StackLayout class="p-4">
      <TextField [(ngModel)]="email" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" class="input mb-2"></TextField>
      <TextField [(ngModel)]="password" hint="Password" secure="true" class="input mb-2"></TextField>
      <Button text="Register" (tap)="onRegister()" class="btn btn-primary mb-2"></Button>
      <Button text="Back to Login" (tap)="onBackToLogin()" class="btn btn-secondary"></Button>
    </StackLayout>
  `
})
export class RegisterComponent {
  email: string;
  password: string;

  constructor(private authService: AuthService, private routerExtensions: RouterExtensions) {}

  onRegister() {
    this.authService.register(this.email, this.password)
      .then(() => this.routerExtensions.navigate(['/clothing'], { clearHistory: true }))
      .catch(error => console.error('Registration error:', error));
  }

  onBackToLogin() {
    this.routerExtensions.back();
  }
}