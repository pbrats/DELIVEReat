import { Component, OnInit, inject } from '@angular/core';
import { FamousRestaurantsService } from '../../service/famous-restaurants.service';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

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

  ngOnInit() {
    this.famousService.getFamousRestaurants()
    .subscribe({
      next: response => {
        console.log(response);
        this.famousRestaurants =response;
      } 
    });
  }
  constructor(private titleService: Title) {
    titleService.setTitle("Famous Stores");
}

}
