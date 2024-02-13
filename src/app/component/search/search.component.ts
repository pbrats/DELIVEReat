import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../../service/restaurants.service';
import { FamousRestaurantsService } from '../../service/famous-restaurants.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  restaurants:any;
  stores:any;
  restaurantsService: RestaurantsService =inject(RestaurantsService);
  famousService: FamousRestaurantsService =inject(FamousRestaurantsService);
  searchResult: any[]=[];
  query: string = '';

  constructor(private router: Router,private route: ActivatedRoute) {}
  ngOnInit() {
    this.restaurantsService.getRestaurants().subscribe((response) => {
      this.restaurants = response;
    });
    this.route.queryParams.subscribe(params => {
      // console.log(params)
      this.query = params['query'];
      // console.log(this.query)
      if (this.query) {
        this.famousService.getFamousRestaurants().subscribe((response) => {
          this.stores = response;
          this.searchResult = this.stores.filter((store: { name: string , category:string}) =>
           store.name.toLowerCase().includes(this.query.toLowerCase())
            ||
            store.category.toLowerCase().includes(this.query.toLowerCase())
          );
          // console.log(this.searchResult);
          this.searchResult.forEach((store: any) => {
            // console.log('Before replacement - category:', store.category);
            store.category = store.category.replace(/_/g, ' ');
            // console.log('After replacement - category:', store.category);
          });
          // console.log('After replacement:', this.searchResult);
        });
      }
    });
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