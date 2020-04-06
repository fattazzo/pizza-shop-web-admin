import { Component, OnInit } from '@angular/core';
import { Group, GroupsService } from 'src/app/open-api';
import { SessionService } from 'src/app/services/session.service';
import { GroupsComponentService } from '../services/groups-component.service';

@Component({
  selector: 'app-groups-tables',
  templateUrl: './groups-tables.component.html',
  styleUrls: ['./groups-tables.component.scss']
})
export class GroupsTablesComponent implements OnInit {

  groups: Group[] = [];
  groupSelected: Group;

  loading = false;

  constructor(
    private sessionService: SessionService,
    private groupsService: GroupsService,
    private groupsComponentService: GroupsComponentService
  ) { }

  ngOnInit(): void {

    this.loading = true;
    this.groupsService
      .getGroups(this.sessionService.getCompanyId())
      .subscribe(result => {
        this.loading = false;
        this.groups = result;
      }, _error => {
        this.loading = false;
      })

    this.groupsComponentService.groupDeleted.subscribe(group => this.removeGroup(group));
    this.groupsComponentService.groupModified.subscribe(group => this.addGroup(group));
  }

  onRowSelect(event) {
    this.groupSelected = event.data;
    this.groupsComponentService.selectGroup(Object.assign({}, event.data))
  }

  private removeGroup(group: Group) {
    this.groups = this.groups.filter(obj => obj.id !== group.id)
  }

  private addGroup(group: Group) {
    const groupFound = this.groups.find(obj => obj.id === group.id);
    if (groupFound !== undefined) {
      const index = this.groups.indexOf(groupFound);
      if (index !== -1) {
        this.groups[index] = group;
      }
    } else {
      this.groups.push(group);
    }
  }
}
