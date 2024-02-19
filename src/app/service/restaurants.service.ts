import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private endpointUrl = "assets/sample-data/stores.json";

  constructor(private http: HttpClient) { }

  getRestaurants() {
    return this.http.get(this.endpointUrl);
  }
}