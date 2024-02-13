import { Component, inject } from '@angular/core';
import { RestaurantsService } from '../../service/restaurants.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { StoresInfosService } from '../../service/stores-infos.service';
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
  storeInfosService: StoresInfosService =inject(StoresInfosService);
  storeInfos: any;
  hasLoadedStores : boolean= false;
  router: Router =inject(Router);
  activatedRoute =inject(ActivatedRoute);
  buttonAZClicked:boolean=false;
  buttonZAClicked:boolean=false;
  buttonRatingClicked:boolean=false;
  buttonDeliveryClicked:boolean=false;

  ngOnInit() {
    this.storeInfosService.getStoresInfos().subscribe((response) => {
      this.storeInfos = response;
    });
    this.restaurantsService.getRestaurants()
    .subscribe({
      next: response => {
        setTimeout(() =>{
          console.log(response);
          this.restaurants =response;
          this.restaurants.forEach((restaurant: any) => {
            // console.log('Before replacement - category:', restaurant.category);
            restaurant.category = restaurant.category.replace(/_/g, ' ');
            // console.log('After replacement - category:', restaurant.category);
          });
          // console.log('After replacement:', this.restaurants);
          this.hasLoadedStores=true;
        },500);
      }
    });
  } 
  constructor(private titleService: Title) {
    titleService.setTitle("Stores");
}
  onStoreClick(clickName: string) {
    const foundStore = this.restaurants.find((store: any) => store.name === clickName);
    console.log(foundStore);
    if (foundStore){
      this.router.navigate(["stores",clickName]);
    }else{
      this.router.navigate(["menu-not-found"]);
    }
  }
  sortStoresByRating(): void {
    // if it is already active it deactivates and presents the original data
    if(this.buttonRatingClicked){
      this.buttonRatingClicked=false;
      this.restaurantsService.getRestaurants().subscribe(
        (data) => {
          this.restaurants =data;
          this.restaurants.forEach((restaurant: any) => {
            restaurant.category = restaurant.category.replace(/_/g, ' ');
          });
        }
      );
      // if it is inactive it activates and sorts the data and deactivates the other sort options
    }else{
      this.buttonRatingClicked=true;
      this.buttonDeliveryClicked=false;
      this.buttonZAClicked=false;
      this.buttonAZClicked=false;
      this.restaurants.forEach((restaurant: any) => {
        const matchingStore = this.storeInfos.find((store: { name: any; }) => store.name === restaurant.name);
        if (matchingStore) {
          restaurant.rating = matchingStore.rating;
        }
      });
      this.restaurants.sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
    }
  }
  sortStoresByDeliveryTime():void {
    // if it is already active it deactivates and presents the original data
    if(this.buttonDeliveryClicked){
      this.buttonDeliveryClicked=false;
      this.restaurantsService.getRestaurants().subscribe(
        (data) => {
          this.restaurants =data;
          this.restaurants.forEach((restaurant: any) => {
            restaurant.category = restaurant.category.replace(/_/g, ' ');
          });
        }
      );
      // if it is inactive it activates and sorts the data and deactivates the other sort options
    }else{
      this.buttonDeliveryClicked=true;
      this.buttonRatingClicked=false;
      this.buttonZAClicked=false;
      this.buttonAZClicked=false;
    this.restaurants.forEach((restaurant: any) => {
      const matchingStore = this.storeInfos.find((store: { name: any; }) => store.name === restaurant.name);
      if (matchingStore) {
        restaurant.delivery_time = matchingStore.delivery_time;
      }
    });
    this.restaurants.sort((a: { delivery_time: number; }, b: { delivery_time: number; }) =>  a.delivery_time - b.delivery_time);
  }
}
  sortStoresAlphabetically():void {
    // if it is already active it deactivates and presents the original data
    if(this.buttonAZClicked){
      this.buttonAZClicked=false;
      this.restaurantsService.getRestaurants().subscribe(
        (data) => {
          this.restaurants =data;
          this.restaurants.forEach((restaurant: any) => {
            restaurant.category = restaurant.category.replace(/_/g, ' ');
          });
        }
      );
      // if it is inactive it activates and sorts the data and deactivates the other sort options
    }else{
      this.buttonAZClicked=true;
      this.buttonZAClicked=false;
      this.buttonRatingClicked=false;
      this.buttonDeliveryClicked=false;
      this.restaurants.sort((a: { name: string; }, b: { name: string; }) => a.name.localeCompare(b.name));
    }
  }
  sortStoresZtoA():void {
    // if it is already active it deactivates and presents the original data
    if (this.buttonZAClicked){
      this.buttonZAClicked=false;
      this.restaurantsService.getRestaurants().subscribe(
        (data) => {
          this.restaurants =data;
          this.restaurants.forEach((restaurant: any) => {
            restaurant.category = restaurant.category.replace(/_/g, ' ');
          });
        }
      );
      // if it is inactive it activates and sorts the data and deactivates the other sort options
    }else{
      this.buttonZAClicked=true;
      this.buttonAZClicked=false;
      this.buttonRatingClicked=false;
      this.buttonDeliveryClicked=false;
      this.restaurants.sort((a: { name: string; }, b: { name: string; }) => b.name.localeCompare(a.name));
    }
  }
}

