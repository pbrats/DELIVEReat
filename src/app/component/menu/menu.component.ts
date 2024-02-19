import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsPhotosService } from '../../service/products-photos.service';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../cart-item';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  imports: [CommonModule, CartComponent]
})
export class MenuComponent {
  @Input() productsList: any;
  productPhotos: any;
  productPhotoService: ProductsPhotosService = inject(ProductsPhotosService);
  productCategoryList: string[] = [];
  groupedProducts: { category: string, products: any[] }[] = [];
  $index: any;
  currentUrl: any;
  storeName: string = '';
  cartItems: CartItem[] = [];
  buttonAZClicked: boolean = false;
  buttonZAClicked: boolean = false;
  buttonHighPrice: boolean = false;
  buttonLowPrice: boolean = false;
  cartItemsSubscription: any;

  constructor(private cartService: CartService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.currentUrl = this.router.url;
    // console.log("current url:",this.currentUrl);
    this.storeName = this.currentUrl.split('/')[2];
    // console.log("store name:",this.storeName);
  }
  ngOnInit() {
    this.productPhotoService.getProdusctsPhotos().subscribe((response) => {
      this.productPhotos = response;
    });
    // console.log(this.productsList);
    this.productCategoryList = this.getUniqueProductCategories(this.productsList);
    // console.log(this.productCategoryList);
    this.productCategoryList = this.productCategoryList.map(category => category.replace(/_/g, ' '));
    // console.log(this.productCategoryList);
    this.groupedProducts = this.groupProductsByCategory(this.productsList);
    // console.log(this.groupedProducts);
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
    if (this.buttonHighPrice) {
      this.buttonHighPrice = false;
      this.groupedProducts = this.groupProductsByCategory(this.productsList);
      // if it is inactive it activates and sorts the data and deactivates the other sort options
    } else {
      this.buttonHighPrice = true;
      this.buttonAZClicked = false;
      this.buttonZAClicked = false;
      this.buttonLowPrice = false;
      this.groupedProducts.forEach(categoryGroup => {
        categoryGroup.products.sort((a, b) => b.price - a.price);
      });
    }
  }
  sortStoresByPriceAscending(): void {
    // if it is already active it deactivates and presents the original data
    if (this.buttonLowPrice) {
      this.buttonLowPrice = false;
      this.groupedProducts = this.groupProductsByCategory(this.productsList);
      // if it is inactive it activates and sorts the data and deactivates the other sort options
    } else {
      this.buttonLowPrice = true;
      this.buttonAZClicked = false;
      this.buttonZAClicked = false;
      this.buttonHighPrice = false;
      this.groupedProducts.forEach(categoryGroup => {
        categoryGroup.products.sort((a, b) => a.price - b.price);
      });
    }
  }
  sortStoresAlphabetically(): void {
    // if it is already active it deactivates and presents the original data
    if (this.buttonAZClicked) {
      this.buttonAZClicked = false;
      this.groupedProducts = this.groupProductsByCategory(this.productsList);
      // if it is inactive it activates and sorts the data and deactivates the other sort options
    } else {
      this.buttonAZClicked = true;
      this.buttonZAClicked = false;
      this.buttonHighPrice = false;
      this.buttonLowPrice = false;
      this.groupedProducts.forEach(categoryGroup => {
        categoryGroup.products.sort((a, b) => a.name.localeCompare(b.name));
      });
    }
  }
  sortStoresZtoA(): void {
    // if it is already active it deactivates and presents the original data
    if (this.buttonZAClicked) {
      this.buttonZAClicked = false;
      this.groupedProducts = this.groupProductsByCategory(this.productsList);
      // if it is inactive it activates and sorts the data and deactivates the other sort options
    } else {
      this.buttonZAClicked = true;
      this.buttonAZClicked = false;
      this.buttonHighPrice = false;
      this.buttonLowPrice = false;
      this.groupedProducts.forEach(categoryGroup => {
        categoryGroup.products.sort((a, b) => b.name.localeCompare(a.name));
      });
    }
  }
  addToCart(item: CartItem) {
    // console.log("cart item:",item);
    this.cartService.addToCart(item, this.storeName);
    this.cartItemsSubscription = this.cartService.cartItemsUpdated.subscribe(cartItems => {
      this.cartItems = cartItems[this.storeName] || [];
      // console.log("cart menu:",this.cartItems);
    });
    // this.cartItems = this.cartService.getCartItems(this.storeName);
    // console.log(this.cartService.getTotal(this.storeName));
    this.cartService.cartOpen = true;
  }
}
