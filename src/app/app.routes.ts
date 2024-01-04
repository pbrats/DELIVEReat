import { Routes } from '@angular/router';
import { MainComponent } from './component/main/main.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { FamousComponent } from './component/famous/famous.component';
import { AllRestaurantsComponent } from './component/all-restaurants/all-restaurants.component';
import { CategoriesComponent } from './component/categories/categories.component';

export const routes: Routes = [
    {path: "", redirectTo: "welcome", pathMatch:"full"},
    {path: "welcome", component: LandingPageComponent},
    {path: "discovery", component: MainComponent},
    {path: "famous-stores", component: FamousComponent},
    {path: "stores", component: AllRestaurantsComponent},
    {path: "categories", component: CategoriesComponent},
    // {path: "users/:id", component: UserDetailsComponent},
    // {path: "stores", component: AllStoresComponent},
    {path: "**", component: NotFoundComponent}
];
