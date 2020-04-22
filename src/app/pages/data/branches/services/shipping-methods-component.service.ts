import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Branch } from 'src/app/open-api';

@Injectable()
export class BranchesComponentService {

  private branchSelectedSubjet = new Subject<Branch>();
  private branchDeletedSubject = new Subject<Branch>();
  private branchModifiedSubject = new Subject<Branch>();

  branchSelected = this.branchSelectedSubjet.asObservable();
  selectBranch(branch: Branch) {
    this.branchSelectedSubjet.next(branch);
  }

  branchDeleted = this.branchDeletedSubject.asObservable();
  deleteBranch(branch: Branch) {
    this.branchDeletedSubject.next(branch);
  }

  branchModified = this.branchModifiedSubject.asObservable();
  modifyBranch(branch: Branch) {
    this.branchModifiedSubject.next(branch);
  }
}
