import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesPhotoService {

  private http=inject(HttpClient);
  // an thelo na pairno tis photos apo to json me link
  // private endpointUrl="assets/sample-data/categories_photos.json";
  // an thelo na pairno tis photos apo to json os arxeia
  private endpointUrl="assets/sample-data/categ-photos-files.json";

 getCategoriesPhotos(){
    return this.http.get(this.endpointUrl);
  }
}
