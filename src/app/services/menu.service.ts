import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api/menuitem';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../open-api';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  _dataMenuItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject([]);

  constructor(
    private translate: TranslateService,
    private sessionService: SessionService,
    private router: Router) {

    translate.onLangChange.subscribe((_event: LangChangeEvent) => this.buildDataMenu());
    sessionService.getUser().subscribe(() => this.buildDataMenu());
  }

  getDataMenu(): Observable<MenuItem[]> {
    return this._dataMenuItems.asObservable();
  }

  private buildDataMenu() {
    let menu: MenuItem[] = [];

    let allRoles: Role[] = [];
    if (this.sessionService.getUserValue()) {
      this.sessionService.getUserValue().groups.map(g => allRoles = allRoles.concat(g.roles));
    }

    // COMPANY & BRANCHES
    if (allRoles.indexOf(Role.COMPANY) >= 0) {
      menu.push({
        label: this.translate.instant('company', { count: 1 }),
        icon: 'pi pi-table',
        command: () => this.router.navigate(['company'])
      });
      menu.push({
        label: this.translate.instant('branch', { count: 2 }),
        icon: 'pi pi-table',
        command: () => this.router.navigate(['branches'])
      });
    }

    // SHIPPING METHODS
    if (allRoles.indexOf(Role.SHIPPINGMETHODS) >= 0) {
      menu.push(
        {
          label: this.translate.instant('shippingMethod', { count: 2 }),
          icon: 'pi pi-table',
          command: () => this.router.navigate(['shipping-methods'])
        }
      )
    }

    // SECURITY
    if (allRoles.indexOf(Role.SECURITY) >= 0) {
      menu.push(
        {
          label: this.translate.instant('user', { count: 2 }),
          icon: 'pi pi-table',
          command: () => this.router.navigate(['users'])
        },
        {
          label: this.translate.instant('group', { count: 2 }),
          icon: 'pi pi-table',
          command: () => this.router.navigate(['groups'])
        }
      );
    }
    this._dataMenuItems.next(menu);
  }
}
