import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamousComponent } from '../famous/famous.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AllRestaurantsComponent } from '../all-restaurants/all-restaurants.component';
import { CategoriesComponent } from '../categories/categories.component';
import { FamousRestaurantsService } from '../../service/famous-restaurants.service';
import { RestaurantsService } from '../../service/restaurants.service';
import { UniqueCategoryPipe } from "../../pipe/unique-category.pipe";
import { Title } from '@angular/platform-browser';
import { CategoriesService } from '../../service/categories.service';
import { CategoriesPhotoService } from '../../service/categories-photo.service';
import { StoresInfosService } from '../../service/stores-infos.service';

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
  // categories:any;
  // categories1:any;
  // categories2:any;
  fCategories:any;
  restaurants:any;
  restaurantsService: RestaurantsService =inject(RestaurantsService);
  catService: CategoriesService =inject(CategoriesService);
  catPhotoService: CategoriesPhotoService =inject(CategoriesPhotoService);
  photosCategories: any;
  hasLoadedCategories : boolean= false;
  hasLoadedFamous : boolean= false;
  
  constructor(private route: ActivatedRoute,private titleService: Title) {
    titleService.setTitle("Discovery");
  }

  ngOnInit() {
    // get categories from CategoriesService obj if so allazei sto html kai mpainei fCategories
    this.catService.getCategories().subscribe({
      next: data => {
        setTimeout(() =>{
      // (data) => {
        this.fCategories = data;
        this.hasLoadedCategories=true;
        },500);
      }
    });
    this.restaurantsService.getRestaurants().subscribe((response) => {
      this.restaurants = response;
    });
    this.catPhotoService.getCategoriesPhotos().subscribe((response) => {
      this.photosCategories = response;
    });
    // get categories from restaurantsService
    // this.restaurantsService.getRestaurants()
    // .subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.categories1 =response;
    //   } 
    // });
    // get categories from famousRestaurantsService
    this.famousService.getFamousRestaurants()
    .subscribe({
      next: response => {
        setTimeout(() =>{
          console.log(response);
          this.famousRestaurants =response;
          this.hasLoadedFamous=true;
        // this.categories2 =response;
        // enonei categories if so allazei sto html kai mpainei categories
        // this.categories=this.categories1.concat(this.categories2)
        },500);
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
  onCategoryClick(category: string) {
    this.router.navigate(["categories",category]);
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
}