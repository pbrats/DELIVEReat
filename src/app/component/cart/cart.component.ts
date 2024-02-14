import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  @Input()cartOpen?:boolean;
  currentRoute: string = '';
  constructor(private router: Router) {}
  ngOnInit(){
    this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      const parts = event.urlAfterRedirects.split('/');
      if (parts.length>2){
        console.log('leitourgei',parts);
        console.log('cartOpen',this.cartOpen);
        this.cartOpen=true;
        this.currentRoute = event.urlAfterRedirects.split('/')[1];
      }else{
        console.log("allagi");
        console.log('cartOpen',this.cartOpen);
        this.cartOpen=false;
      }
    });
  }

}
