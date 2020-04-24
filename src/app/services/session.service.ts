import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Branch, BranchDetails, Company, UserDetails } from '../open-api';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  private _user: BehaviorSubject<UserDetails> = new BehaviorSubject(null);

  private _company: BehaviorSubject<Company> = new BehaviorSubject(null);
  private _branch: BehaviorSubject<BranchDetails> = new BehaviorSubject(null);

  private _branches: BehaviorSubject<Branch[]> = new BehaviorSubject([]);

  constructor() {
    this._user.next(JSON.parse(sessionStorage.getItem('user')));
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

    this._user.next(null);
    sessionStorage.removeItem('user');
  }

  getUser(): Observable<UserDetails> {
    return this._user.asObservable();
  }

  getUserValue(): UserDetails {
    return this._user.value;
  }

  setUser(user: UserDetails) {
    this._user.next(user);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getCompany(): Observable<Company> {
    return this._company.asObservable();
  }

  setCompany(company: Company) {
    this._company.next(company);
    sessionStorage.setItem('company', JSON.stringify(company));
  }

  getBranchId(): number {
    return this._branch.value.id;
  }

  getBranch(): Observable<BranchDetails> {
    return this._branch.asObservable();
  }

  setBranch(branch: BranchDetails) {
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
