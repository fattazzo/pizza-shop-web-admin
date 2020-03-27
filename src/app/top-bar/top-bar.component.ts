import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  itemsAnagrafiche: MenuItem[];
  itemsLangs: MenuItem[];
  itemsThemes: MenuItem[];

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.buildMenuItems();
    this.buildLangsItems();
    this.buildThemesItems();
  }

  private buildMenuItems() {
    this.itemsAnagrafiche = [
      {
        label: this.translate.instant('anagrafiche.betoniere'),
        icon: 'pi pi-table',
      },
      {
        label: this.translate.instant('anagrafiche.controlli-consistenza'),
        icon: 'pi pi-table'
      },
      {
        label: this.translate.instant('anagrafiche.curve'),
        icon: 'pi pi-table'
      },
      {
        label: this.translate.instant('anagrafiche.dati-formule'),
        icon: 'pi pi-table'
      },
      {
        label: this.translate.instant('anagrafiche.dati-ciclo-ism'),
        icon: 'pi pi-table'
      },
      {
        label: this.translate.instant('anagrafiche.clienti'),
        icon: 'pi pi-table'
      },
      {
        label: this.translate.instant('anagrafiche.destinazioni'),
        icon: 'pi pi-table'
      },
      {
        label: this.translate.instant('anagrafiche.logs'),
        icon: 'pi pi-info-circle'
      }
    ];
  }

  private buildLangsItems() {
    this.itemsLangs = [
      {
        label: 'IT',
        icon: 'pi pi-info',
        command: e => this.translate.use('it')
      },
      {
        label: 'EN',
        icon: 'pi pi-info',
        command: e => this.translate.use('en')
      },
      {
        label: 'FR',
        icon: 'pi pi-info',
        command: e => this.translate.use('fr')
      }
    ];
  }

  private buildThemesItems() {
    this.itemsThemes = [
      {
        label: this.translate.instant('_grafico 1_'),
        icon: 'pi pi-chart-line'
      },
      {
        label: this.translate.instant('_statistiche slump_'),
        icon: 'pi pi-chart-line'
      }
    ]
  }

}
