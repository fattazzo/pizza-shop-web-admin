import { Component, OnInit } from '@angular/core';
import { DeliveryAddress, Group, GroupsService, ShippingMethod, UserDetails, UsersService } from 'src/app/open-api';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AppMessageService } from 'src/app/services/app-message.service';
import { SessionService } from 'src/app/services/session.service';
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
    private session: SessionService,
    private appMessageService: AppMessageService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.onNew();

    this.session.getBranch().subscribe(b => this.shippingMethodsAvailable = b.shippingMethods);
    this.groupsService.getGroups().subscribe(g => this.groups = g);

    this.usersComponentService.userSelected.subscribe(u => {
      this.userService.getUser(u.username).subscribe(ud => {
        this.user = ud;
        this.groupsAvailable = this.groups.
          filter(g => this.user.groups.findIndex(ug => ug.id === g.id) === -1);
      })
    });
  }

  onNew() {
    this.user = { username: null, password: null, groups: [] };
    this.groupsAvailable = this.groups;
  }

  onSubmit() {
    if (this.user.username) {
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

  private createUser() {
    this.userService.createUser(this.user).subscribe(result => {
      this.user = result;
      this.usersComponentService.modifyUser(this.user);
    })
  }

  private editUser() {
    this.userService.updateUser(this.user, this.user.username).subscribe(result => {
      this.user = result;
      this.usersComponentService.modifyUser(this.user);
    })
  }

  updateAddress(addresses?: DeliveryAddress[]) {
    if (!addresses) { return }

    this.user.deliveryAddresses = addresses;
  }

}
