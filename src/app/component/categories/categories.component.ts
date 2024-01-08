import { Component,  inject } from '@angular/core';
import { RestaurantsService } from '../../service/restaurants.service';
import { FamousRestaurantsService } from '../../service/famous-restaurants.service';
import { CommonModule } from '@angular/common';
import { UniqueCategoryPipe } from "../../unique-category.pipe";
import { Title } from '@angular/platform-browser';



@Component({
    selector: 'app-categories',
    standalone: true,
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css',
    imports: [CommonModule, UniqueCategoryPipe]
})
export class CategoriesComponent {
  categories:any;
  categories1:any;
  categories2:any;
  restaurantsService: RestaurantsService =inject(RestaurantsService);
  famousService: FamousRestaurantsService =inject(FamousRestaurantsService);

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
        this.categories2 =response;
        this.categories=this.categories1.concat(this.categories2)
        console.log(this.categories)

      } 
    });
  }
  constructor(private titleService: Title) {
    titleService.setTitle("Categories");
}
}
