import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event-service';
import { CommonModule } from '@angular/common';
import { EventInterface } from '../interfaces/event.interface';

@Component({
  selector: 'app-guide-event-detail',
  imports: [CommonModule],
  templateUrl: './guide-event-detail.html',
  styleUrl: './guide-event-detail.css',
})
export class GuideEventDetail implements OnInit {
  router = inject(Router);
  eventService = inject(EventService);
  eventId = signal<string | null>(null);

  isLoading = signal(true);
  title = signal('');
  date = signal('');
  location = signal('');
  description = signal('');

  isUpdatingStatus = signal(false);
  status = signal('Not participating');
  arrivalTime = signal<string | null>(null);

  constructor(private route: ActivatedRoute) {
    this.eventId.set(this.route.snapshot.paramMap.get('id'));
  }

  async ngOnInit() {
    const eventId = this.eventId();
    if (!eventId) {
      this.isLoading.set(false);
      return;
    }

    try {
      const event = await this.eventService.getSingleEvent(eventId);
      if (this.isEvent(event)) {
        this.title.set(event.title);
        this.date.set(event.date);
        this.location.set(event.location);
        this.description.set(event.description);
      }
    } finally {
      this.isLoading.set(false);
    }
  }

  participate() {
    this.isUpdatingStatus.set(false);
    const eventId = this.eventId();
    if (eventId) {
      this.eventService.setParticipatingEvent(eventId);
    }
  }

  startUpdateStatus() {
    this.isUpdatingStatus.set(true);
  }

  setArrivalPreset(preset: string) {
    this.arrivalTime.set(preset);
  }

  async saveArrival() {
    const eventId = this.eventId();
    if (eventId == null) throw new Error('no event id available');

    const arrivalTime = this.arrivalTime();
    if (arrivalTime == null) throw new Error('no preset for arrival time was set');

    if (this.arrivalTime() === 'cancel') {
      await this.eventService.cancleEvent(eventId);
      this.isUpdatingStatus.set(false);
    } else {
      this.isUpdatingStatus.set(false);
      await this.eventService.updateStatus(eventId, arrivalTime);
    }
  }

  async goToEventList() {
    await this.router.navigate(['guide-home']);
  }

  private isEvent(value: unknown): value is EventInterface {
    return (
      typeof value === 'object' &&
      value !== null &&
      'title' in value &&
      'description' in value &&
      'date' in value &&
      'location' in value
    );
  }
}
