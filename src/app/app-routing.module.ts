import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from './open-api';
import { AuthGuard } from './pages/auth/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { UnauthorizedComponent } from './pages/auth/unauthorized/unauthorized.component';
import { BranchesComponent } from './pages/data/branches/branches.component';
import { CompanyComponent } from './pages/data/company/company.component';
import { GroupsComponent } from './pages/data/groups/groups.component';
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
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
