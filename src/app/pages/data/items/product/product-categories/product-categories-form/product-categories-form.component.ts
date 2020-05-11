import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { Category, ItemType, ProductcategoriesService, Role } from 'src/app/open-api';
import { AppMessageService } from 'src/app/services/app-message.service';
import { AuthUtils } from 'src/app/utils/auth-utils';
import { ProductCategoriesComponentService } from '../services/product-categories-component.service';

@Component({
  selector: 'app-product-categories-form',
  templateUrl: './product-categories-form.component.html',
  styleUrls: ['./product-categories-form.component.scss']
})
export class ProductCategoriesFormComponent implements OnInit {

  category: Category;

  types: SelectItem[] = [];

  constructor(
    private categorysComponentService: ProductCategoriesComponentService,
    private categoryService: ProductcategoriesService,
    private appMessageService: AppMessageService,
    private authUtils: AuthUtils,
  ) { }

  ngOnInit(): void {
    this.onNew();
    this.categorysComponentService.categorySelected.subscribe(sm => {
      this.category = sm
    });

  }

  onNew() {
    this.category = { id: null, name: null, description: null, type: ItemType.PRODUCT, enabled: true };
  }

  onSubmit() {
    if (this.category.id) {
      this.editCategory();
    } else {
      this.createCategory();
    }
  }

  onDelete() {
    var deleteFunc = () => {
      this.categoryService.deleteProductCategory(this.category.id)
        .subscribe(() => {
          this.categorysComponentService.deleteCategory(this.category)
          this.onNew();
          this.appMessageService.addSuccessfullDelete();
        });
    }

    this.appMessageService.confirmDelete(deleteFunc);
  }

  private createCategory() {
    this.categoryService.createProductCategory(this.category).subscribe(result => {
      this.category = result;
      this.categorysComponentService.modifyCategory(this.category);
      this.appMessageService.addSuccessfullInsert();
    })
  }

  private editCategory() {
    this.categoryService.updateProductCategory(this.category, this.category.id).subscribe(result => {
      this.category = result;
      this.categorysComponentService.modifyCategory(this.category);
      this.appMessageService.addSuccessfullUpdate();
    })
  }

  hasEditRole(): boolean {
    return this.authUtils.isInRole([Role.PRODUCTS])
  }
}
