import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { Product, ProductsService } from 'src/app/open-api';
import { ProductsComponentService } from '../service/products-component.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {

  products: Product[] = [];
  productSelected: Product;

  categoriesItems: SelectItem[] = [];

  loading = false;

  constructor(
    private productsService: ProductsService,
    private productsComponentService: ProductsComponentService
  ) { }

  ngOnInit(): void {

    this.loading = true;
    this.productsService.getProducts()
      .subscribe(result => {
        this.loading = false;
        this.products = result;
        this.buildCategoriesItems();
      }, _error => {
        this.loading = false;
      })

    this.productsComponentService.productDeleted.subscribe(product => this.removeProduct(product));
    this.productsComponentService.productModified.subscribe(product => this.addProduct(product));
  }

  onRowSelect(event) {
    this.productSelected = event.data;
    this.productsComponentService.selectProduct(Object.assign({}, event.data))
  }

  private removeProduct(product: Product) {
    this.products = this.products.filter(obj => obj.id !== product.id)
    this.buildCategoriesItems();
  }

  private addProduct(product: Product) {
    const productFound = this.products.find(obj => obj.id === product.id);
    if (productFound !== undefined) {
      const index = this.products.indexOf(productFound);
      if (index !== -1) {
        this.products[index] = product;
      }
    } else {
      this.products.push(product);
    }
    this.buildCategoriesItems();
  }

  private buildCategoriesItems() {
    if (!this.products) {
      this.categoriesItems = [];
      return;
    }

    var categories: string[] = this.products.map(p => p.category.name);
    categories = removeDuplicateCategories(categories);

    this.categoriesItems = categories.map(c => { return { label: c, value: c } });
    this.categoriesItems.unshift({ label: '', value: null })
  }
}

function removeDuplicateCategories(acc: string[]) {
  return acc.reduce((acc, curr) => {
    const elementIndexInArray = acc.findIndex(a => a === curr);
    if (elementIndexInArray === -1) {
      acc.push(curr);
    }

    return acc;
  }, []);
}
