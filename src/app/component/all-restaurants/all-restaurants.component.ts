import { Component, inject } from '@angular/core';
import { RestaurantsService } from '../../service/restaurants.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { StoresInfosService } from '../../service/stores-infos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-restaurants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-restaurants.component.html',
  styleUrl: './all-restaurants.component.css'
})
export class AllRestaurantsComponent {
  restaurants:any;
  restaurantsService: RestaurantsService =inject(RestaurantsService);
  storeInfosService: StoresInfosService =inject(StoresInfosService);
  storeInfos: any;
  hasLoadedStores : boolean= false;
  router: Router =inject(Router);
  activatedRoute =inject(ActivatedRoute);

  ngOnInit() {
    this.storeInfosService.getStoresInfos().subscribe((response) => {
      this.storeInfos = response;
    });
    this.restaurantsService.getRestaurants()
    .subscribe({
      next: response => {
        setTimeout(() =>{
          console.log(response);
          this.restaurants =response;
          this.hasLoadedStores=true;
        },500);
      }
    });
  } 
  constructor(private titleService: Title) {
    titleService.setTitle("Stores");
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

