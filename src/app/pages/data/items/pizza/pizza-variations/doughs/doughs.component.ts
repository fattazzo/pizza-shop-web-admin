import { Component, OnInit } from '@angular/core';
import { PizzavariationsService, Role } from 'src/app/open-api';
import { VariationDough } from 'src/app/open-api/model/variationDough';
import { AppMessageService } from 'src/app/services/app-message.service';
import { SessionService } from 'src/app/services/session.service';
import { AuthUtils } from 'src/app/utils/auth-utils';

@Component({
  selector: 'app-doughs',
  templateUrl: './doughs.component.html',
  styleUrls: ['./doughs.component.scss']
})
export class DoughsComponent implements OnInit {

  loading = false;

  doughs: VariationDough[] = [];
  doughSelected: VariationDough;
  doughForm: VariationDough;

  constructor(
    private variationsService: PizzavariationsService,
    private authUtils: AuthUtils,
    private appMessageService: AppMessageService,
    public session: SessionService
  ) { }

  ngOnInit(): void {
    this.onNew()

    this.loading = true;
    this.variationsService.getDoughs(true)
      .subscribe(result => {
        this.loading = false;
        this.doughs = result;
      }, _error => {
        this.loading = false;
      })
  }

  onRowSelect(event) {
    this.doughForm = Object.assign({}, event.data);
  }

  onNew() {
    this.doughForm = { id: null, name: null, extra: 0, enabled: true }
  }

  onSubmit() {
    if (this.doughForm.id) {
      this.editDough();
    } else {
      this.createDough();
    }
  }

  private createDough() {
    this.variationsService.createDough(this.doughForm).subscribe(result => {
      this.doughs.push(result);
      this.doughForm = result;
      this.doughSelected = result;
      this.appMessageService.addSuccessfullInsert();
    })
  }

  private editDough() {
    this.variationsService.updateDough(this.doughForm, this.doughForm.id).subscribe(result => {
      const toppingFound = this.doughs.find(obj => obj.id === result.id);
      if (toppingFound !== undefined) {
        const index = this.doughs.indexOf(toppingFound);
        if (index !== -1) {
          this.doughs[index] = result;
        }
      }
      this.doughForm = result;
      this.doughSelected = result;

      this.appMessageService.addSuccessfullUpdate();
    })
  }

  onDelete() {
    var deleteFunc = () => {
      this.variationsService.deleteDough(this.doughForm.id)
        .subscribe(() => {
          this.doughs = this.doughs.filter(obj => obj.id !== this.doughForm.id)
          this.onNew();
          this.appMessageService.addSuccessfullDelete();
        });
    }

    this.appMessageService.confirmDelete(deleteFunc);
  }

  hasEditRole(): boolean {
    return this.authUtils.isInRole([Role.VARIATIONS])
  }

}
