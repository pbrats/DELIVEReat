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
  buttonAZClicked:boolean=false;
  buttonZAClicked:boolean=false;
  buttonHighPrice:boolean=false;
  buttonLowPrice:boolean=false;

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
    this.productCategoryList = this.productCategoryList.map(category => category.replace(/_/g, ' '));
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
      const categoryWithoutUnderscore = product.category.replace(/_/g, ' '); // Replace underscores with spaces
      const categoryGroup = groupedProducts.find(group => group.category === categoryWithoutUnderscore);
      if (categoryGroup) {
        categoryGroup.products.push(product);
      } else {
        groupedProducts.push({ category: categoryWithoutUnderscore, products: [product] });
      }
    });
    return groupedProducts;
  }
  sortStoresByPriceDescending(): void {
    // if it is already active it deactivates and presents the original data
    if(this.buttonHighPrice){
      this.buttonHighPrice=false;
      this.groupedProducts = this.groupProductsByCategory(this.productsList);
        // if it is inactive it activates and sorts the data and deactivates the other sort options
    }else{
      this.buttonHighPrice=true;
      this.buttonAZClicked=false;
      this.buttonZAClicked=false;
      this.buttonLowPrice=false;
      this.groupedProducts.forEach(categoryGroup => {
        categoryGroup.products.sort((a, b) => b.price - a.price);
      });
    }
  }
  sortStoresByPriceAscending():void {
    // if it is already active it deactivates and presents the original data
    if(this.buttonLowPrice){
      this.buttonLowPrice=false;
      this.groupedProducts = this.groupProductsByCategory(this.productsList);
        // if it is inactive it activates and sorts the data and deactivates the other sort options
    }else{
      this.buttonLowPrice=true;
      this.buttonAZClicked=false;
      this.buttonZAClicked=false;
      this.buttonHighPrice=false;
      this.groupedProducts.forEach(categoryGroup => {
        categoryGroup.products.sort((a, b) => a.price - b.price);
      });
    }
  }
  sortStoresAlphabetically():void {
    // if it is already active it deactivates and presents the original data
    if(this.buttonAZClicked){
      this.buttonAZClicked=false;
      this.groupedProducts = this.groupProductsByCategory(this.productsList);
        // if it is inactive it activates and sorts the data and deactivates the other sort options
    }else{
      this.buttonAZClicked=true;
      this.buttonZAClicked=false;
      this.buttonHighPrice=false;
      this.buttonLowPrice=false;
      this.groupedProducts.forEach(categoryGroup => {
        categoryGroup.products.sort((a, b) =>a.name.localeCompare(b.name));
      });
    }
  }
  sortStoresZtoA():void {
    // if it is already active it deactivates and presents the original data
    if (this.buttonZAClicked){
      this.buttonZAClicked=false;
      this.groupedProducts = this.groupProductsByCategory(this.productsList);
        // if it is inactive it activates and sorts the data and deactivates the other sort options
    }else{
      this.buttonZAClicked=true;
      this.buttonAZClicked=false;
      this.buttonHighPrice=false;
      this.buttonLowPrice=false;
      this.groupedProducts.forEach(categoryGroup => {
        categoryGroup.products.sort((a, b) =>b.name.localeCompare(a.name));
      });
    }
  }
  // scrollToCategory(categoryGroup: { category: string; products: any[] }) {
  //   const elementId = `scrollspyHeading ${categoryGroup.category}`;
  //   const currentName = this.activatedRoute.snapshot.paramMap.get('name');
  //   this.router.navigate(['stores', currentName], { fragment: elementId });
  //   // this.activeCategory = categoryGroup.category;
  // }
}
