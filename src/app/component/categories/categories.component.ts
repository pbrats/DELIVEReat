import { Component, inject } from '@angular/core';
import { RestaurantsService } from '../../service/restaurants.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories:any;
  restaurantsService: RestaurantsService =inject(RestaurantsService);

  ngOnInit() {
    this.restaurantsService.getRestaurants()
    // .pipe(map((response:any)=>response.category))
    .subscribe({
      next: response => {
        console.log(response);
        this.categories =response;
      } 
    });
  }


}
