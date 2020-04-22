import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api/selectitem';
import { CompaniesService } from 'src/app/open-api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: any;

  companies: SelectItem[] = [];

  returnUrl: string;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private companiesService: CompaniesService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.userLogin = { username: null, password: null };
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.userLogin.username, this.userLogin.password)
      .subscribe(
        _data => this.router.navigate([this.returnUrl]),
        error => {
          this.messageService.add({
            key: 'login-toast',
            severity: 'error',
            summary: this.translate.instant('errorSummary'),
            detail: this.translate.instant('loginErrorDetail')
          });
          this.loading = false;
        });
  }

}
