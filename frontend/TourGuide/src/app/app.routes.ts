import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => {
      return import('./register/register').then((c) => c.Register);
    },
  },
  {
    path: 'promoter-home',
    loadComponent: () => {
      return import('./promoter-home/promoter-home').then((c) => c.PromoterHome);
    },
  },
  {
    path: 'promoter-events/:id',
    loadComponent: () => {
      return import('./event-detail/event-detail').then((c) => c.EventDetail);
    },
  },
  {
    path: 'guide-events/:id',
    loadComponent: () => {
      return import('./guide-event-detail/guide-event-detail').then(
        (c) => c.GuideEventDetail,
      );
    },
  },
  {
    path: 'create-event',
    loadComponent: () => {
      return import('./create-event/create-event').then((c) => c.CreateEvent);
    },
  },
  {
    path: 'guide-home',
    loadComponent: () => {
      return import('./guide-home/guide-home').then((c) => c.GuideHome);
    },
  },
];
