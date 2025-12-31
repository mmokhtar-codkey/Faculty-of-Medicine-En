import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app';
import { providePrimeNG } from 'primeng/config';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' })),
     providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'none'
        }
      }
    })
  ]
};
