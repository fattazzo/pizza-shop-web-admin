import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api/menuitem';
import { SelectItem } from 'primeng/api/selectitem';
import { map } from 'rxjs/operators';
import { CompaniesService } from '../open-api';
import { AuthService } from '../pages/auth/auth.service';
import { MenuService } from '../services/menu.service';
import { SessionService } from '../services/session.service';

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

  branchesItems: SelectItem[];

  constructor(
    private translate: TranslateService,
    public authService: AuthService,
    private router: Router,
    public session: SessionService,
    public companiesService: CompaniesService,
    private menuService: MenuService) { }

  ngOnInit(): void {
    this.buildUserItems();

    this.translate.onLangChange.subscribe((_event: LangChangeEvent) => {
      this.buildUserItems();
    });

    this.menuService.getDataMenu().subscribe(menu => this.itemsData = menu);
    this.menuService.getSettingsMenu().subscribe(menu => this.itemsSettings = menu);

    this.session.getCompany().subscribe(c => {
      this.appTitle = c !== null ? c.name : 'Pizza shop web app';
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
}
