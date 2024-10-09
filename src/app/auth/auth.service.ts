import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  login(email: string, password: string): Promise<any> {
    // Simulate login
    const user = { email, uid: 'simulated-uid' };
    this.currentUserSubject.next(user);
    return Promise.resolve(user);
  }

  register(email: string, password: string): Promise<any> {
    // Simulate registration
    const user = { email, uid: 'simulated-uid' };
    this.currentUserSubject.next(user);
    return Promise.resolve(user);
  }

  logout(): Promise<void> {
    this.currentUserSubject.next(null);
    return Promise.resolve();
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}