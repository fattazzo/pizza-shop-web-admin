import { Component, OnInit } from '@angular/core';
import { BranchesComponentService } from './services/branches-component.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
  providers: [BranchesComponentService]
})
export class BranchesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
