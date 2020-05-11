import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api/selectitem';
import { map } from 'rxjs/operators';
import { Category, Item, ProductcategoriesService, ProductsService } from 'src/app/open-api';
import { MyCurrencyPipe } from 'src/app/pipes/my-currency.pipe';
import { SessionService } from 'src/app/services/session.service';
import { ProductsComponentService } from '../services/products-component.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {

  products: Item[] = [];
  productSelected: Item;

  categoriesItems: SelectItem[] = [];

  loading = false;

  constructor(
    private productcategoriesService: ProductcategoriesService,
    private productsService: ProductsService,
    private productsComponentService: ProductsComponentService,
    private session: SessionService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    this.productcategoriesService.getProductCategories(true)
      .pipe(map(cs => cs.map(c => { return { label: c.name, value: c } })))
      .subscribe(items => {
        this.categoriesItems = [{ label: this.translate.instant('all', { gender: 'female' }), value: null }, ...items]
        this.onCategoryChange(null)
      })

    this.productsComponentService.productDeleted.subscribe(product => this.removeProduct(product));
    this.productsComponentService.productModified.subscribe(product => this.addProduct(product));
  }

  onRowSelect(event) {
    this.productSelected = event.data;
    this.productsComponentService.selectProduct(Object.assign({}, event.data))
  }

  private removeProduct(product: Item) {
    this.products = this.products.filter(obj => obj.id !== product.id)
  }

  private addProduct(product: Item) {
    const productFound = this.products.find(obj => obj.id === product.id);
    if (productFound !== undefined) {
      const index = this.products.indexOf(productFound);
      if (index !== -1) {
        this.products[index] = product;
      }
    } else {
      this.products.push(product);
    }
  }

  onCategoryChange(category: Category) {
    this.loading = true;
    this.productsService.getItemProducts(true, category?.id)
      .subscribe(result => {
        this.loading = false;
        this.products = result;
      }, _error => {
        this.loading = false;
      })
  }

  formatPrices(items: Item): string {
    let pricesString = '';
    let separator = '';

    const currencyPipe = new MyCurrencyPipe(this.session);
    items.availablePrices?.map(price => currencyPipe.transform(price))
      .forEach(price => {
        pricesString += `${separator}${price}`;
        separator = ' - ';
      })
    return pricesString
  }
}
