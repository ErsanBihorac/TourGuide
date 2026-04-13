import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { EventService } from '../services/event-service';
import { EventInterface } from '../interfaces/event.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guide-home',
  imports: [RouterLink, DatePipe],
  templateUrl: './guide-home.html',
  styleUrl: './guide-home.css',
})
export class GuideHome implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  eventService = inject(EventService);
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
    const outfits = await this.eventService.getAllEvents();
    this.events.set(Array.isArray(outfits) ? outfits : []);
  }

  async goToYourEvent() {
    const firstEvent = this.events()[0];
    if (!firstEvent?.id) {
      return;
    }
    await this.router.navigate(['guide-events', firstEvent.id]);
  }

  async signout() {
    await this.authService.signout();
    this.router.navigate(['register']);
  }
}
