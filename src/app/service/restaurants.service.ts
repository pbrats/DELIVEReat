import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private endpointUrl="assets/sample-data/stores.json";

  constructor(private http:HttpClient) { }

  getRestaurants(){
    return this.http.get(this.endpointUrl);
  }
}
