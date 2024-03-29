# DELIVEReat

DELIVEReat is a web application that allows individuals to order food, coffee, beverages, etc. online. To use the application, the user must register using a unique email address and a password or login with a pre-existing account.

After initial registration or login, the user can:
● Search for the desired store either by name or by category using the search bar.
● Browse the Discovery page, where a list of all store categories, a list of the most famous stores in general and a list with all available stores are displayed.
● Sort the given stores by rating, delevery time or alphabetically.
● Select a category to view the stores in that category.
● Select a store to see store information, store ratings and its menu, which can be sorted by price or alphabetically. The menu categories navigation bar can be used to browse the items of each menu category.
● Add one or more items, in the desired quantity, from the store's menu to the cart.
● Completely remove an item or decrease its quantity from the cart.
● Clear all items from the cart.
● Create an order containing items only from the same store.
● Access the cart from the Cart button on the header throughout the application. The cart displays the last added items.
● Change to another store and add one of its items to the cart. The cart is cleared from the previous store's items before adding the new item(s) of this store, or if items of this store have added previously to the cart during this user's session, they are retrieved and diplayed in the cart.
● Retrieve all previously placed orders for pre-existing accounts in the Previous Orders Page, which can be accessed from the Previous Orders button on the header.
● Rate previously placed orders on the Previous Orders Page.
● View a store's page by selecting a store from Previous Orders.
● Checkout from the cart when all wanted items have been added. In the Checkout page, the selected items with their quantities and prices are displayed. Also, the total for the order, including delivery costs if any, is displayed. If the total is lower than the minimum order of each store, the user is informed of the necessary missing amount to complete the order. 
● Select a payment method in the Checkout page from the available options. If the selected payment method is Card, the card details must be added. The user's info are pre-completed from the information used during signup or from the pre-existing profile but can be edited.
● Complete the purchase by clicking Complete Purchase button in the Checkout page. A countdown with the  estimated time of arrival (E.T.A.) of the delivery is displayed. When the order arrives (counter reaches 0), the user is informed accordingly.
● Access user's info in the Profile page, which can be accessed from the Profile button on the header. There, the information that the user provided when the account was created is displayed and can be edited. 
● Sign out by clicking the button in the Profile page.
● Contact the DELIVEReat team using the contact form on Support page, which can be accessed from the link in the footer.

Information for login with pre-existing accounts:
Example1 : User with previous orders (stores with an existing menu)
          "email":johndoe@mail.com
          "password":1234
Example2 : User with previous orders (stores without an existing menu)
          "email":janedoe@mail.com
          "password":1111 
Example3: User with 1 previous orders (store without an existing menu)
          "email":mariap@mail.com
          "password":2222
Example4: User without previous orders
          "email":chucknorris@mail.com
          "password":0000

Technologies: Angular, HTML, CSS, TypeScript, Bootstrap

The application gets all the required data from JSON files.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
