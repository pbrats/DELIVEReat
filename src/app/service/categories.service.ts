
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  private endpointUrl="assets/sample-data/most_famous_stores_in_general.json";
  constructor(private http: HttpClient) {}
  getCategories(): Observable<any> {
    return this.http.get(this.endpointUrl);
  }
  categoryExists(selectedCat: string): Observable<boolean> {
    return this.getCategories().pipe(
      map(categories => categories.some((category: any) => category.category === selectedCat))
  );
  }
}
