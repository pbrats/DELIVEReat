import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule,ReactiveFormsModule,FormsModule,CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  form!: FormGroup;
  searchQuery: string = '';
  currentRoute: string = '';
  cartOpen?:boolean;
  constructor(private route: ActivatedRoute,private router: Router){
    // this.router.events.subscribe((event) => console.log(event));
  }
  ngOnInit(){
    // this.router.events
    // .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    // .subscribe((event: NavigationEnd) => {
    //   this.currentRoute = event.urlAfterRedirects.split('/')[1];
    // });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects.split('/')[1];
      }
    });
    this.setFormValues();
  }
  setFormValues(){
    this.form= new FormGroup({
      searchData : new FormControl("",[Validators.required])
    });
  }
  onSubmit() {
    // console.log(this.form.get("searchData")?.value);
    this.searchQuery=this.form.get("searchData")?.value;
    console.log( this.searchQuery);
    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
  }
  changeCartStatus(){
    if(this.cartOpen){
      this.cartOpen=false;
      // EventEmitter
    }else{
      this.cartOpen=true;
      // emit cartopen sto cart
    }
  }
}