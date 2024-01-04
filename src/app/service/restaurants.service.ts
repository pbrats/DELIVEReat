import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  
  private http=inject(HttpClient);
  private endpointUrl="assets/sample-data/stores.json";

  constructor() { }

  getRestaurants(){
    return this.http.get(this.endpointUrl);
  }
}
