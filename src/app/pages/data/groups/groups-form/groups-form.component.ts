import { Component, OnInit } from '@angular/core';
import { Group, GroupsService, Role } from 'src/app/open-api';
import { AppMessageService } from 'src/app/services/app-message.service';
import { SessionService } from 'src/app/services/session.service';
import { AuthUtils } from 'src/app/utils/auth-utils';
import { GroupsComponentService } from '../services/groups-component.service';

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.scss']
})
export class GroupsFormComponent implements OnInit {

  group: Group;

  roles: Role[] = Object.values(Role);
  rolesAvailable: Role[] = [];

  constructor(
    private groupsComponentService: GroupsComponentService,
    private groupService: GroupsService,
    private authUtils: AuthUtils,
    private session: SessionService,
    private appMessageService: AppMessageService,
  ) { }

  ngOnInit(): void {
    this.onNew();
    this.groupsComponentService.groupSelected.subscribe(g => {
      this.group = g
      this.rolesAvailable = this.roles.
        filter(r => this.group.roles.findIndex(gr => gr === r) === -1);
    });
  }

  onNew() {
    this.group = { id: null, name: null, roles: [] };
    this.rolesAvailable = this.roles;
  }

  onSubmit() {
    if (this.group.id) {
      this.editGroup();
    } else {
      this.createGroup();
    }
  }

  onDelete() {
    var deleteFunc = function () {
      this.groupService.deleteGroup(this.session.getCompanyId(), this.group.id)
        .subscribe(() => {
          this.groupsComponentService.deleteGroup(this.group)
          this.onNew();
        });
    }

    this.appMessageService.confirm('confirmDeleteTitle', 'confirmDeleteResource', deleteFunc);
  }

  hasEditRole(): boolean {
    return this.authUtils.isInRole([Role.SECURITYEDIT])
  }

  private createGroup() {
    this.groupService.createGroup(this.group, this.session.getCompanyId()).subscribe(result => {
      this.group = result;
      this.groupsComponentService.modifyGroup(this.group);
    })
  }

  private editGroup() {
    this.groupService.updateGroup(this.group, this.session.getCompanyId(), this.group.id).subscribe(result => {
      this.group = result;
      this.groupsComponentService.modifyGroup(this.group);
    })
  }

}
