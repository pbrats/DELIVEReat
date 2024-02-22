import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../service/categories.service';
import { Title } from '@angular/platform-browser';
import { StoresInfosService } from '../../service/stores-infos.service';
import { RestaurantsService } from '../../service/restaurants.service';

@Component({
  selector: 'app-selected-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selected-category.component.html',
  styleUrl: './selected-category.component.css'
})
export class SelectedCategoryComponent {
  activatedRoute = inject(ActivatedRoute);
  selectedCategory!: string;
  stores: any[] = [];
  router: Router = inject(Router);
  catService: CategoriesService = inject(CategoriesService);
  storeInfosService: StoresInfosService = inject(StoresInfosService);
  storeInfos: any;
  hasLoadedStores: boolean = false;
  restaurants: any;
  restaurantsService: RestaurantsService = inject(RestaurantsService);

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.storeInfosService.getStoresInfos().subscribe((response) => {
      this.storeInfos = response;
    });
    this.restaurantsService.getRestaurants().subscribe((response) => {
      this.restaurants = response;
    });
    this.activatedRoute.params.subscribe({
      next: params => {
        setTimeout(() => {
          // (params:any) => {
          // console.log(params);
          this.selectedCategory = params['category'];
          // this.selectedCategory = params.category;
          // console.log(this.selectedCategory);
          this.selectedCategory = this.selectedCategory.replace(/ /g, '_');
          // Check if the category exists 
          this.catService.categoryExists(this.selectedCategory).subscribe(exists => {
            if (exists) {
              this.selectedCategory = this.selectedCategory.replace(/_/g, ' ');
              console.log("category exists");
              this.titleService.setTitle(`${this.selectedCategory}`);
              this.catService.getCategories().subscribe((data: any) => {
                this.stores = data.filter((store: any) => store.category.replace(/_/g, ' ') === this.selectedCategory);
                // console.log(this.stores);
                this.stores.forEach((store: any) => {
                  // console.log('Before replacement - category:', store.category);
                  store.category = store.category.replace(/_/g, ' ');
                  // console.log('After replacement - category:', store.category);
                });
                // console.log('After replacement:', this.stores);
              });
              this.hasLoadedStores = true;
            } else {
              console.log("Category does not exist");
              this.router.navigate(["menu-not-found"]);
            }
          });
        }, 1);
      }
    });
  }
  onStoreClick(clickName: string) {
    const foundStore = this.restaurants.find((store: any) => store.name === clickName);
    // console.log(foundStore);
    if (foundStore) {
      this.router.navigate(["stores", clickName]);
    } else {
      this.router.navigate(["menu-not-found"]);
    }
  }
  sortStoresByRating(): void {
    this.stores.sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
  }
  sortStoresByDeliveryTime(): void {
    this.stores.sort((a: { delivery_time: number; }, b: { delivery_time: number; }) => a.delivery_time - b.delivery_time);
  }
  sortStoresAlphabetically(): void {
    this.stores.sort((a: { name: string; }, b: { name: string; }) => a.name.localeCompare(b.name));
  }
  sortStoresZtoA(): void {
    this.stores.sort((a: { name: string; }, b: { name: string; }) => b.name.localeCompare(a.name));
  }
}