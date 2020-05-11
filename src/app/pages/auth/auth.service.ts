import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Branch, BranchesService, CompaniesService, SessionService as SessionRestService, UsersService } from 'src/app/open-api';
import { SettingsService } from 'src/app/open-api/api/settings.service';
import { SessionService } from 'src/app/services/session.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private sessionService: SessionService,
    private companiesService: CompaniesService,
    private branchesService: BranchesService,
    private usersService: UsersService,
    private sessionRestService: SessionRestService,
    private settingsService: SettingsService
  ) { }

  login(username: string, password: string, locale: string): Observable<void> {

    return this.sessionRestService.login({ username: username, password: password, locale: locale }).pipe(switchMap(session => {

      sessionStorage.setItem("access-token", session.accessToken);
      sessionStorage.setItem("refresh-token", session.refreshToken);
      sessionStorage.setItem("locale", locale);

      let cs = this.companiesService.getCompany();
      let bs = this.branchesService.getBranches();
      let ud = this.usersService.getUser(username);
      let s = this.settingsService.getSettings();

      return forkJoin([ud, cs, bs, s]).pipe(map((results: any[]) => {
        this.sessionService.setUser(results[0]);
        this.sessionService.setCompany(results[1]);
        this.sessionService.setBranches(results[2]);
        this.sessionService.setSettings(results[3]);

        const primaryBranch: Branch = (results[2] as Branch[]).filter(b => b.primary === true)[0];
        this.branchesService.getBranch(primaryBranch.id)
          .subscribe(b => this.sessionService.setBranch(b));

        return;
      }))

    }))
  }

  logout() {
    // remove user from session storage to log user out
    this.sessionService.clearData();
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("refresh-token");
  }
}
