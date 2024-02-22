import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniqueCategoryPipe } from "../../pipe/unique-category.pipe";
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../service/categories.service';
import { CategoriesPhotoService } from '../../service/categories-photo.service';


@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  imports: [CommonModule, UniqueCategoryPipe]
})
export class CategoriesComponent implements OnInit {
  router: Router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  fCategories: any;
  // categories:any;
  // categories1:any;
  // categories2:any;
  // restaurantsService: RestaurantsService =inject(RestaurantsService);
  // famousService: FamousRestaurantsService =inject(FamousRestaurantsService);
  catService: CategoriesService = inject(CategoriesService);
  catPhotoService: CategoriesPhotoService = inject(CategoriesPhotoService);
  photosCategories: any;
  hasLoadedCategories: boolean = false;
  buttonAZClicked: boolean = false;
  buttonZAClicked: boolean = false;

  ngOnInit() {
    this.catService.getCategories().subscribe({
      next: data => {
        setTimeout(() => {
          // (data) => {
          this.fCategories = data;
          this.fCategories.forEach((cat: any) => {
            // console.log('Before replacement - category:', cat.category);
            cat.category = cat.category.replace(/_/g, ' ');
            // console.log('After replacement - category:', cat.category);
          });
          // console.log('After replacement:', this.fCategories);
          this.hasLoadedCategories = true;
        }, 1);
      }
    });
    this.catPhotoService.getCategoriesPhotos().subscribe((data) => {
      this.photosCategories = data;
      this.photosCategories.forEach((photoCat: any) => {
        // console.log('Before replacement - category:', photoCat.category);
        photoCat.category = photoCat.category.replace(/_/g, ' ');
        // console.log('After replacement - category:', photoCat.category);
      });
      // console.log('After replacement:', this.photosCategories);
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
    this.router.navigate(["categories", category]);
  }
  constructor(private titleService: Title) {
    titleService.setTitle("Categories");
  }
  sortStoresAlphabetically(): void {
    // if it is already active it deactivates and presents the original data
    if (this.buttonAZClicked) {
      this.buttonAZClicked = false;
      this.catService.getCategories().subscribe(
        (data) => {
          this.fCategories = data;
          this.fCategories.forEach((cat: any) => {
            cat.category = cat.category.replace(/_/g, ' ');
          });
        }
      );
      // if it is inactive it activates and sorts the data and deactivates the other sort option
    } else {
      this.buttonAZClicked = true;
      this.buttonZAClicked = false;
      this.fCategories.sort((a: { category: string; }, b: { category: string; }) => a.category.localeCompare(b.category));
    }
  }
  sortStoresZtoA(): void {
    // if it is already active it deactivates and presents the original data
    if (this.buttonZAClicked) {
      this.buttonZAClicked = false;
      this.catService.getCategories().subscribe(
        (data) => {
          this.fCategories = data;
          this.fCategories.forEach((cat: any) => {
            cat.category = cat.category.replace(/_/g, ' ');
          });
        }
      );
      // if it is inactive it activates and sorts the data and deactivates the other sort option
    } else {
      this.buttonZAClicked = true;
      this.buttonAZClicked = false;
      this.fCategories.sort((a: { category: string; }, b: { category: string; }) => b.category.localeCompare(a.category));
    }
  }
}
