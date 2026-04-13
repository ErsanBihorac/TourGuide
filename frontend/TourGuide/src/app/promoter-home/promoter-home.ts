import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Timestamp } from 'firebase/firestore';
import { EventInterface } from '../interfaces/event.interface';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Subscription } from 'rxjs';
import { EventService } from '../services/event-service';

@Component({
  selector: 'app-promoter-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './promoter-home.html',
  styleUrl: './promoter-home.css',
})
export class PromoterHome implements OnInit {
  authService = inject(AuthService);
  eventService = inject(EventService);
  router = inject(Router);

  events = signal<EventInterface[]>([]);

  private sub?: Subscription;

  ngOnInit() {
    this.sub = this.authService.user$.subscribe(async (user) => {
      if (!user?.uid) return;

      await this.updateEventsArray();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  async updateEventsArray() {
    const userId = this.authService.currentUser?.uid;
    if (userId == null) throw new Error('user is not available');

    const outfits = await this.eventService.getEventsByUserId(userId);
    this.events.set(Array.isArray(outfits) ? outfits : []);
  }

  async goToCreateEvent() {
    await this.router.navigate(['create-event']);
  }

  async signout() {
    await this.authService.signout();
    this.router.navigate(['register']);
  }
}
