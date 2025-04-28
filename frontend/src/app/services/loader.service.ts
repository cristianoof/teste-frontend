import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingCounterBS = new BehaviorSubject<number>(0);

  loadingCounter$ = this.loadingCounterBS.asObservable();

  constructor() {}

  show(): void {
    const currentCount = this.loadingCounterBS.value + 1;
    this.loadingCounterBS.next(currentCount);
  }

  hide(): void {
    const currentCount = Math.max(0, this.loadingCounterBS.value - 1);
    this.loadingCounterBS.next(currentCount);
  }

  reset(): void {
    this.loadingCounterBS.next(0);
  }
}
