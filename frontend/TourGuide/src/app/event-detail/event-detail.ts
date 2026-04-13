import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event-service';

@Component({
  selector: 'app-event-detail',
  imports: [],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail {
  router = inject(Router);
  eventService = inject(EventService);

  eventId = signal<string | null>(null);
  isEditing = signal(false);

  title = signal('Sommer Night Walk');
  date = signal('2026-06-18');
  location = signal('Berlin, Mitte');
  description = signal(
    'Dies ist eine Beispielbeschreibung. Hier kannst du später die vollständigen Event-Informationen anzeigen lassen.',
  );
  status = signal('Offen');

  constructor(private route: ActivatedRoute) {
    this.eventId.set(this.route.snapshot.paramMap.get('id'));
  }

  toggleEdit() {
    this.isEditing.update((value) => !value);
  }

  saveEdit() {
    this.isEditing.set(false);
    const eventId = this.eventId();
    if (!eventId) {
      return;
    }
    this.eventService.updateEvent(eventId, this.title(), this.description());
  }

  async cancleEvent() {
    const eventId = this.eventId();
    if (eventId == null) throw new Error('No event id available');

    await this.eventService.cancleEvent(eventId);
    await this.goToYourEvents();
  }

  async goToYourEvents() {
    await this.router.navigate(['promoter-home']);
  }
}
