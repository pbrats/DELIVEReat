import { Component, Input, inject } from '@angular/core';
import { RestaurantsService } from '../../service/restaurants.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input() wanted:any;
  storesService: RestaurantsService =inject(RestaurantsService);
  router: Router =inject(Router);
  activatedRoute =inject(ActivatedRoute);

  ngOnInit() {
      this.activatedRoute.params
      .subscribe({
        next: (params:any)=> {
          let idx=params;
          console.log(params);
          console.log(idx);
          this.storesService.getRestaurants()
            .pipe(map((data:any) =>data.products[idx]))
        .subscribe({
          next: data => {
          console.log(data);
          this.wanted=data;
          console.log(this.wanted);
        }
        });
      }
    });
  }
}
