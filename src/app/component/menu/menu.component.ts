import { Component, Input, inject } from '@angular/core';
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
  router: Router =inject(Router);
  activatedRoute =inject(ActivatedRoute);
  productPhotos: any;
  productPhotoService:  ProductsPhotosService=inject(ProductsPhotosService);
  productCategoryList: string[] = [];
  groupedProducts: { category: string, products: any[] }[] = [];
  $index: any;
  currentUrl: any;

  constructor(){
    this.currentUrl = this.router.url;
    console.log(this.currentUrl)
  }
  ngOnInit() {
    this.productPhotoService.getProdusctsPhotos().subscribe((response) => {
      this.productPhotos = response;
    });   
    console.log(this.productsList);
    this.productCategoryList= this.getUniqueProductCategories(this.productsList);
    console.log(this.productCategoryList);
    this.groupedProducts = this.groupProductsByCategory(this.productsList);
    console.log(this.groupedProducts);
    // console.log(this.groupedProducts.length)
    // if (this.groupedProducts.length > 0) {
    //   this.activeCategory = this.groupedProducts[0].category;
    //   console.log(1)
    //   console.log(this.groupedProducts[0].category)
    // }
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
  sortStoresByPriceDescending(): void {
    this.groupedProducts.forEach(categoryGroup => {
      categoryGroup.products.sort((a, b) => b.price - a.price);
    });
  }
  sortStoresByPriceAscending():void {
    this.groupedProducts.forEach(categoryGroup => {
      categoryGroup.products.sort((a, b) => a.price - b.price);
    });
  }
  sortStoresAlphabetically():void {
    this.groupedProducts.forEach(categoryGroup => {
      categoryGroup.products.sort((a, b) =>a.name.localeCompare(b.name));
    });
  }
  sortStoresZtoA():void {
    this.groupedProducts.forEach(categoryGroup => {
      categoryGroup.products.sort((a, b) =>b.name.localeCompare(a.name));
    });
  }
  // scrollToCategory(categoryGroup: { category: string; products: any[] }) {
  //   const elementId = `scrollspyHeading ${categoryGroup.category}`;
  //   const currentName = this.activatedRoute.snapshot.paramMap.get('name');
  //   this.router.navigate(['stores', currentName], { fragment: elementId });
  //   // this.activeCategory = categoryGroup.category;
  // }
}
