import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private dataSubject = new BehaviorSubject<any>('');
  setData(data: any) {
    this.dataSubject.next(data);
  }
  getData() {
    return this.dataSubject.asObservable();
  }
}
