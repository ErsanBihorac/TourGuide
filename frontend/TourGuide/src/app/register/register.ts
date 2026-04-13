import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [NgClass],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  router = inject(Router);
  authService = inject(AuthService);
  role = signal<string | null>(null);

  setRole(role: string) {
    this.role.set(role);
  }

  async signin() {
    if (this.role() === 'guide') {
      await this.guideSignin();
    } else if (this.role() === 'promoter') {
      await this.promoterSignin();
    }
  }

  async guideSignin() {
    const user = await this.authService.signinAsGuide();

    if (!user) throw new Error('Could not receive user from Service');

    this.router.navigate(['guide-home']);
  }

  async promoterSignin() {
    const user = await this.authService.signinAsPromoter();

    if (!user) throw new Error('Could not receive user from Service');

    this.router.navigate(['promoter-home']);
  }
}
