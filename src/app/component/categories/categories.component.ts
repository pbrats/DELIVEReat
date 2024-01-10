import { Component,  OnInit,  inject } from '@angular/core';
import { RestaurantsService } from '../../service/restaurants.service';
import { FamousRestaurantsService } from '../../service/famous-restaurants.service';
import { CommonModule } from '@angular/common';
import { UniqueCategoryPipe } from "../../unique-category.pipe";
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../service/categories.service';


@Component({
    selector: 'app-categories',
    standalone: true,
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css',
    imports: [CommonModule, UniqueCategoryPipe]
})
export class CategoriesComponent implements OnInit{
  router: Router =inject(Router);
  activatedRoute =inject(ActivatedRoute);
  fCategories: any;
  categories:any;
  categories1:any;
  categories2:any;
  restaurantsService: RestaurantsService =inject(RestaurantsService);
  famousService: FamousRestaurantsService =inject(FamousRestaurantsService);
  catService: CategoriesService =inject(CategoriesService);
  

  ngOnInit() {
    this.catService.getCategories().subscribe((data) => {
      this.fCategories = data;
    });
    // get categories from stores
    // this.restaurantsService.getRestaurants()
    // .subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.categories1 =response;
    //   } 
    // });
    // get categories from mostFamouStores
    // this.famousService.getFamousRestaurants()
    // .subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.categories2 =response;
    // enonei catigories
    //     this.categories=this.categories1.concat(this.categories2)
    //     console.log(this.categories)
    //   } 
    // });
  }
  

  onCategoryClick(category: string) {
    this.router.navigate(["categories",category]);
  }

  constructor(private titleService: Title) {
    titleService.setTitle("Categories");
}
}
