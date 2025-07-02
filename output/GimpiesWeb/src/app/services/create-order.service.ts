// shared/create-order.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateOrderService {
  showPanel$ = new BehaviorSubject<boolean>(false);

  openPanel() {
    this.showPanel$.next(true);
  }

  closePanel() {
    this.showPanel$.next(false);
  }
}
