import { Component, OnInit } from '@angular/core';
import { DeliveryAddress, Group, GroupsService, ShippingMethod, UserDetails, UsersService, UserType } from 'src/app/open-api';
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
  newUser = true;

  groups: Group[] = [];
  groupsAvailable: Group[] = [];

  shippingMethodsAvailable: ShippingMethod[];

  constructor(
    private usersComponentService: UsersComponentService,
    private userService: UsersService,
    private groupsService: GroupsService,
    public session: SessionService,
    private appMessageService: AppMessageService,
  ) { }

  ngOnInit(): void {
    this.onNew();

    this.session.getBranch().subscribe(b => {
      this.shippingMethodsAvailable = [];
      if (b && b.shippingMethods) {
        this.shippingMethodsAvailable = b.shippingMethods
      };
    });
    this.groupsService.getGroups().subscribe(g => this.groups = g);

    this.usersComponentService.userSelected.subscribe(u => {
      this.userService.getUser(u.username).subscribe(ud => {
        this.user = ud;
        this.groupsAvailable = this.groups.
          filter(g => this.user.groups.findIndex(ug => ug.id === g.id) === -1);
        this.newUser = false;
      })
    });
  }

  onNew() {
    this.user = { username: null, password: null, groups: [], readOnly: false, type: UserType.WORKER };
    this.groupsAvailable = this.groups;
    this.newUser = true;
  }

  onSubmit() {
    if (this.newUser) {
      this.createUser();
    } else {
      this.editUser();
    }
  }

  onDelete() {
    var deleteFunc = () => {
      this.userService.deleteUser(this.user.username)
        .subscribe(() => {
          this.usersComponentService.deleteUser(this.user)
          this.onNew();
          this.appMessageService.addSuccessfullDelete();
        });
    }

    this.appMessageService.confirm('confirmDeleteTitle', 'confirmDeleteResource', deleteFunc);
  }

  private createUser() {
    this.userService.createUser(this.user).subscribe(result => {
      this.user = result;
      this.usersComponentService.modifyUser(this.user);
      this.appMessageService.addSuccessfullInsert();
      this.newUser = false;
    })
  }

  private editUser() {
    this.userService.updateUser(this.user, this.user.username).subscribe(result => {
      this.user = result;
      this.usersComponentService.modifyUser(this.user);
      this.appMessageService.addSuccessfullUpdate();
      this.newUser = false;
    })
  }

  updateAddress(addresses?: DeliveryAddress[]) {
    if (!addresses) { return }

    this.user.deliveryAddresses = addresses;
  }

}
