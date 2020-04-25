import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/open-api';
import { VariationsService } from 'src/app/open-api/api/variations.service';
import { Size } from 'src/app/open-api/model/size';
import { AppMessageService } from 'src/app/services/app-message.service';
import { SessionService } from 'src/app/services/session.service';
import { AuthUtils } from 'src/app/utils/auth-utils';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss']
})
export class SizesComponent implements OnInit {

  loading = false;

  sizes: Size[] = [];
  sizeSelected: Size;
  sizeForm: Size;

  constructor(
    private variationsService: VariationsService,
    private authUtils: AuthUtils,
    private appMessageService: AppMessageService,
    public session: SessionService
  ) { }

  ngOnInit(): void {
    this.onNew()

    this.loading = true;
    this.variationsService.getSizes(true)
      .subscribe(result => {
        this.loading = false;
        this.sizes = result;
      }, _error => {
        this.loading = false;
      })
  }

  onRowSelect(event) {
    this.sizeForm = Object.assign({}, event.data);
  }

  onNew() {
    this.sizeForm = { id: null, name: null, extra: 0, enabled: true }
  }

  onSubmit() {
    if (this.sizeForm.id) {
      this.editSize();
    } else {
      this.createSize();
    }
  }

  private createSize() {
    this.variationsService.createSize(this.sizeForm).subscribe(result => {
      this.sizes.push(result);
      this.sizeForm = result;
      this.sizeSelected = result;
      this.appMessageService.addSuccessfullInsert();
    })
  }

  private editSize() {
    this.variationsService.updateSize(this.sizeForm, this.sizeForm.id).subscribe(result => {
      const toppingFound = this.sizes.find(obj => obj.id === result.id);
      if (toppingFound !== undefined) {
        const index = this.sizes.indexOf(toppingFound);
        if (index !== -1) {
          this.sizes[index] = result;
        }
      }
      this.sizeForm = result;
      this.sizeSelected = result;

      this.appMessageService.addSuccessfullUpdate();
    })
  }

  onDelete() {
    var deleteFunc = () => {
      this.variationsService.deleteSize(this.sizeForm.id)
        .subscribe(() => {
          this.sizes = this.sizes.filter(obj => obj.id !== this.sizeForm.id)
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
