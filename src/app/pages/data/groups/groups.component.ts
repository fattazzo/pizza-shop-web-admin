import { Component, OnInit } from '@angular/core';
import { GroupsComponentService } from './services/groups-component.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [GroupsComponentService]
})
export class GroupsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
