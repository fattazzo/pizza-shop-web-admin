import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/open-api';

@Injectable()
export class UsersComponentService {

  private userSelectedSubjet = new Subject<User>();
  private userDeletedSubject = new Subject<User>();
  private userModifiedSubject = new Subject<User>();

  userSelected = this.userSelectedSubjet.asObservable();
  selectUser(user: User) {
    this.userSelectedSubjet.next(user);
  }

  userDeleted = this.userDeletedSubject.asObservable();
  deleteUser(user: User) {
    this.userDeletedSubject.next(user);
  }

  userModified = this.userModifiedSubject.asObservable();
  modifyUser(user: User) {
    this.userModifiedSubject.next(user);
  }
}
