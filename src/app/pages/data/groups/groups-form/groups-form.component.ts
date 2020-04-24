import { Component, OnInit } from '@angular/core';
import { Group, GroupsService, Role } from 'src/app/open-api';
import { AppMessageService } from 'src/app/services/app-message.service';
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
    private appMessageService: AppMessageService
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
    this.group = { id: null, name: null, roles: [], readOnly: false };
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
    var deleteFunc = () => {
      this.groupService.deleteGroup(this.group.id)
        .subscribe(() => {
          this.groupsComponentService.deleteGroup(this.group)
          this.onNew();
          this.appMessageService.addSuccessfullDelete();
        });
    }

    this.appMessageService.confirm('confirmDeleteTitle', 'confirmDeleteResource', deleteFunc);
  }

  private createGroup() {
    this.groupService.createGroup(this.group).subscribe(result => {
      this.group = result;
      this.groupsComponentService.modifyGroup(this.group);
      this.appMessageService.addSuccessfullInsert();
    })
  }

  private editGroup() {
    this.groupService.updateGroup(this.group, this.group.id).subscribe(result => {
      this.group = result;
      this.groupsComponentService.modifyGroup(this.group);
      this.appMessageService.addSuccessfullUpdate();
    })
  }

}
