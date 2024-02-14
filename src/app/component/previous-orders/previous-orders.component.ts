import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StoresInfosService } from '../../service/stores-infos.service';
import { RestaurantsService } from '../../service/restaurants.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-previous-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './previous-orders.component.html',
  styleUrl: './previous-orders.component.css'
})
export class PreviousOrdersComponent {
  User:any;
  storeInfosService =inject(StoresInfosService);
  storesInfos:any;
  restaurants:any;
  restaurantsService: RestaurantsService =inject(RestaurantsService);
  $index: any;

  constructor(private router: Router,private titleService: Title) {
    titleService.setTitle("Previous Orders");
  }
  ngOnInit(){
    this.storeInfosService.getStoresInfos().subscribe((response) => {
      this.storesInfos = response;
    });
    this.restaurantsService.getRestaurants().subscribe((response) => {
      this.restaurants = response;
    });
   // Retrieve the stored user information from local storage
   const storedUser = localStorage.getItem('User');
  //  console.log( storedUser);
   if (storedUser) {
     // Parse the stored JSON string back into a JavaScript object
     this.User = JSON.parse(storedUser);
    //  console.log(this.User);
     // Now, this.User contains the information of the authenticated user
   } else {
     // Handle the case when no user information is stored in local storage
     console.log('No user information found in local storage');
   }
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
