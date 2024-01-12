import { Component, OnInit, inject } from '@angular/core';
import { FamousRestaurantsService } from '../../service/famous-restaurants.service';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { StoresPhotosService } from '../../service/stores-photos.service';

@Component({
  selector: 'app-famous',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './famous.component.html',
  styleUrl: './famous.component.css'
})
export class FamousComponent {
  famousRestaurants:any;
  famousService: FamousRestaurantsService =inject(FamousRestaurantsService);
  storePhotoService: StoresPhotosService =inject(StoresPhotosService);
  storePhotos: any;
  hasLoadedFamous : boolean= false;

  ngOnInit() {
    this.storePhotoService.getStoresPhotos().subscribe((response) => {
      this.storePhotos = response;
    });
    this.famousService.getFamousRestaurants()
    .subscribe({
      next: response => {
        setTimeout(() =>{
          console.log(response);
          this.famousRestaurants =response;
          this.hasLoadedFamous=true;
      },500);
      }
    });
  }
  constructor(private titleService: Title) {
    titleService.setTitle("Famous Stores");
}

}
