import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DualToggleEventService {
  toggleEvent = new BehaviorSubject<string>('list');
  toggleEvent$ = this.toggleEvent.asObservable();

  constructor() { }
}
