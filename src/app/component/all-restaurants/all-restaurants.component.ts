import { Component, inject } from '@angular/core';
import { RestaurantsService } from '../../service/restaurants.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { StoresPhotosService } from '../../service/stores-photos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-restaurants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-restaurants.component.html',
  styleUrl: './all-restaurants.component.css'
})
export class AllRestaurantsComponent {
  restaurants:any;
  restaurantsService: RestaurantsService =inject(RestaurantsService);
  storePhotoService: StoresPhotosService =inject(StoresPhotosService);
  storePhotos: any;
  hasLoadedStores : boolean= false;
  router: Router =inject(Router);
  activatedRoute =inject(ActivatedRoute);

  ngOnInit() {
    this.storePhotoService.getStoresPhotos().subscribe((response) => {
      this.storePhotos = response;
    });
    this.restaurantsService.getRestaurants()
    .subscribe({
      next: response => {
        setTimeout(() =>{
          console.log(response);
          this.restaurants =response;
          this.hasLoadedStores=true;
        },500);
      }
    });
  } 
  constructor(private titleService: Title) {
    titleService.setTitle("Stores");
}
onStoreClick(name: string) {
  this.router.navigate(["stores",name]);
}
}

