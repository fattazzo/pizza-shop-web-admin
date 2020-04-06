import { Component, OnInit } from '@angular/core';
import { DeliveryAddress, Group, GroupsService, Role, ShippingMethod, ShippingmethodsService, UserDetails, UsersService } from 'src/app/open-api';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AppMessageService } from 'src/app/services/app-message.service';
import { SessionService } from 'src/app/services/session.service';
import { AuthUtils } from 'src/app/utils/auth-utils';
import { UsersComponentService } from '../services/users-component.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  user: UserDetails;

  groups: Group[] = [];
  groupsAvailable: Group[] = [];

  shippingMethodsAvailable: ShippingMethod[];

  constructor(
    private usersComponentService: UsersComponentService,
    private userService: UsersService,
    private groupsService: GroupsService,
    private shippingmethodsService: ShippingmethodsService,
    private authUtils: AuthUtils,
    private session: SessionService,
    private appMessageService: AppMessageService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.onNew();

    this.shippingmethodsService.getShippingMethods(this.session.getCompanyId()).subscribe(s => this.shippingMethodsAvailable = s);
    this.groupsService.getGroups(this.session.getCompanyId()).subscribe(g => this.groups = g);

    this.usersComponentService.userSelected.subscribe(u => {
      this.userService.getUser(this.session.getCompanyId(), u.id).subscribe(ud => {
        this.user = ud;
        this.groupsAvailable = this.groups.
          filter(g => this.user.groups.findIndex(ug => ug.id === g.id) === -1);
      })
    });
  }

  onNew() {
    this.user = { id: null, username: null, password: null, groups: [] };
    this.groupsAvailable = this.groups;
  }

  onSubmit() {
    if (this.user.id) {
      this.editUser();
    } else {
      this.createUser();
    }
  }

  onDelete() {
    var deleteFunc = function () {
      this.userService.deleteUser(this.session.getCompanyId(), this.user.id)
        .subscribe(() => {
          this.usersComponentService.deleteUser(this.user)
          this.onNew();
        });
    }

    this.appMessageService.confirm('confirmDeleteTitle', 'confirmDeleteResource', deleteFunc);
  }

  hasEditRole(): boolean {
    return this.authUtils.isInRole([Role.SECURITYEDIT])
  }

  private createUser() {
    this.userService.createUser(this.user, this.session.getCompanyId()).subscribe(result => {
      this.user = result;
      this.usersComponentService.modifyUser(this.user);
    })
  }

  private editUser() {
    this.userService.updateUser(this.user, this.session.getCompanyId(), this.user.id).subscribe(result => {
      this.user = result;
      this.usersComponentService.modifyUser(this.user);
    })
  }

  updateAddress(addresses?: DeliveryAddress[]) {
    if (!addresses) { return }

    this.user.deliveryAddresses = addresses;
  }

}
