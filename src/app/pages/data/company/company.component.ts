import { Component, OnInit } from '@angular/core';
import { CompaniesService, Company } from 'src/app/open-api';
import { AppMessageService } from 'src/app/services/app-message.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  company: Company;

  logoUrl: any;

  constructor(
    private session: SessionService,
    private appMessageService: AppMessageService,
    private companiesService: CompaniesService
  ) { }

  ngOnInit(): void {
    this.session.getCompany().subscribe(comp => {
      this.company = comp;
      this.logoUrl = this.company.logoUrl;
    });
  }

  onSubmit() {
    this.companiesService.updateCompany(this.company)
      .subscribe(result => {
        this.company = result;
        this.session.setCompany(this.company);
        this.appMessageService.addSuccessfullUpdate();
      })
  }

  openFile() {
    (document.querySelector('.inputUpload') as HTMLInputElement).click()
  }

  handle(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.companiesService.updateLogo(file).subscribe(() => {
        this.logoUrl = `${this.company.logoUrl}?${new Date().getTime()}`
      })
    }
  }
}
