import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from './open-api';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuard } from './pages/auth/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { UnauthorizedComponent } from './pages/auth/unauthorized/unauthorized.component';
import { BranchesComponent } from './pages/data/branches/branches.component';
import { CompanyComponent } from './pages/data/company/company.component';
import { GroupsComponent } from './pages/data/groups/groups.component';
import { PizzaCategoriesComponent } from './pages/data/items/pizza/pizza-categories/pizza-categories.component';
import { VariationsComponent } from './pages/data/items/pizza/pizza-variations/pizza-variations.component';
import { PizzasComponent } from './pages/data/items/pizza/pizzas/pizzas.component';
import { ProductCategoriesComponent } from './pages/data/items/product/product-categories/product-categories.component';
import { ProductVariationsComponent } from './pages/data/items/product/product-variations/product-variations.component';
import { ProductsComponent } from './pages/data/items/product/products/products.component';
import { SettingsComponent } from './pages/data/settings/settings.component';
import { ShippingMethodsComponent } from './pages/data/shipping-methods/shipping-methods.component';
import { UsersComponent } from './pages/data/users/users.component';
import { HomeComponent } from './pages/home/home.component';

// Layouts
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: [Role.WEBADMIN] } },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: [Role.SECURITY] } },
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard], data: { roles: [Role.SECURITY] } },
  { path: 'shipping-methods', component: ShippingMethodsComponent, canActivate: [AuthGuard], data: { roles: [Role.SHIPPINGMETHODS] } },
  { path: 'company', component: CompanyComponent, canActivate: [AuthGuard], data: { roles: [Role.COMPANY] } },
  { path: 'branches', component: BranchesComponent, canActivate: [AuthGuard], data: { roles: [Role.COMPANY] } },
  { path: 'pizza/variations', component: VariationsComponent, canActivate: [AuthGuard], data: { roles: [Role.VARIATIONS] } },
  { path: 'pizza/categories', component: PizzaCategoriesComponent, canActivate: [AuthGuard], data: { roles: [Role.PRODUCTS] } },
  { path: 'pizzas', component: PizzasComponent, canActivate: [AuthGuard], data: { roles: [Role.PRODUCTS] } },
  { path: 'product/variations', component: ProductVariationsComponent, canActivate: [AuthGuard], data: { roles: [Role.PRODUCTS] } },
  { path: 'product/categories', component: ProductCategoriesComponent, canActivate: [AuthGuard], data: { roles: [Role.PRODUCTS] } },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard], data: { roles: [Role.PRODUCTS] } },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { roles: [Role.SECURITY] } },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
