import { Component, Input, inject } from '@angular/core';
import { RestaurantsService } from '../../service/restaurants.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsPhotosService } from '../../service/products-photos.service';



@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
    imports: [CommonModule]
})
export class MenuComponent {
  @Input() productsList:any;
  storesService: RestaurantsService =inject(RestaurantsService);
  router: Router =inject(Router);
  activatedRoute =inject(ActivatedRoute);
  productPhotos: any;
  productPhotoService:  ProductsPhotosService=inject(ProductsPhotosService);
  productCategoryList: string[] = [];
  groupedProducts: { category: string, products: any[] }[] = [];
  $index: any;

  ngOnInit() {
    this.productPhotoService.getProdusctsPhotos().subscribe((response) => {
      this.productPhotos = response;
    });

    console.log(this.productsList);
    this.productCategoryList= this.getUniqueProductCategories(this.productsList);
    console.log(this.productCategoryList);
    this.groupedProducts = this.groupProductsByCategory(this.productsList);
    console.log(this.groupedProducts);
    }

    getUniqueProductCategories(originalArray: any[]): string[] {
      const uniqueProductCategories: string[] = [];
      originalArray.forEach(item => {
        if (!uniqueProductCategories.includes(item.category)) {
          uniqueProductCategories.push(item.category);
        }
      });
      return uniqueProductCategories;
    }
    groupProductsByCategory(originalArray: any[]): { category: string, products: any[] }[] {
      const groupedProducts: { category: string, products: any[] }[] = [];
  
      originalArray.forEach(product => {
        const categoryGroup = groupedProducts.find(group => group.category === product.category);
  
        if (categoryGroup) {
          categoryGroup.products.push(product);
        } else {
          groupedProducts.push({ category: product.category, products: [product] });
        }
      });
  
      return groupedProducts;
    }
  }

