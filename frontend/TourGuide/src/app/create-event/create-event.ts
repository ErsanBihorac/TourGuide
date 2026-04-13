import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, required, submit, FormField } from '@angular/forms/signals';
import { EventInterface } from '../interfaces/event.interface';
import { timestamp } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
import { AuthService } from '../services/auth-service';
import { EventService } from '../services/event-service';

@Component({
  selector: 'app-create-event',
  imports: [FormField],
  templateUrl: './create-event.html',
  styleUrl: './create-event.css',
})
export class CreateEvent {
  router = inject(Router);
  authService = inject(AuthService);
  eventService = inject(EventService);

  eventModel = signal<EventInterface>({
    promoterId: '',
    id: '',
    title: '',
    description: '',
    date: '',
    location: '',
    bookingStatus: '',
    guideId: '',
  });

  eventForm = form(this.eventModel, (schemaPath) => {
    required(schemaPath.title, { message: 'title  is equired' });
    required(schemaPath.description, { message: 'description is required' });
    required(schemaPath.date, { message: 'date  is equired' });
    required(schemaPath.location, { message: 'location is required' });
  });

  async submitEvent(event: Event) {
    event.preventDefault();
    const promoter = this.authService.currentUser;
    if (promoter == null) return console.log('only logged in users can create events');

    await submit(this.eventForm, async () => {
      const { title, description, date, location } = this.eventModel();

      await this.eventService.createEvent(promoter, title, description, date, location);
      this.eventForm().reset({
        promoterId: '',
        id: '',
        title: '',
        description: '',
        date: '',
        location: '',
        bookingStatus: '',
        guideId: '',
      });
    });
  }

  async goToYourEvents() {
    await this.router.navigate(['promoter-home']);
  }
}
