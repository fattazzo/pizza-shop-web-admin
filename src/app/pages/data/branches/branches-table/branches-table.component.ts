import { Component, OnInit } from '@angular/core';
import { Branch, BranchesService } from 'src/app/open-api';
import { BranchesComponentService } from '../services/shipping-methods-component.service';

@Component({
  selector: 'app-branches-table',
  templateUrl: './branches-table.component.html',
  styleUrls: ['./branches-table.component.scss']
})
export class BranchesTableComponent implements OnInit {

  branches: Branch[] = [];
  branchSelected: Branch;

  loading = false;

  constructor(
    private branchesService: BranchesService,
    private branchesComponentService: BranchesComponentService
  ) { }

  ngOnInit(): void {

    this.loading = true;
    this.branchesService.getBranches()
      .subscribe(result => {
        this.loading = false;
        this.branches = result;
      }, _error => {
        this.loading = false;
      })

    this.branchesComponentService.branchDeleted.subscribe(branch => this.removeBranch(branch));
    this.branchesComponentService.branchModified.subscribe(branch => this.addBranch(branch));
  }

  onRowSelect(event) {
    this.branchSelected = event.data;
    this.branchesComponentService.selectBranch(Object.assign({}, event.data))
  }

  private removeBranch(branch: Branch) {
    this.branches = this.branches.filter(obj => obj.id !== branch.id)
  }

  private addBranch(branch: Branch) {
    const branchFound = this.branches.find(obj => obj.id === branch.id);
    if (branchFound !== undefined) {
      const index = this.branches.indexOf(branchFound);
      if (index !== -1) {
        this.branches[index] = branch;
      }
    } else {
      this.branches.push(branch);
    }
  }
}
