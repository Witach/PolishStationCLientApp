import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppLoadService {

  constructor(private httpClient: HttpClient) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!window.navigator.onLine) {
        window.location.href = 'http://localhost:4200/assets/offline-page.html'; // this would probably be something like 'yourURL/assets/offline-page.html'
      }
      resolve();
    });
  }
}
