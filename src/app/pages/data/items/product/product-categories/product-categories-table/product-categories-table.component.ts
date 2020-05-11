import { Component, OnInit } from '@angular/core';
import { Category, ProductcategoriesService } from 'src/app/open-api';
import { ProductCategoriesComponentService } from '../services/product-categories-component.service';

@Component({
  selector: 'app-product-categories-table',
  templateUrl: './product-categories-table.component.html',
  styleUrls: ['./product-categories-table.component.scss']
})
export class ProductCategoriesTableComponent implements OnInit {

  categories: Category[] = [];
  categorySelected: Category;

  loading = false;

  constructor(
    private categoryService: ProductcategoriesService,
    private categoryComponentService: ProductCategoriesComponentService
  ) { }

  ngOnInit(): void {

    this.loading = true;
    this.categoryService.getProductCategories(true)
      .subscribe(result => {
        this.loading = false;
        this.categories = result;
      }, _error => {
        this.loading = false;
      })

    this.categoryComponentService.categoryDeleted.subscribe(category => this.removeCategory(category));
    this.categoryComponentService.categoryModified.subscribe(category => this.addCategory(category));
  }

  onRowSelect(event) {
    this.categorySelected = event.data;
    this.categoryComponentService.selectCategory(Object.assign({}, event.data))
  }

  private removeCategory(category: Category) {
    this.categories = this.categories.filter(obj => obj.id !== category.id)
  }

  private addCategory(category: Category) {
    const categoryFound = this.categories.find(obj => obj.id === category.id);
    if (categoryFound !== undefined) {
      const index = this.categories.indexOf(categoryFound);
      if (index !== -1) {
        this.categories[index] = category;
      }
    } else {
      this.categories.push(category);
    }
  }

}
