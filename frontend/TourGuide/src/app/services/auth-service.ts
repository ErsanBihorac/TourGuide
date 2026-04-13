import { inject, Injectable } from '@angular/core';
import {
  Auth,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  browserPopupRedirectResolver,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);

  private readonly _user$ = new BehaviorSubject<User | null>(null);
  user$ = this._user$.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        this._user$.next(user);
      } else {
        this._user$.next(null);
      }
    });
  }

  get currentUser() {
    return this._user$.value;
  }

  async signinAsGuide() {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(this.auth, provider, browserPopupRedirectResolver);
    console.log('signed in as a guide');
    return user;
  }

  async signinAsPromoter() {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(this.auth, provider, browserPopupRedirectResolver);
    console.log('signed in as promoter');
    return user;
  }

  async signout() {
    await signOut(this.auth);
    console.log('logged out');
  }
}
