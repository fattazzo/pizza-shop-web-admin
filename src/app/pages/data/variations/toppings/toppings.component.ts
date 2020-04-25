import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/open-api';
import { VariationsService } from 'src/app/open-api/api/variations.service';
import { Topping } from 'src/app/open-api/model/topping';
import { AppMessageService } from 'src/app/services/app-message.service';
import { AuthUtils } from 'src/app/utils/auth-utils';

@Component({
  selector: 'app-toppings',
  templateUrl: './toppings.component.html',
  styleUrls: ['./toppings.component.scss']
})
export class ToppingsComponent implements OnInit {

  loading = false;

  toppings: Topping[] = [];
  toppingSelected: Topping;
  toppingForm: Topping;

  constructor(
    private variationsService: VariationsService,
    private authUtils: AuthUtils,
    private appMessageService: AppMessageService
  ) { }

  ngOnInit(): void {
    this.onNew()

    this.loading = true;
    this.variationsService.getToppings(true)
      .subscribe(result => {
        this.loading = false;
        this.toppings = result;
      }, _error => {
        this.loading = false;
      })
  }

  onRowSelect(event) {
    this.toppingForm = Object.assign({}, event.data);
  }

  onNew() {
    this.toppingForm = { id: null, name: null, enabled: true }
  }

  onSubmit() {
    if (this.toppingForm.id) {
      this.editTopping();
    } else {
      this.createTopping();
    }
  }

  private createTopping() {
    this.variationsService.createTopping(this.toppingForm).subscribe(result => {
      this.toppings.push(result);
      this.toppingForm = result;
      this.toppingSelected = result;
      this.appMessageService.addSuccessfullInsert();
    })
  }

  private editTopping() {
    this.variationsService.updateTopping(this.toppingForm, this.toppingForm.id).subscribe(result => {
      const toppingFound = this.toppings.find(obj => obj.id === result.id);
      if (toppingFound !== undefined) {
        const index = this.toppings.indexOf(toppingFound);
        if (index !== -1) {
          this.toppings[index] = result;
        }
      }
      this.toppingForm = result;
      this.toppingSelected = result;

      this.appMessageService.addSuccessfullUpdate();
    })
  }

  onDelete() {
    var deleteFunc = () => {
      this.variationsService.deleteTopping(this.toppingForm.id)
        .subscribe(() => {
          this.toppings = this.toppings.filter(obj => obj.id !== this.toppingForm.id)
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
