import { Component, inject } from '@angular/core';
import { FamousRestaurantsService } from '../../service/famous-restaurants.service';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { StoresInfosService } from '../../service/stores-infos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../../service/restaurants.service';

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
  storeInfosService: StoresInfosService =inject(StoresInfosService);
  storeInfos: any;
  hasLoadedFamous : boolean= false;
  router: Router =inject(Router);
  activatedRoute =inject(ActivatedRoute);
  restaurants:any;
  restaurantsService: RestaurantsService =inject(RestaurantsService);

  ngOnInit() {
    // this.storeInfosService.getStoresInfos().subscribe((response) => {
    //   this.storeInfos = response;
    // });
    this.restaurantsService.getRestaurants().subscribe((response) => {
      this.restaurants = response;
    });
    this.famousService.getFamousRestaurants()
    .subscribe({
      next: response => {
        setTimeout(() =>{
          console.log(response);
          this.famousRestaurants =response;
          this.hasLoadedFamous=true;     
      },500);
      }
    });
  }
  constructor(private titleService: Title) {
    titleService.setTitle("Famous Stores");
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

