import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Role } from 'src/app/open-api';
import { AuthUtils } from 'src/app/utils/auth-utils';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private authUtils: AuthUtils,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    let roles = route.data.roles as Array<Role>;

    return this.checkLogin(url, roles);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    let roles = route.data.roles as Array<Role>;

    return this.checkLogin(url, roles);
  }

  checkLogin(url: string, roles: Role[]): boolean {
    if (this.authService.currentUserValue.value) {
      if (roles && !this.authUtils.isInRole(roles)) {
        this.router.navigate(['unauthorized']);
        return false;
      }
      return true;
    }

    this.router.navigate(['login'], { queryParams: { returnUrl: url } });
    return false;
  }
}
