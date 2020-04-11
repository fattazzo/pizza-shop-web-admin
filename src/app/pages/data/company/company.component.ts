import { Component, OnInit } from '@angular/core';
import { CompaniesService, Company, Role } from 'src/app/open-api';
import { SessionService } from 'src/app/services/session.service';
import { AuthUtils } from 'src/app/utils/auth-utils';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  company: Company;

  constructor(
    private session: SessionService,
    private authUtils: AuthUtils,
    private companiesService: CompaniesService
  ) { }

  ngOnInit(): void {
    this.session.getCompany().subscribe(comp => this.company = comp);
  }

  hasEditRole(): boolean {
    return this.authUtils.isInRole([Role.COMPANYEDIT]);
  }

  onSubmit() {
    this.companiesService.updateCompany(this.company, this.company.id)
      .subscribe(result => {
        this.company = result;
        this.session.setCompany(this.company);
      })
  }
}
