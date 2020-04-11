import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api/menuitem';
import { SelectItem } from 'primeng/api/selectitem';
import { map } from 'rxjs/operators';
import { AuthService } from '../pages/auth/auth.service';
import { MenuService } from '../services/menu.service';
import { SessionService } from '../services/session.service';
import { Theme } from '../services/theme/theme';
import { ThemeService } from '../services/theme/theme.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  itemsData: MenuItem[];
  itemsSettings: MenuItem[];
  itemsUser: MenuItem[];

  appTitle: string = 'Pizza shop web app';
  companyDisabled: boolean = false;

  branchesItems: SelectItem[];

  constructor(
    private translate: TranslateService,
    private themeService: ThemeService,
    public authService: AuthService,
    private router: Router,
    public session: SessionService,
    private menuService: MenuService) { }

  ngOnInit(): void {
    this.buildSettingsItems();
    this.buildUserItems();

    this.translate.onLangChange.subscribe((_event: LangChangeEvent) => {
      this.buildSettingsItems();
      this.buildUserItems();
    });

    this.menuService.getDataMenu().subscribe(menu => this.itemsData = menu);

    this.session.getCompany().subscribe(c => {
      this.appTitle = c !== null ? c.name : 'Pizza shop web app';
      this.companyDisabled = !c?.enabled;
    });

    this.session.getBranches().pipe(map(bs => {
      if (!bs) { return [] }
      return bs.map(b => { return { label: b.address.place + ' - ' + b.address.streetAddress, value: b.id } })
    }))
      .subscribe(items => {
        this.branchesItems = items
      });
  }

  private buildUserItems() {
    this.itemsUser = [
      {
        label: this.translate.instant('logout'),
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    ]
  }

  private buildSettingsItems() {
    this.itemsSettings = [
      {
        label: this.translate.instant('language'),
        icon: 'pi pi-info',
        items: [
          {
            label: 'IT',
            icon: 'pi pi-info',
            command: e => this.translate.use('it')
          },
          {
            label: 'EN',
            icon: 'pi pi-info',
            command: e => this.translate.use('en')
          }
        ]
      },
      {
        label: this.translate.instant('themes'),
        icon: 'pi pi-palette',
        items: [
          {
            label: 'Luna Amber',
            icon: 'pi pi-palette',
            command: () => this.themeService.changeTheme(Theme.LUNA_AMBER)
          },
          {
            label: 'Luna Blue',
            icon: 'pi pi-palette',
            command: () => this.themeService.changeTheme(Theme.LUNA_BLUE)
          },
          {
            label: 'Luna Green',
            icon: 'pi pi-palette',
            command: () => this.themeService.changeTheme(Theme.LUNA_GREEN)
          },
          {
            label: 'Luna Pink',
            icon: 'pi pi-palette',
            command: () => this.themeService.changeTheme(Theme.LUNA_PINK)
          },
          {
            label: 'Nova Colored',
            icon: 'pi pi-palette',
            command: () => this.themeService.changeTheme(Theme.NOVA_COLORED)
          },
          {
            label: 'Nova Dark',
            icon: 'pi pi-palette',
            command: () => this.themeService.changeTheme(Theme.NOVA_DARK)
          },
          {
            label: 'Nova light',
            icon: 'pi pi-palette',
            command: () => this.themeService.changeTheme(Theme.NOVA_LIGHT)
          }, {
            label: 'Rhea',
            icon: 'pi pi-palette',
            command: () => this.themeService.changeTheme(Theme.RHEA)
          }
        ]
      }
    ];
  }

}
