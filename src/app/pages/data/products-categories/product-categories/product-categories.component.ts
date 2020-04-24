import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/open-api';
import { ProductsService } from 'src/app/open-api/api/products.service';
import { ProductCategory } from 'src/app/open-api/model/productCategory';
import { AppMessageService } from 'src/app/services/app-message.service';
import { AuthUtils } from 'src/app/utils/auth-utils';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {

  loading = false;

  categories: ProductCategory[] = [];
  categorySelected: ProductCategory;
  categoryForm: ProductCategory;

  constructor(
    private productsService: ProductsService,
    private authUtils: AuthUtils,
    private appMessageService: AppMessageService
  ) { }

  ngOnInit(): void {
    this.onNew()

    this.loading = true;
    this.productsService.getProductCategories(true)
      .subscribe(result => {
        this.loading = false;
        this.categories = result;
      }, _error => {
        this.loading = false;
      })
  }

  onRowSelect(event) {
    this.categoryForm = Object.assign({}, event.data);
  }

  onNew() {
    this.categoryForm = { id: null, name: null, enabled: true }
  }

  onSubmit() {
    if (this.categoryForm.id) {
      this.editProductCategory();
    } else {
      this.createProductCategory();
    }
  }

  private createProductCategory() {
    this.productsService.createProductCategory(this.categoryForm).subscribe(result => {
      this.categories.push(result);
      this.categoryForm = result;
      this.categorySelected = result;
      this.appMessageService.addSuccessfullInsert();
    })
  }

  private editProductCategory() {
    this.productsService.updateProductCategory(this.categoryForm, this.categoryForm.id).subscribe(result => {
      const toppingFound = this.categories.find(obj => obj.id === result.id);
      if (toppingFound !== undefined) {
        const index = this.categories.indexOf(toppingFound);
        if (index !== -1) {
          this.categories[index] = result;
        }
      }
      this.categoryForm = result;
      this.categorySelected = result;

      this.appMessageService.addSuccessfullUpdate();
    })
  }

  onDelete() {
    var deleteFunc = () => {
      this.productsService.deleteProductCategory(this.categoryForm.id)
        .subscribe(() => {
          this.categories = this.categories.filter(obj => obj.id !== this.categoryForm.id)
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

