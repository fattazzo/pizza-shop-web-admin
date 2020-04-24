import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { map } from 'rxjs/operators';
import { BranchDetails, BranchesService, Role, ShippingmethodsService } from 'src/app/open-api';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AppMessageService } from 'src/app/services/app-message.service';
import { AuthUtils } from 'src/app/utils/auth-utils';
import { BranchesComponentService } from '../services/shipping-methods-component.service';

@Component({
  selector: 'app-branches-form',
  templateUrl: './branches-form.component.html',
  styleUrls: ['./branches-form.component.scss']
})
export class BranchesFormComponent implements OnInit {

  branch: BranchDetails;

  shippingMethodsAvailable: SelectItem[];

  constructor(
    private branchsComponentService: BranchesComponentService,
    private branchService: BranchesService,
    private shippingmethodsService: ShippingmethodsService,
    private authUtils: AuthUtils,
    private appMessageService: AppMessageService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.onNew();

    this.shippingmethodsService.getShippingMethods()
      .pipe(map(ss => ss.map(s => { return { label: s.title, value: s } })))
      .subscribe(s => this.shippingMethodsAvailable = s);

    this.branchsComponentService.branchSelected.subscribe(b => {
      this.branchService.getBranch(b.id).subscribe(bd => {
        this.branch = bd;
      })
    });
  }

  onNew() {
    this.branch = {
      id: null, shippingMethods: [], primary: false, enabled: true,
      address: { streetAddress: null, place: null },
      shippingZones: []
    };
  }

  onSubmit() {
    if (this.branch.id) {
      this.editBranch();
    } else {
      this.createBranch();
    }
  }

  onDelete() {
    var deleteFunc = () => {
      this.branchService.deleteBranch(this.branch.id)
        .subscribe(() => {
          this.branchsComponentService.deleteBranch(this.branch)
          this.onNew();
          this.appMessageService.addSuccessfullDelete();
        });
    }

    this.appMessageService.confirmDelete(deleteFunc);
  }

  hasEditRole(): boolean {
    return this.authUtils.isInRole([Role.COMPANY])
  }

  private createBranch() {
    this.branchService.createBranch(this.branch).subscribe(result => {
      this.branch = result;
      this.branchsComponentService.modifyBranch(this.branch);
      this.appMessageService.addSuccessfullInsert();
    })
  }

  private editBranch() {
    this.branchService.updateBranch(this.branch, this.branch.id).subscribe(result => {
      this.branch = result;
      this.branchsComponentService.modifyBranch(this.branch);
      this.appMessageService.addSuccessfullUpdate();
    })
  }

}
