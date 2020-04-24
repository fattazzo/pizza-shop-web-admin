import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api/menuitem';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../open-api';
import { SessionService } from './session.service';
import { Theme } from './theme/theme';
import { ThemeService } from './theme/theme.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  _dataMenuItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject([]);
  _settingsMenuItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject([]);

  constructor(
    private translate: TranslateService,
    private sessionService: SessionService,
    private themeService: ThemeService,
    private router: Router) {

    translate.onLangChange.subscribe((_event: LangChangeEvent) => {
      this.buildDataMenu();
      this.buildSettingsMenu();
    });
    sessionService.getUser().subscribe(() => {
      this.buildDataMenu();
      this.buildSettingsMenu();
    });
  }

  getDataMenu(): Observable<MenuItem[]> {
    return this._dataMenuItems.asObservable();
  }

  getSettingsMenu(): Observable<MenuItem[]> {
    return this._settingsMenuItems.asObservable();
  }

  private getUserRoles(): Role[] {
    let allRoles: Role[] = [];
    if (this.sessionService.getUserValue()) {
      this.sessionService.getUserValue().groups.map(g => allRoles = allRoles.concat(g.roles));
    }
    return allRoles;
  }

  private buildDataMenu() {
    let menu: MenuItem[] = [];

    let allRoles = this.getUserRoles();

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

    // PRODUCTS
    if (allRoles.indexOf(Role.PRODUCTS) >= 0) {
      menu.push(
        {
          label: this.translate.instant('productAndCategory', { count: 2 }),
          icon: 'pi pi-table',
          command: () => this.router.navigate(['products'])
        }
      )
    }

    // VARIATIONS
    if (allRoles.indexOf(Role.VARIATIONS) >= 0) {
      menu.push(
        {
          label: this.translate.instant('variation', { count: 2 }),
          icon: 'pi pi-table',
          command: () => this.router.navigate(['variations'])
        }
      )
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

  private buildSettingsMenu() {
    let allRoles = this.getUserRoles();

    let menu: MenuItem[] = [
      {
        label: this.translate.instant('language'),
        icon: 'pi pi-info',
        items: [
          { label: 'IT', icon: 'pi pi-info', command: () => this.translate.use('it') },
          { label: 'EN', icon: 'pi pi-info', command: () => this.translate.use('en') }
        ]
      },
      {
        label: this.translate.instant('themes'),
        icon: 'pi pi-palette',
        items: [
          { label: 'Luna Amber', icon: 'pi pi-palette', command: () => this.themeService.changeTheme(Theme.LUNA_AMBER) },
          { label: 'Luna Blue', icon: 'pi pi-palette', command: () => this.themeService.changeTheme(Theme.LUNA_BLUE) },
          { label: 'Luna Green', icon: 'pi pi-palette', command: () => this.themeService.changeTheme(Theme.LUNA_GREEN) },
          { label: 'Luna Pink', icon: 'pi pi-palette', command: () => this.themeService.changeTheme(Theme.LUNA_PINK) },
          { label: 'Nova Colored', icon: 'pi pi-palette', command: () => this.themeService.changeTheme(Theme.NOVA_COLORED) },
          { label: 'Nova Dark', icon: 'pi pi-palette', command: () => this.themeService.changeTheme(Theme.NOVA_DARK) },
          { label: 'Nova Light', icon: 'pi pi-palette', command: () => this.themeService.changeTheme(Theme.NOVA_LIGHT) },
          { label: 'Rhea', icon: 'pi pi-palette', command: () => this.themeService.changeTheme(Theme.RHEA) }
        ]
      }
    ];

    // SECURITY
    if (allRoles.indexOf(Role.SECURITY) >= 0) {
      menu.push(
        {
          label: this.translate.instant('configuration', { count: 1 }),
          icon: 'pi pi-table',
          command: () => this.router.navigate(['settings'])
        }
      )
    }

    this._settingsMenuItems.next(menu);
  }
}
