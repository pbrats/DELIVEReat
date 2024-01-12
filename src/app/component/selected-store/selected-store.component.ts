import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../../service/restaurants.service';
import { Title } from '@angular/platform-browser';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-selected-store',
  standalone: true,
  imports: [CommonModule,MenuComponent],
  templateUrl: './selected-store.component.html',
  styleUrl: './selected-store.component.css'
})
export class SelectedStoreComponent {
  activatedRoute =inject(ActivatedRoute);
  selectedStore: string | undefined ;
  items: any[]=[];
  router: Router =inject(Router);
  storesService: RestaurantsService  =inject(RestaurantsService);

  constructor(private titleService: Title) {}
  
  ngOnInit(): void {
    // this.storePhotoService.getStoresPhotos().subscribe((response) => {
    //   this.storePhotos = response;
    // });
    this.activatedRoute.params.subscribe((params:any) => {
          console.log(params);
         
          this.selectedStore = params.name;
          console.log(this.selectedStore);
          this.titleService.setTitle(`${this.selectedStore}`);
          this.storesService.getRestaurants().subscribe((data:any) => {
            this.items = data.filter((item:any) => item.name === this.selectedStore);
            console.log(this.items);
          });
      });
    }
}
