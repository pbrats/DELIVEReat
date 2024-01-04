import { Component, inject } from '@angular/core';
import { RestaurantsService } from '../../service/restaurants.service';

@Component({
  selector: 'app-all-restaurants',
  standalone: true,
  imports: [],
  templateUrl: './all-restaurants.component.html',
  styleUrl: './all-restaurants.component.css'
})
export class AllRestaurantsComponent {
  restaurants:any;
  restaurantsService: RestaurantsService =inject(RestaurantsService);

  ngOnInit() {
    this.restaurantsService.getRestaurants()
    .subscribe({
      next: response => {
        console.log(response);
        this.restaurants =response;
      } 
    });
  }

}
