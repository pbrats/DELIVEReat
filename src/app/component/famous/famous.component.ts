import { Component, inject } from '@angular/core';
import { FamousRestaurantsService } from '../../service/famous-restaurants.service';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { StoresInfosService } from '../../service/stores-infos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../../service/restaurants.service';

@Component({
  selector: 'app-famous',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './famous.component.html',
  styleUrl: './famous.component.css'
})
export class FamousComponent {
  famousRestaurants: any;
  famousService: FamousRestaurantsService = inject(FamousRestaurantsService);
  storeInfosService: StoresInfosService = inject(StoresInfosService);
  storeInfos: any;
  hasLoadedFamous: boolean = false;
  router: Router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  restaurants: any;
  restaurantsService: RestaurantsService = inject(RestaurantsService);
  buttonAZClicked: boolean = false;
  buttonZAClicked: boolean = false;
  buttonRatingClicked: boolean = false;
  buttonDeliveryClicked: boolean = false;

  ngOnInit() {
    // this.storeInfosService.getStoresInfos().subscribe((response) => {
    //   this.storeInfos = response;
    // });
    this.restaurantsService.getRestaurants().subscribe((response) => {
      this.restaurants = response;
    });
    this.famousService.getFamousRestaurants()
      .subscribe({
        next: response => {
          setTimeout(() => {
            // console.log(response);
            this.famousRestaurants = response;
            this.famousRestaurants.forEach((famousRest: any) => {
              // console.log('Before replacement - category:', famousRest.category);
              famousRest.category = famousRest.category.replace(/_/g, ' ');
              // console.log('After replacement - category:', famousRest.category);
            });
            // console.log('After replacement:', this.famousRestaurants);
            this.hasLoadedFamous = true;
          }, 500);
        }
      });
  }
  constructor(private titleService: Title) {
    titleService.setTitle("Famous Stores");
  }
  onStoreClick(clickName: string) {
    const foundStore = this.restaurants.find((store: any) => store.name === clickName);
    // console.log(foundStore);
    if (foundStore) {
      this.router.navigate(["stores", clickName]);
    } else {
      this.router.navigate(["menu-not-found"]);
    }
  }
  sortStoresByRating(): void {
    // if it is already active it deactivates and presents the original data
    if (this.buttonRatingClicked) {
      this.buttonRatingClicked = false;
      this.buttonDeliveryClicked = false;
      this.famousService.getFamousRestaurants().subscribe(
        (data) => {
          this.famousRestaurants = data;
          this.famousRestaurants.forEach((famousRest: any) => {
            famousRest.category = famousRest.category.replace(/_/g, ' ');
          });
        }
      );
      // if it is inactive it activates and sorts the data and deactivates the other sort option
    } else {
      this.buttonRatingClicked = true;
      this.buttonDeliveryClicked = false;
      this.buttonZAClicked = false;
      this.buttonAZClicked = false;
      this.famousRestaurants.sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
    }
  }
  sortStoresByDeliveryTime(): void {
    // if it is already active it deactivates and presents the original data
    if (this.buttonDeliveryClicked) {
      this.buttonDeliveryClicked = false;
      this.famousService.getFamousRestaurants().subscribe(
        (data) => {
          this.famousRestaurants = data;
          this.famousRestaurants.forEach((famousRest: any) => {
            famousRest.category = famousRest.category.replace(/_/g, ' ');
          });
        }
      );
      // if it is inactive it activates and sorts the data and deactivates the other sort option
    } else {
      this.buttonDeliveryClicked = true;
      this.buttonRatingClicked = false;
      this.buttonZAClicked = false;
      this.buttonAZClicked = false;
      this.famousRestaurants.sort((a: { delivery_time: number; }, b: { delivery_time: number; }) => a.delivery_time - b.delivery_time);
    }
  }
  sortStoresAlphabetically(): void {
    // if it is already active it deactivates and presents the original data
    if (this.buttonAZClicked) {
      this.buttonAZClicked = false;
      this.famousService.getFamousRestaurants().subscribe(
        (data) => {
          this.famousRestaurants = data;
          this.famousRestaurants.forEach((famousRest: any) => {
            famousRest.category = famousRest.category.replace(/_/g, ' ');
          });
        }
      );
      // if it is inactive it activates and sorts the data and deactivates the other sort option
    } else {
      this.buttonAZClicked = true;
      this.buttonZAClicked = false;
      this.buttonRatingClicked = false;
      this.buttonDeliveryClicked = false;
      this.famousRestaurants.sort((a: { name: string; }, b: { name: string; }) => a.name.localeCompare(b.name));
    }
  }
  sortStoresZtoA(): void {
    // if it is already active it deactivates and presents the original data
    if (this.buttonZAClicked) {
      this.buttonZAClicked = false;
      this.famousService.getFamousRestaurants().subscribe(
        (data) => {
          this.famousRestaurants = data;
          this.famousRestaurants.forEach((famousRest: any) => {
            famousRest.category = famousRest.category.replace(/_/g, ' ');
          });
        }
      );
      // if it is inactive it activates and sorts the data and deactivates the other sort option
    } else {
      this.buttonZAClicked = true;
      this.buttonAZClicked = false;
      this.buttonRatingClicked = false;
      this.buttonDeliveryClicked = false;
      this.famousRestaurants.sort((a: { name: string; }, b: { name: string; }) => b.name.localeCompare(a.name));
    }
  }
}

