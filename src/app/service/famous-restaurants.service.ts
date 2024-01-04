import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FamousRestaurantsService {

  private http=inject(HttpClient);
  private endpointUrl="assets/sample-data/most_famous_stores_in_general.json";

  constructor() { }

  getFamousRestaurants(){
    return this.http.get(this.endpointUrl);
  }
}
