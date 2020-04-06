import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Branch, Company } from '../open-api';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  private _company: BehaviorSubject<Company> = new BehaviorSubject(null);
  private _branch: BehaviorSubject<Branch> = new BehaviorSubject(null);

  private _branches: BehaviorSubject<Branch[]> = new BehaviorSubject([]);

  constructor() {
    this._company.next(JSON.parse(sessionStorage.getItem('company')));
    this._branch.next(JSON.parse(sessionStorage.getItem('branch')));
    this._branches.next(JSON.parse(sessionStorage.getItem('branches')));
  }

  clearData() {
    this._company.next(null);
    sessionStorage.removeItem('company');

    this._branch.next(null);
    sessionStorage.removeItem('branch');

    this._branches.next([]);
    sessionStorage.removeItem('branches');
  }

  getCompanyId(): number {
    return this._company.value.id;
  }

  getCompany(): Observable<Company> {
    return this._company.asObservable();
  }

  setCompany(company: Company) {
    this._company.next(company);
    sessionStorage.setItem('company', JSON.stringify(company));
  }

  getBranch(): Observable<Branch> {
    return this._branch.asObservable();
  }

  setBranch(branch: Branch) {
    this._branch.next(branch);
    sessionStorage.setItem('branch', JSON.stringify(branch));
  }

  getBranches(): Observable<Branch[]> {
    return this._branches.asObservable();
  }

  setBranches(branches: Branch[]) {
    this._branches.next(branches);
    sessionStorage.setItem('branches', JSON.stringify(branches));
  }
}
