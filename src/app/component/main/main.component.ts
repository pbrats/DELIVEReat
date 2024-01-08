import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamousComponent } from '../famous/famous.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AllRestaurantsComponent } from '../all-restaurants/all-restaurants.component';
import { CategoriesComponent } from '../categories/categories.component';
import { FamousRestaurantsService } from '../../service/famous-restaurants.service';
import { RestaurantsService } from '../../service/restaurants.service';
import { UniqueCategoryPipe } from "../../unique-category.pipe";
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [CommonModule, FamousComponent, AllRestaurantsComponent, CategoriesComponent, UniqueCategoryPipe]
})
export class MainComponent {
  router: Router =inject(Router);
  famousRestaurants:any;
  famousService: FamousRestaurantsService =inject(FamousRestaurantsService);
  categories:any;
  categories1:any;
  categories2:any;
  restaurantsService: RestaurantsService =inject(RestaurantsService);
  
  constructor(private route: ActivatedRoute,private titleService: Title) {
    titleService.setTitle("Discovery");
  }

  ngOnInit() {
    this.restaurantsService.getRestaurants()
    .subscribe({
      next: response => {
        console.log(response);
        this.categories1 =response;
      } 
    });
    this.famousService.getFamousRestaurants()
    .subscribe({
      next: response => {
        console.log(response);
        this.famousRestaurants =response;
        this.categories2 =response;
        this.categories=this.categories1.concat(this.categories2)
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