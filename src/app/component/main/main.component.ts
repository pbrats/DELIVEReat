import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamousComponent } from '../famous/famous.component';
import { Router } from '@angular/router';
import { AllRestaurantsComponent } from '../all-restaurants/all-restaurants.component';
import { CategoriesComponent } from '../categories/categories.component';
import { FamousRestaurantsService } from '../../service/famous-restaurants.service';
import { RestaurantsService } from '../../service/restaurants.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,FamousComponent,AllRestaurantsComponent,CategoriesComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  router: Router =inject(Router);
  famousRestaurants:any;
  famousService: FamousRestaurantsService =inject(FamousRestaurantsService);
  categories:any;
  restaurantsService: RestaurantsService =inject(RestaurantsService);

  ngOnInit() {
    this.famousService.getFamousRestaurants()
    .subscribe({
      next: response => {
        console.log(response);
        this.famousRestaurants =response;
      } 
    });
    this.restaurantsService.getRestaurants()
    .subscribe({
      next: response => {
        console.log(response);
        this.categories =response;
      } 
    });
  }

viewFamousRestaurants(){
  this.router.navigate(["famous-stores"]);
}
viewRestaurants(){
  this.router.navigate(["stores"]);
}
viewCategories(){
  this.router.navigate(["categories"]);
}
}