import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Group } from 'src/app/open-api';

@Injectable()
export class GroupsComponentService {

  private groupSelectedSubjet = new Subject<Group>();
  private groupDeletedSubject = new Subject<Group>();
  private groupModifiedSubject = new Subject<Group>();

  groupSelected = this.groupSelectedSubjet.asObservable();
  selectGroup(group: Group) {
    this.groupSelectedSubjet.next(group);
  }

  groupDeleted = this.groupDeletedSubject.asObservable();
  deleteGroup(group: Group) {
    this.groupDeletedSubject.next(group);
  }

  groupModified = this.groupModifiedSubject.asObservable();
  modifyGroup(group: Group) {
    this.groupModifiedSubject.next(group);
  }
}
