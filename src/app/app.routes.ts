import { Routes } from '@angular/router';
import { MainComponent } from './component/main/main.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { FamousComponent } from './component/famous/famous.component';
import { AllRestaurantsComponent } from './component/all-restaurants/all-restaurants.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { SelectedCategoryComponent } from './component/selected-category/selected-category.component';
import { SelectedStoreComponent } from './component/selected-store/selected-store.component';
import { AboutComponent } from './component/about/about.component';
import { FaqComponent } from './component/faq/faq.component';
import { SupportComponent } from './component/support/support.component';
import { TermsOfUseComponent } from './component/terms-of-use/terms-of-use.component';
import { SearchComponent } from './component/search/search.component';




export const routes: Routes = [
    {path: "", redirectTo: "welcome", pathMatch:"full"},
    {path: "welcome", component: LandingPageComponent},
    {path: "discovery", component: MainComponent},
    {path: "famous-stores", component: FamousComponent},
    {path: "stores", component: AllRestaurantsComponent},
    {path: "stores/:name", component: SelectedStoreComponent},
    {path: "categories", component: CategoriesComponent},
    {path: "categories/:category",component: SelectedCategoryComponent},
    {path: "menu-not-found",component: NotFoundComponent},
    {path: "about", component: AboutComponent},
    {path: "faqs", component: FaqComponent},
    {path: "support", component: SupportComponent},
    {path: "terms-of-use", component: TermsOfUseComponent},
    {path: "search", component: SearchComponent},
    {path: "**", component: NotFoundComponent}
];
