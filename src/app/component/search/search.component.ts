import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publisher2Service } from '../../service/publisher2.service';
import { RestaurantsService } from '../../service/restaurants.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  publisherService2 =inject(Publisher2Service);
  restaurants:any;
  restaurantsService: RestaurantsService =inject(RestaurantsService);
  searchResult: any[]=[];

  constructor(private router: Router,private route: ActivatedRoute) {
    this.publisherService2.listenForData2()
    .subscribe((data)=>{
      this.searchResult=data;
      console.log('ekei')
      console.log(this.searchResult);
      console.log(this.searchResult.length);
    })
  }
  

  ngOnit(){
    this.restaurantsService.getRestaurants().subscribe((response) => {
      this.restaurants = response;
    });
    
  //   this.publisherService2.listenForData2()
  //   .subscribe((data)=>{
  //     this.filter=data;
  //     console.log('edo')
  //     console.log(this.filter);
  //   })
    
  }
  // ngOnChanges(simplechange:any){
  //   this.publisherService2.listenForData2()
  //   .subscribe((data)=>{
  //     this.searchResult=data;
  //     console.log('ekei2')
  //     console.log(this.searchResult);
  //     console.log(this.searchResult.length);
  //   })
  // }
  onStoreClick(clickName: string) {
    console.log(12)
    const foundStore = this.restaurants.find((store: any) => store.name === clickName);
    console.log(foundStore);
    if (foundStore){
      console.log(13)
      this.router.navigate(["stores",clickName]);
    }else{
      console.log(14)
      this.router.navigate(["menu-not-found"]);
    }
  }
}