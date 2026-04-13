import { inject, Injectable, signal } from '@angular/core';
import { User } from 'firebase/auth';
import { EventInterface } from '../interfaces/event.interface';
import { AuthService } from './auth-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  authService = inject(AuthService);
  participatingEventId = signal<string | null>('null');
  private readonly apiBase = environment.production ? '/api' : 'http://127.0.0.1:5002/api';

  setParticipatingEvent(eventId: string) {
    this.participatingEventId.set(eventId);
  }

  clearParticipatingEvent() {
    this.participatingEventId.set(null);
  }

  async getAllEvents(): Promise<EventInterface[]> {
    const endpoint = `${this.apiBase}/events`;
    const res = await fetch(endpoint, {
      method: 'GET',
    });

    const data = await res.json();
    console.log(data);
    return Array.isArray(data) ? data : [];
  }

  async getEventsByUserId(userId: string): Promise<EventInterface[]> {
    const endpoint = `${this.apiBase}/events/${userId}`;
    const res = await fetch(endpoint, {
      method: 'GET',
    });

    const data = await res.json();
    console.log(data);
    return Array.isArray(data) ? data : [];
  }

  async getSingleEvent(eventId: string): Promise<EventInterface | null> {
    const events = await this.getAllEvents();
    return events.find((event) => event.id === eventId) ?? null;
  }

  async createEvent(
    promoter: User,
    title: string,
    description: string,
    date: string,
    location: string,
  ) {
    const endpoint = `${this.apiBase}/events`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: promoter.uid,
        title,
        description,
        date,
        location,
        bookingStatus: 'open',
        guideId: '',
      }),
    });

    return res.json();
  }

  async updateEvent(eventId: string, title: string, description: string) {
    const endpoint = `${this.apiBase}/events/${eventId}`;
    const res = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    return res.json();
  }

  async cancleEvent(eventId: string) {
    const endpoint = `${this.apiBase}/events/${eventId}`;
    const res = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookingStatus: 'cancelled',
      }),
    });

    return res.json();
  }

  async updateStatus(eventId: string, preset: string) {
    const endpoint = `${this.apiBase}/events/${eventId}`;
    const res = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookingStatus: preset,
      }),
    });

    return res.json();
  }
}
