import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api/selectitem';
import { UserStatusHandler } from 'src/app/handler/user-status.handler';
import { UserTypeHandler } from 'src/app/handler/user-type.handler';
import { User, UsersService } from 'src/app/open-api';
import { UsersComponentService } from '../services/users-component.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  users: User[] = [];
  userSelected: User;

  loading = false;

  userStatuses: SelectItem[] = [];
  userTypes: SelectItem[] = [];

  constructor(
    private usersService: UsersService,
    private usersComponentService: UsersComponentService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    this.loading = true;
    this.usersService
      .getUsers()
      .subscribe(result => {
        this.loading = false;
        this.users = result;
      }, _error => {
        this.loading = false;
      })

    this.usersComponentService.userDeleted.subscribe(user => this.removeUser(user));
    this.usersComponentService.userModified.subscribe(user => this.addUser(user));

    this.buildUserStatuses();
    this.buildUserTypes();
    this.translate.onLangChange.subscribe((_event: LangChangeEvent) => {
      this.buildUserStatuses();
      this.buildUserTypes();
    });
  }

  onRowSelect(event) {
    this.userSelected = event.data;
    this.usersComponentService.selectUser(Object.assign({}, event.data))
  }

  private removeUser(user: User) {
    this.users = this.users.filter(obj => obj.username !== user.username)
  }

  private addUser(user: User) {
    const userFound = this.users.find(obj => obj.username === user.username);
    if (userFound !== undefined) {
      const index = this.users.indexOf(userFound);
      if (index !== -1) {
        this.users[index] = user;
      }
    } else {
      this.users.push(user);
    }
  }

  private buildUserStatuses() {
    this.userStatuses = [{ label: 'Tutti', value: null }, ...UserStatusHandler.createSelectedItems(this.translate)];
  }

  private buildUserTypes() {
    this.userTypes = [{ label: 'Tutti', value: null }, ...UserTypeHandler.createSelectedItems(this.translate)];
  }
}
