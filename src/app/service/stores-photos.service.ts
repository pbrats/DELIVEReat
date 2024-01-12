import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoresPhotosService {
  
  private http=inject(HttpClient);
   // an thelo na pairno tis photos apo to json me link
  // private endpointUrl="assets/sample-data/stores_photos.json";
  // an thelo na pairno tis photos apo to json os arxeia
  private endpointUrl="assets/sample-data/stores-photos-files.json";
  
 getStoresPhotos(){
    return this.http.get(this.endpointUrl);
  }
}
