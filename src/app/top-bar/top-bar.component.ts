import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api/menuitem';
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

  constructor(
    private translate: TranslateService,
    private themeService: ThemeService) { }

  ngOnInit(): void {
    this.buildDataItems();
    this.buildSettingsItems();

    this.translate.onLangChange.subscribe((_event: LangChangeEvent) => {
      this.buildDataItems();
      this.buildSettingsItems();
    });
  }

  private buildDataItems() {
    this.itemsData = [
      {
        label: this.translate.instant('company'),
        icon: 'pi pi-table'
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
