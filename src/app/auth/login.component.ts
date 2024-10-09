import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'ns-login',
  template: `
    <StackLayout class="p-4">
      <TextField [(ngModel)]="email" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" class="input mb-2"></TextField>
      <TextField [(ngModel)]="password" hint="Password" secure="true" class="input mb-2"></TextField>
      <Button text="Login" (tap)="onLogin()" class="btn btn-primary mb-2"></Button>
      <Button text="Register" (tap)="onRegister()" class="btn btn-secondary"></Button>
    </StackLayout>
  `
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private authService: AuthService, private routerExtensions: RouterExtensions) {}

  onLogin() {
    this.authService.login(this.email, this.password)
      .then(() => this.routerExtensions.navigate(['/clothing'], { clearHistory: true }))
      .catch(error => console.error('Login error:', error));
  }

  onRegister() {
    this.routerExtensions.navigate(['/register']);
  }
}