import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesPhotoService {

  private http = inject(HttpClient);
  private endpointUrl = "assets/sample-data/categ-photos.json";

  getCategoriesPhotos() {
    return this.http.get(this.endpointUrl);
  }
}