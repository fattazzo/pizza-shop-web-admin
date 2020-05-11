import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { ProductvariationsService, Role, VariationProduct } from 'src/app/open-api';
import { AppMessageService } from 'src/app/services/app-message.service';
import { AuthUtils } from 'src/app/utils/auth-utils';
import { ProductVariationsComponentService } from '../services/product-variations-component.service';

@Component({
  selector: 'app-product-variations-form',
  templateUrl: './product-variations-form.component.html',
  styleUrls: ['./product-variations-form.component.scss']
})
export class ProductVariationsFormComponent implements OnInit {

  variation: VariationProduct;

  types: SelectItem[] = [];

  constructor(
    private variationsComponentService: ProductVariationsComponentService,
    private variationService: ProductvariationsService,
    private appMessageService: AppMessageService,
    private authUtils: AuthUtils,
  ) { }

  ngOnInit(): void {
    this.onNew();
    this.variationsComponentService.variationSelected.subscribe(sm => {
      this.variation = sm
    });

  }

  onNew() {
    this.variation = { id: null, name: null, description: null, enabled: true };
  }

  onSubmit() {
    if (this.variation.id) {
      this.editVariation();
    } else {
      this.createVariation();
    }
  }

  onDelete() {
    var deleteFunc = () => {
      this.variationService.deleteVariationProduct(this.variation.id)
        .subscribe(() => {
          this.variationsComponentService.deleteVariationProduct(this.variation)
          this.onNew();
          this.appMessageService.addSuccessfullDelete();
        });
    }

    this.appMessageService.confirmDelete(deleteFunc);
  }

  private createVariation() {
    this.variationService.createVariationProduct(this.variation).subscribe(result => {
      this.variation = result;
      this.variationsComponentService.modifyVariationProduct(this.variation);
      this.appMessageService.addSuccessfullInsert();
    })
  }

  private editVariation() {
    this.variationService.updateVariationProduct(this.variation, this.variation.id).subscribe(result => {
      this.variation = result;
      this.variationsComponentService.modifyVariationProduct(this.variation);
      this.appMessageService.addSuccessfullUpdate();
    })
  }

  hasEditRole(): boolean {
    return this.authUtils.isInRole([Role.VARIATIONS])
  }
}
